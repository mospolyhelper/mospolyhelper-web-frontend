import MyPortfolio from "@/domain/account/deadlines/model/myPortfolio"
import Result from "../../../../utils/result"
import DealinesApi from "../api/apiDeadlines"


export default class DeadlinesRemoteDataSource {
    private api = new DealinesApi()

    getMyPortfolio(): Promise<Result<MyPortfolio>> {
        return this.api.getMyPortfolio()
    }

    sendMyPortfolio(otherInformation: string): Promise<Result<MyPortfolio>> {
        return this.api.sendMyPortfolio(otherInformation)
    }

}