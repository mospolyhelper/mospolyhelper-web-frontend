import InfoRepository from "@/data/account/info/repository/searchRepository";
import Result from "@/utils/result";
import AccountInfo from "../model/accountInfo";

export default class InfoUseCase {
    private repository = new InfoRepository();

    getAccountInfo(): Promise<Result<AccountInfo>> {
        return this.repository.getAccountInfo();
    }
}