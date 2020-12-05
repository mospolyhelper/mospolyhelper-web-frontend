import DeadlinesRepository from "@/domain/deadlines/repository/deadlinesRepository";
import Deadline from "@/domain/deadlines/model/deadline";

export default class DeadlinesUseCase {
    repository = new DeadlinesRepository();

    getDeadlines(): Deadline[] {
        return this.repository.getDeadlines();
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

    search(s: string) {
        let list = this.repository.getDeadlines();
        return list.filter((val) => val.name.includes(s))
    }
}