import DialogsRepository from "@/data/account/dialogs/preview/repository/dialogsRepository";
import Result from "@/utils/result";
import DialogPreviewModel from "../model/dialogs";

export default class DialogsUseCase {
    private repository = new DialogsRepository();

    getDialogs(): Promise<Result<DialogPreviewModel[]>> {
        return this.repository.getDialogs();
    }
}
