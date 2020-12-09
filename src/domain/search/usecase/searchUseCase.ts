import SearchEntity from '../model/SearchEntity';
import SearchRepository from '@/data/search/repository/searchRepository'
import SearchResult from '../model/SearchResult';

export default class SearchUseCase {
    private repository = new SearchRepository();

    searchByQuery(query: String, page: number): Promise<SearchResult | null> {
        return this.repository.searchByQuery(query, page);
    }

    filter(arr: Array<SearchEntity>, direction: string, profile: string, group: string, course: string[], form: string[]): Array<SearchEntity> {
        return arr.filter(function (val: SearchEntity) {
            let dir = val.direction.toLocaleLowerCase().includes(direction.toLocaleLowerCase());
            let prof = val.specialization.toLocaleLowerCase().includes(profile.toLocaleLowerCase());
            let grp = val.group.toLocaleLowerCase().includes(group.toLocaleLowerCase());
            let crs = false;
            course.forEach(v => { if (v == val.course) crs = true });
            let frm = false;
            form.forEach(v => { if (v == val.educationForm) frm = true });
            return dir && prof && grp && crs && frm;
                })
    }

}