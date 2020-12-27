import restClient from "@/data/client";
import Message from "@/domain/account/dialogs/chat/model/message";
import Result from "@/utils/result";
import UnauthorizedAccessError from "@/utils/unauthorizedAccessError";
import { IRequestOptions } from "typed-rest-client";
import AuthLocalDataSource from "../../../auth/local/authLocalDataSource";

export default class ChatApi {
    private URL_MODULE = "/account";
    private URL_DIALOG = "/dialog";
    private session = new AuthLocalDataSource();

    async getMessages(dialogKey: string): Promise<Result<Message[]>> {
        try {
            const path = this.URL_MODULE + this.URL_DIALOG;
            const options: IRequestOptions = {
                queryParameters: { params: { dialogKey: dialogKey } },
                additionalHeaders: { sessionId: this.session.getSessionId() }
            };
            const response = await restClient.get<Message[]>(path, options);

            console.log("loaded", response.result);
            return Result.success(response.result ?? []);
        } catch (err) {
            if (err["statusCode"] == 401) {
                return Result.failure(new UnauthorizedAccessError("Авторизируйтесь!"));
            } else return Result.failure(err);
        }
    }
}
