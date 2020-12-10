import { RestClient } from 'typed-rest-client/RestClient';
import SearchResult from '../../../domain/search/model/SearchResult';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/portfolios';

    async searchByQuery(query: String, page: number): Promise<SearchResult | null> {
        const rest = new RestClient(undefined, this.URL_BASE);
        console.log(`${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`);
        const response = await rest.get<SearchResult>(
            `${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`
        );
        return response.result;
    }
    
}