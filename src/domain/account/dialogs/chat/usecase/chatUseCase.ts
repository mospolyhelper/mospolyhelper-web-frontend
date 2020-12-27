import ChatRepository from "@/data/account/dialogs/chat/repository/chatRepository";
import Result from "@/utils/result";
import Message from "../model/message";

export default class ChatUseCase {
    private repository = new ChatRepository();

    getMessages(dialogKey: string): Promise<Result<Message[]>> {
        return this.repository.getMessages(dialogKey);
    }
}
