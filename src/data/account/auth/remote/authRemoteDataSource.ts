import AuthApi from "../api/authApi";

export default class AuthRemoteDataSource {
    constructor(
        public api: AuthApi
    ) { }

    getSessionId(login: string, password: string): Promise<string | null> {
        return this.api.logIn(login, password);
    }

    updateSessionId(login: string, password: string, sessionId: string): Promise<string | null> {
        return this.api.logIn(login, password, sessionId);
    }
}