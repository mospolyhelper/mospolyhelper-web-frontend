import Application from "@/domain/account/applications/model/application";
import Result from "@/utils/result";
import ApplicationsRemoteDataSource from "../remote/applicationsRemoteDataSource";

export default class ApplicationsRepository {
    private remoteDataSource = new ApplicationsRemoteDataSource();

    getAccountInfo(): Promise<Result<Application[]>> {
        return this.remoteDataSource.getApplications();
    }
}
