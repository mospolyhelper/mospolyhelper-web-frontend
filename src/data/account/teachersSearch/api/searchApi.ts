import { RestClient } from 'typed-rest-client/RestClient';
import SearchEntity from '../../../../domain/account/teachersSearch/model/SearchEntity';
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import AuthLocalDataSource from '../../auth/local/authLocalDataSource';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/teachers';
    private sessionId = new AuthLocalDataSource().getSessionId();

    async searchByQuery(query: string, page: number): Promise<Result<SearchResult>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        let options = { additionalHeaders: { 'sessionId': this.sessionId } };
        const response = await rest.get<SearchResult>(
            `${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`,
            options
        );
        if (response.statusCode = 200) {
            return Result.success(response.result ?? new SearchResult(1, 1, Array<SearchEntity>()));
        } else if (response.statusCode = 401) {
            return Result.failure(new UnauthorizedAccessError("Требуется авторизация!"));
        } else {
            return Result.failure(new Error(response.statusCode.toString()));
        }
    }
    
}