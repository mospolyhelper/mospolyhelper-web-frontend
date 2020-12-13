import SearchRepository from '@/data/account/teachersSearch/repository/searchRepository'
import Result from '../../../../utils/result';
import SearchResult from '../model/SearchResult';

export default class SearchUseCase {
    private repository = new SearchRepository();

    searchByQuery(query: string, page: number): Promise<Result<SearchResult>> {
        return this.repository.searchByQuery(query, page);
    }

}