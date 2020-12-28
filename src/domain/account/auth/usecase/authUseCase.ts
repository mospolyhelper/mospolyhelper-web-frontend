import PreferencesRepository from "../../../../data/common/repository/preferencesRepository";
import Result from "../../../../utils/result";
import AuthRepository from "../repository/authRepository";

const SaveLogin = 'SaveLogin';
const SavePassword = 'SavePassword';

export default class AuthUseCase {
    constructor(
        public repository: AuthRepository,
        private prefRepository: PreferencesRepository
    ) { }

    async logIn(login: string, password: string): Promise<boolean> {
        const sesId = await this.repository.getSessionId(login, password);
        if (sesId.isSuccess) {
            this.repository.setSessionId(sesId.getOrNull()!);
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    setPreference(key: string, value: string) {
        this.prefRepository.setPreference(key, value);
    }

    getPreference(key: string, defaultValue: string): string {
        return this.prefRepository.getPreference(key, defaultValue);
    }

    getPermissions(): Promise<Result<Array<string>>> {
        return this.repository.permissionsCheck();
    }
}