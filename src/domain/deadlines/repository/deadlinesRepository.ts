import Deadline from "@/domain/deadlines/model/deadline";

export default class Repository {
    private fs = require('browserify-fs');
    private deadlines: Deadline[]

    constructor() {
        this.deadlines = [];
        this.loadDeadlines();
    }

    private saveToJson() {
        var json = JSON.stringify(this.deadlines);
        this.fs.writeFile('deadlines.json', json, 'utf8', function writeFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            }
        });
    }

    addDeadline(d: Deadline) {
        if (this.deadlines.length > 0)
            d.id = this.deadlines[this.deadlines.length-1].id + 1;
        else
            d.id = 1;
        this.deadlines.push(d);
        this.saveToJson();
        this.showjson();
    }

    getDeadlines(): Deadline[] {
        return this.deadlines;
    }

    getDeadline(id: number): Deadline | undefined {
        for (let deadline of this.deadlines) {
            if (deadline.id == id) {
                return deadline;
            }
        }
    }

    loadDeadlines() {
        let self = this;
        this.showjson();
        this.fs.readFile('deadlines.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                self.deadlines = JSON.parse(data);
            }
        });
    }

    deleteDeadline(id: number) {
        this.deadlines.filter(function (element, index, array) {
            return (element.id != id);
        });
        console.log("removed id", id)
        this.saveToJson();
        this.showjson();
    }

    editDeadline(d: Deadline | undefined) {
        let id: number | undefined = 0;
        for (let deadline of this.deadlines) {
            if (deadline.id == d?.id) {
                id = d?.id;
                break;
            } 
        }
        if (id != null && d != null) {
            this.deadlines[id] = d;
            this.saveToJson();
        }
 
    }

    showjson() {
        this.fs.readFile('deadlines.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }

}