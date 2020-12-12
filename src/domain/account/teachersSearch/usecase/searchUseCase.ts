import SearchRepository from '@/data/account/teachersSearch/repository/searchRepository'
import Result from '../../../../utils/result';
import UnauthorizedAccessError from '../../../../utils/unauthorizedAccessError';
import SearchResult from '../model/SearchResult';

export default class SearchUseCase {
    private repository = new SearchRepository();

    searchByQuery(query: string, page: number, sessionId: string | null): Promise<SearchResult> {
        //if (sessionId == null) return Result.failure(new UnauthorizedAccessError())
        return this.repository.searchByQuery(query, page, sessionId ?? "");
    }

}