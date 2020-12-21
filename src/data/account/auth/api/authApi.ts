import { RestClient } from 'typed-rest-client/RestClient';

export default class AuthApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SCHEDULE = '/auth';

    // Return sessionId
    async logIn(
        login: string,
        password: string,
        sessionId: string = ''
    ): Promise<string | null> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.create<string>(
            `${this.URL_MODULE}${this.URL_SCHEDULE}`,
            {
                login: login,
                password: password,
                sessionId: sessionId
            }
        );
        console.log(login);
        console.log(sessionId);
        console.log(response.result);
        return response.result;
    }
}