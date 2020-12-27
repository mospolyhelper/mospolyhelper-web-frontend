import Message from "@/domain/account/dialogs/chat/model/message";
import Result from "@/utils/result";
import ChatRemoteDataSource from "../remote/chatRemoteDataSource";

export default class ChatRepository {
    private remoteDataSource = new ChatRemoteDataSource();

    getMessages(dialogKey: string): Promise<Result<Message[]>> {
        return this.remoteDataSource.getMessages(dialogKey);
    }
}
