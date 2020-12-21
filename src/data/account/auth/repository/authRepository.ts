import AuthRepository from "../../../../domain/account/auth/repository/authRepository";
import Result from "../../../../utils/result";
import AuthLocalDataSource from "../local/authLocalDataSource";
import AuthRemoteDataSource from "../remote/authRemoteDataSource";

export default class AuthRepositoryImpl implements AuthRepository {
    constructor(
        public localDataSource: AuthLocalDataSource,
        public remoteDataSource: AuthRemoteDataSource
    ) { }


    getSessionId(login: string | null = null, password: string | null = null): Promise<Result<string>> {
        if (login != null && password != null) {
            return this.remoteDataSource.getSessionId(login, password);
        } else {
            return Promise.resolve(Result.success(this.localDataSource.getSessionId()));
        }
    }

    updateSessionId(login: string, password: string, sessionId: string) {
        this.remoteDataSource.updateSessionId(login, password, sessionId);
    }

    setSessionId(sessionId: string) {
        this.localDataSource.setSessionId(sessionId);
    }
}