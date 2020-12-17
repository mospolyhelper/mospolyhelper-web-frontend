import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';
import SearchEntity from '../../../../domain/account/classmates/model/SearchEntity';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(): Promise<Result<Array<SearchEntity>>> {
        return this.remoteDataSource.searchByQuery();
    }

}
