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

    deleteDeadline(d: Deadline) {
        this.repository.deleteDeadline(d);
    }

    show() {
        this.repository.showjson();
    }
}