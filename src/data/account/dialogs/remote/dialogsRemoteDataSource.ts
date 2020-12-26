import Result from "../../../../utils/result";
import DialogPreview from "@/domain/account/dialogs/model/dialogs";
import DialogsApi from "../api/dialogsApi";

export default class DialogsRemoteDataSource {
    private api = new DialogsApi();

    getDialogs(): Promise<Result<DialogPreview[]>> {
        return this.api.getDialogs();
    }
}
