import SearchApi from '../api/searchApi'
import SearchEntity from '@/domain/search/model/SearchEntity';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(query: String, page: number): Promise<Array<SearchEntity>> {
        return this.api.searchByQuery(query,page);
    }

}