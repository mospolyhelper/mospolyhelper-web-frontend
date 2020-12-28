import Result from "../../../../utils/result";
import DialogPreviewModel from "@/domain/account/dialogs/model/dialogs";
import DialogsApi from "../api/dialogsApi";

export default class DialogsRemoteDataSource {
    private api = new DialogsApi();

    getDialogs(): Promise<Result<DialogPreviewModel[]>> {
        return this.api.getDialogs();
    }
}
