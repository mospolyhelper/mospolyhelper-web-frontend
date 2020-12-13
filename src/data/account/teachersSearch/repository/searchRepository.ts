import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';
import Result from '../../../../utils/result';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(query: string, page: number): Promise<Result<SearchResult>> {
        return this.remoteDataSource.searchByQuery(query, page);
    }

}
