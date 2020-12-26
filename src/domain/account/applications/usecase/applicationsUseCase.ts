import ApplicationsRepository from "@/data/account/applications/repository/applicationsRepository";
import Result from "@/utils/result";
import Application from "../model/application";

export default class ApplicationsUseCase {
    private repository = new ApplicationsRepository();

    getApplications(): Promise<Result<Application[]>> {
        return this.repository.getAccountInfo();
    }
}
