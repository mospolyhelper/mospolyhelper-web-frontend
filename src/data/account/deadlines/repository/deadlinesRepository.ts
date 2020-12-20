import MyPortfolio from "@/domain/account/deadlines/model/myPortfolio";
import Result from "../../../../utils/result";
import DeadlinesRemoteDataSource from "../remote/deadlinesRemoteDataSource";

export default class DeadlinesRepository {

    private deadlinesDS = new DeadlinesRemoteDataSource();

    getMyPortfolio(): Promise<Result<MyPortfolio>> {
        return this.deadlinesDS.getMyPortfolio()
    }

    sendMyPortfolio(otherInformation: string): Promise<Result<MyPortfolio>> {
        return this.deadlinesDS.sendMyPortfolio(otherInformation)
    }

}