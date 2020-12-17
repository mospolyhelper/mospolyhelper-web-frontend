import Deadline from "@/domain/account/deadlines/model/deadline";
import DeadlinesLocalRepository from "../../../../data/account/deadlines/local/deadlinesLocalRepository";
import DeadlinesRepository from "../../../../data/account/deadlines/repository/deadlinesRepository";
import Result from "../../../../utils/result";
import MyPortfolio from "../model/myPortfolio";

export default class DeadlinesUseCase {
    repositoryLocal = new DeadlinesLocalRepository();
    repository = new DeadlinesRepository();


    getLocalDeadlines(): Array<Deadline> {
        let arr = this.repositoryLocal.getDeadlines();
        return arr;
    }
    setLocalDeadlines(deadlines: Array<Deadline>): Array<Deadline> {
        this.repositoryLocal.setDeadlines(deadlines)
        return deadlines
    }

    getDeadline(id: number): Deadline {
        return this.repositoryLocal.getDeadline(id);
    }

    addDeadline(d: Deadline) {
        this.repositoryLocal.addDeadline(d);
    }

    deleteDeadline(id: number) {
        this.repositoryLocal.deleteDeadline(id);
    }

    setCompleted(id: number) {
        this.repositoryLocal.setCompleted(id);
    }

    setPinned(id: number) {
        this.repositoryLocal.setPinned(id);
    }

    editDeadline(d: Deadline) {
        this.repositoryLocal.editDeadline(d);
    }

    getPortfolio(): Promise<Result<MyPortfolio>> {
        return this.repository.getMyPortfolio()
    }

    setDeadlines(deadlines: Array<Deadline>): Promise<Result<MyPortfolio>> {
        return this.repository.sendMyPortfolio(this.arrayToJson(deadlines))
    }

    jsonToArray(json: string): Array<Deadline> {
        console.log(json);
        try {
            return JSON.parse(json);
        } catch (err) {
            console.log('не получается спарсить поле дополнительной информации', err);
            return Array<Deadline>();
        }
    }

    arrayToJson(deadlines: Array<Deadline>): string {
        return JSON.stringify(deadlines)
    }

    compareReceived(localDeadlines: Array<Deadline>, sent: string): boolean {
        return new Intl.Collator().compare(sent, this.arrayToJson(localDeadlines)) == 0
    }

}