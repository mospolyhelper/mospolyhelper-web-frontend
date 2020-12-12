import { RestClient } from 'typed-rest-client/RestClient';
import SearchEntity from '../../../../domain/account/teachersSearch/model/SearchEntity';
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/teachers';

    async searchByQuery(query: string, page: number, sessionId: string): Promise<SearchResult> {
        const rest = new RestClient(undefined, this.URL_BASE);
        let options = { additionalHeaders: { 'sessionId': sessionId } };
        const response = await rest.get<SearchResult>(
            `${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`,
            options
        );
        return response.result ?? new SearchResult(1, 1, Array < SearchEntity >());
    }
    
}