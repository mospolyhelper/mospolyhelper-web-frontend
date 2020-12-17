import Deadline from "@/domain/account/deadlines/model/deadline";

export default class DeadlinesLocalRepository {

    private deadlines: Array<Deadline>;

    constructor() {
        this.deadlines = [];
    }

    addDeadline(d: Deadline) {
        if (this.deadlines.length > 0)
            d.id = this.deadlines[this.deadlines.length - 1].id + 1;
        else
            d.id = 1;
        this.deadlines.push(d);
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

    setDeadlines(deadlines: Array<Deadline>) {
        this.deadlines = [];
        deadlines.forEach(val => this.deadlines.push(val))
    }

    deleteDeadline(id: number) {
        for (let i = 0; i <= this.deadlines.length; i++) {
            if (this.deadlines[i].id == id) {
                const index = this.deadlines.indexOf(this.deadlines[i], 0);
                if (index > -1) {
                    this.deadlines.splice(index, 1);
                }
                console.log('deleted element index ', i, "with id ", id);
                break;
            }
        }
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
    }

    setCompleted(id: number) {
        for (let i = 0; i <= this.deadlines.length; i++) {
            if (this.deadlines[i].id == id) {
                this.deadlines[i].completed = !(this.deadlines[i].completed);
                console.log('updated element', this.deadlines[i]);
                break;
            }
        }
    }

}