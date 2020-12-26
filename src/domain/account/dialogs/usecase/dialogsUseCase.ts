import DialogsRepository from "@/data/account/dialogs/repository/dialogsRepository";
import Result from "@/utils/result";
import DialogPreview from "../model/dialogs";

export default class DialogsUseCase {
    private repository = new DialogsRepository();

    getDialogs(): Promise<Result<DialogPreview[]>> {
        return this.repository.getDialogs();
    }
}
