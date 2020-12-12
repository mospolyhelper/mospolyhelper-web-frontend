export default interface AuthRepository {

    getSessionId(login: string | null, password: string | null): Promise<string | null>;

    updateSessionId(login: string, password: string, sessionId: string): void;

    setSessionId(sessionId: string): void;
}