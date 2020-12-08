import SearchRemoteDataSource from '../remote/searchRemoteDataSource'
import SearchEntity from '@/domain/search/model/SearchEntity';

export default class SearchRepository {
    private remoteDataSource = new SearchRemoteDataSource();

    searchByQuery(query: String, page: number): Promise<Array<SearchEntity>> {
        return this.remoteDataSource.searchByQuery(query, page);
    }

}
