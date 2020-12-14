import SearchRepository from '../../../../data/account/classmates/repository/searchRepository';
import Result from '../../../../utils/result';
import SearchEntity from '../model/SearchEntity';

export default class SearchUseCase {
    private repository = new SearchRepository();

    searchByQuery(): Promise<Result<Array<SearchEntity>>> {
        return this.repository.searchByQuery();
    }

}