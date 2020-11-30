﻿import Deadline from "@/domain/deadlines/model/deadline";

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
            d.id = this.deadlines[this.deadlines.length].id + 1;
        else
            d.id = 1;
        this.deadlines.push(d);
        this.saveToJson();
    }

    getDeadlines(): Deadline[] {
        return this.deadlines;
    }

    loadDeadlines() {
        let deadline: Deadline[] = [];
        this.fs.readFile('deadlines.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                deadline = JSON.parse(data);
            }
        });
        this.deadlines = deadline;
    }

    deleteDeadline(d: Deadline) {
        this.deadlines.filter(function (element, index, array) {
            return (element.id != d.id);
        });
        this.saveToJson();
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