import SearchApi from '../api/searchApi'
import Result from '../../../../utils/result';
import Marks from '../../../../domain/account/marks/model/marks';

export default class SearchRemoteDataSource {
    private api = new SearchApi();

    searchByQuery(): Promise<Result<Marks>> {
        return this.api.searchByQuery();
    }

}