import AuthRepository from "../repository/authRepository";

export default class AuthUseCase {
    constructor(
        public repository: AuthRepository
    ) { }

    async logIn(login: string, password: string): Promise<boolean> {
        const sesId = await this.repository.getSessionId(login, password);
        if (sesId) {
            this.repository.setSessionId(sesId);
            console.log(sesId);
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}