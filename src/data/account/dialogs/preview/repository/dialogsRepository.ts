import DialogPreviewModel from "@/domain/account/dialogs/preview/model/dialogs";
import Result from "@/utils/result";
import DialogsRemoteDataSource from "../remote/dialogsRemoteDataSource";

export default class DialogsRepository {
    private remoteDataSource = new DialogsRemoteDataSource();

    getDialogs(): Promise<Result<DialogPreviewModel[]>> {
        return this.remoteDataSource.getDialogs();
    }
}
