import SearchApi from '../api/searchApi'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(query: string, page: number, sessionId: string): Promise<SearchResult> {
        return this.api.searchByQuery(query,page, sessionId);
    }

}