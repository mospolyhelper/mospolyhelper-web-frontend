import SearchApi from '../api/searchApi'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(query: string, page: number): Promise<Result<SearchResult>> {
        return this.api.searchByQuery(query,page);
    }

}