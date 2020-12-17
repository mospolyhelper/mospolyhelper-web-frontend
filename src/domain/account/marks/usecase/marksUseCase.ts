import SearchRepository from '../../../../data/account/marks/repository/searchRepository';
import Result from '../../../../utils/result';
import Marks from '../model/marks';

export default class SearchUseCase {
    private repository = new SearchRepository();

    searchByQuery(): Promise<Result<Marks>> {
        return this.repository.searchByQuery();
    }

}