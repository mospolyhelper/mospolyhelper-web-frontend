import SearchApi from '../api/searchApi'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';
import SearchEntity from '../../../../domain/account/classmates/model/SearchEntity';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(): Promise<Result<Array<SearchEntity>>> {
        return this.api.searchByQuery();
    }

}