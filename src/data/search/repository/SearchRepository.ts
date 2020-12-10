import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import SearchEntity from '@/domain/search/model/SearchEntity';
import SearchResult from '../../../domain/search/model/SearchResult';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(query: String, page: number): Promise<SearchResult | null> {
        return this.remoteDataSource.searchByQuery(query, page);
    }

}
