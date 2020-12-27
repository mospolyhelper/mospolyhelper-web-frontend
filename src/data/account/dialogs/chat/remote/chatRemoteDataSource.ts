import Result from "@/utils/result";
import ChatApi from "../api/chatApi";
import Message from "@/domain/account/dialogs/chat/model/message";

export default class ChatRemoteDataSource {
    private api = new ChatApi();

    getMessages(dialogKey: string): Promise<Result<Message[]>> {
        return this.api.getMessages(dialogKey);
    }
}
