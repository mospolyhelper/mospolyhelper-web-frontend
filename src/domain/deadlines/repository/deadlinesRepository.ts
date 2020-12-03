import Deadline from "@/domain/deadlines/model/deadline";
import deadline from "../../../features/deadlines/components/Deadline.vue";
const fs = require('browserify-fs');

export default class Repository {
    //private fs = require('browserify-fs');
    
    private deadlines: Deadline[];

    constructor() {
        this.deadlines = [];
        this.loadDeadlines();
    }

    private saveToJson() {
        var json = JSON.stringify(this.deadlines);
        fs.writeFile('deadlines.json', json, 'utf8', function writeFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            }
        });
        console.log(json);
    }

    addDeadline(d: Deadline) {
        if (this.deadlines.length > 0)
            d.id = this.deadlines[this.deadlines.length-1].id + 1;
        else
            d.id = 1;
        this.deadlines.push(d);
        this.saveToJson();
    }

    getDeadlines(): Deadline[] {
        return this.deadlines;
    }

    getDeadline(id: number): Deadline {
        for (let deadline of this.deadlines) {
            if (deadline.id == id) {
                console.log("got ", deadline)
                return deadline;
            }
        }
        return new Deadline("", "");
    }

    loadDeadlines() {
        let self = this;
        fs.readFile('deadlines.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                self.deadlines = JSON.parse(data);
            }
        });
    }

    deleteDeadline(id: number) {
        //this.deadlines.filter(deadline => deadline == this.getDeadline(id));
        for (let i = 0; i <= this.deadlines.length; i++) {
            if (this.deadlines[i].id == id) {
                //delete this.deadlines[i];
                const index = this.deadlines.indexOf(this.deadlines[i], 0);
                if (index > -1) {
                    this.deadlines.splice(index, 1);
                }
                console.log('deleted element', i);
                break;
            }
        }
        this.saveToJson();
    }

    editDeadline(d: Deadline) {
        let id = 0;
        for (let deadline of this.deadlines) {
            if (deadline.id == d.id) {
                break;
            } 
            id++;
        }
        console.log('updating element', this.deadlines[id], "to ", d);
        this.deadlines[id] = d;
        this.saveToJson();
        console.log('updated element', this.deadlines[id], "to ", d);
    }

    setPinned(id: number) {
        for (let i = 0; i <= this.deadlines.length; i++) {
            if (this.deadlines[i].id == id) {
                this.deadlines[i].pinned = !(this.deadlines[i].pinned);
                console.log('updated element', this.deadlines[i]);
                break;
            }
        }
        this.saveToJson();
    }

    setCompleted(id: number) {
        for (let i = 0; i <= this.deadlines.length; i++) {
            if (this.deadlines[i].id == id) {
                this.deadlines[i].completed = !(this.deadlines[i].completed);
                console.log('updated element', this.deadlines[i]);
                break;
            }
        }
        this.saveToJson();
    }

    showjson() {
        fs.readFile('deadlines.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }

}