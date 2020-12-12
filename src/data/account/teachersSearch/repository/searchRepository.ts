import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import SearchResult from '../../../../domain/account/teachersSearch/model/SearchResult';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(query: string, page: number, sessionId: string): Promise<SearchResult> {
        return this.remoteDataSource.searchByQuery(query, page, sessionId);
    }

}
