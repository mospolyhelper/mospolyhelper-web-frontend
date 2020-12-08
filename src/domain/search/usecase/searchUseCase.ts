import SearchEntity from '../model/SearchEntity';
import SearchRepository from '@/data/search/repository/searchRepository'

export default class SearchUseCase {
    private repository = new SearchRepository();

    getScheduleByGroup(query: String, page: number = 0): Promise<Array<SearchEntity>> {
        return this.repository.searchByQuery(query, page);
    }

}