import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import Result from '../../../../utils/result';
import Marks from '../../../../domain/account/marks/model/marks';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(): Promise<Result<Marks>> {
        return this.remoteDataSource.searchByQuery();
    }

}
