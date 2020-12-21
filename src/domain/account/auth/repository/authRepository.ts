import Result from "../../../../utils/result";

export default interface AuthRepository {

    getSessionId(login: string | null, password: string | null): Promise<Result<string>>;

    updateSessionId(login: string, password: string, sessionId: string): void;

    setSessionId(sessionId: string): void;
}