import SearchApi from '../api/searchApi'
import SearchEntity from '@/domain/search/model/SearchEntity';
import SearchResult from '../../../domain/search/model/SearchResult';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(query: String, page: number): Promise<SearchResult | null> {
        return this.api.searchByQuery(query,page);
    }

}