import DeadlinesRepository from "@/domain/deadlines/repository/deadlinesRepository";
import Deadline from "@/domain/deadlines/model/deadline";

export default class DeadlinesUseCase {
    repository = new DeadlinesRepository();

    getDeadlines(): Deadline[] {
        return this.repository.getDeadlines();
    }

    addDeadline(d: Deadline) {
        this.repository.addDeadline(d);
    }

    deleteDeadline(id: number) {
        this.repository.deleteDeadline(id);
    }

    setCompleted(id: number) {
        let d = this.repository.getDeadline(id);
        d?.completed != d?.completed;
        this.repository.editDeadline(d);
    }

    setPinned(id: number) {
        let d = this.repository.getDeadline(id);
        d?.pinned != d?.pinned;
        this.repository.editDeadline(d);
    }

    show() {
        this.repository.showjson();
    }
}