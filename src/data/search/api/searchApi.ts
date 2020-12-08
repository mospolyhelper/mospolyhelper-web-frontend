import { RestClient } from 'typed-rest-client/RestClient';
import SearchEntity from '@/domain/search/model/SearchEntity';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/account';
    private URL_SEARCH = '/portfolios';

    async searchByQuery(query: String, page: number): Promise<Array<SearchEntity>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<SearchEntity>>(
            `${this.URL_MODULE}${this.URL_SEARCH}?searchQuery=${query}&page=${page}`
        );
        return response.result ?? new Array<SearchEntity>();
    }

}