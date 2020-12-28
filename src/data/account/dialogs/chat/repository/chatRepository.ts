import Message from "@/domain/account/dialogs/chat/model/message";
import SendMsgBody from "@/domain/account/dialogs/chat/model/sendMessageBody";
import Result from "@/utils/result";
import ChatRemoteDataSource from "../remote/chatRemoteDataSource";

export default class ChatRepository {
    private remoteDataSource = new ChatRemoteDataSource();

    getMessages(dialogKey: string): Promise<Result<Message[]>> {
        return this.remoteDataSource.getMessages(dialogKey);
    }

    sendMessage(msg: SendMsgBody): Promise<Result<Message[]>> {
        return this.remoteDataSource.sendMessage(msg);
    }
}
