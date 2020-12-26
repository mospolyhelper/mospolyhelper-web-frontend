import Result from "../../../../utils/result";
import ApplicationsApi from "../api/applicationsApi";
import Application from "@/domain/account/applications/model/application";

export default class ApplicationsRemoteDataSource {
    private api = new ApplicationsApi();

    getApplications(): Promise<Result<Application[]>> {
        return this.api.getApplications();
    }
}
