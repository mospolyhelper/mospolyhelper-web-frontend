import DeadlinesRepository from "@/domain/deadlines/repository/deadlinesRepository";
import Deadline from "@/domain/deadlines/model/deadline";

export default class DeadlinesUseCase {
    repository = new DeadlinesRepository();

    getDeadlines(hideCompleted: boolean = false): Deadline[] {
        let arr = this.repository.getDeadlines();
        let self = this;
        if (hideCompleted) {
            arr.sort(function (val1: Deadline, val2: Deadline): number {
                return self.compareObjects(val2.pinned, val1.pinned);
            })
            return arr.filter((val) => val.completed != true);
        } else {
            arr.sort(function (val1: Deadline, val2: Deadline): number {
                return self.compareObjects(val1.completed, val2.completed)
            });
        }
        arr.sort(function (val1: Deadline, val2: Deadline): number {
            return self.compareObjects(val2.pinned, val1.pinned);
        })
        return arr;
    }

    private compareObjects(prop1: boolean, prop2: boolean) {
        if (prop1 < prop2) {
            return -1
        }
        if (prop1 > prop2) {
            return 1
        }
        return 0
    }

    private isCompleted(element: Deadline, index: number, array: Deadline[]) {
        return (element.completed != true);
    } 

    getDeadline(id: number): Deadline {
        return this.repository.getDeadline(id);
    }

    addDeadline(d: Deadline) {
        this.repository.addDeadline(d);
    }

    deleteDeadline(id: number) {
        this.repository.deleteDeadline(id);
    }

    setCompleted(id: number) {
        this.repository.setCompleted(id);
    }

    setPinned(id: number) {
        this.repository.setPinned(id);
    }

    show() {
        this.repository.showjson();
    }

    editDeadline(d: Deadline) {
        this.repository.editDeadline(d);
    }

    search(s: string, hideCompleted: boolean = false) {
        let list = this.getDeadlines(hideCompleted);
        return list.filter((val) => val.name.toLocaleLowerCase().includes(s.toLocaleLowerCase()))
    }
}