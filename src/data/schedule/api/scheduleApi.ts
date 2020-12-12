import { RestClient } from 'typed-rest-client/RestClient';
import Schedule from '@/domain/schedule/model/schedule';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com';
    private URL_MODULE = '/schedule';
    private URL_SCHEDULE = '/schedule';
    private URL_GROUP_LIST = '/group-list';
    private URL_TEACHER_LIST = '/teacher-list';
    private URL_AUDITORIUM_LIST = '/auditorium-list';
    private URL_TITLE_LIST = '/title-list';
    private URL_TYPE_LIST = '/type-list';

    async getScheduleByGroup(group: string): Promise<Schedule | null> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Schedule>(
            `${this.URL_MODULE}${this.URL_SCHEDULE}?id=${group}`,
            { deserializeDates: true }
        );
        return response.result;
    }

    async getSchedule(
        groupList: Array<string>,
        teacherList: Array<string>,
        auditoriumList: Array<string>,
        titleList: Array<string>,
        typeList: Array<string>
    ): Promise<Schedule | null> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.create<Schedule>(
            `${this.URL_MODULE}${this.URL_SCHEDULE}`,
            {
                groups: groupList,
                teachers: teacherList,
                auditoriums: auditoriumList,
                types: typeList,
                titles: titleList
            },
            { deserializeDates: true }
        );
        return response.result;
    }

    async getGroupList(): Promise<Array<string>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<string>>(
            `${this.URL_MODULE}${this.URL_GROUP_LIST}`,
            { deserializeDates: true }
        );
        return response.result ?? new Array<string>();
    }
    async getTeacherList(): Promise<Array<string>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<string>>(
            `${this.URL_MODULE}${this.URL_TEACHER_LIST}`,
            { deserializeDates: true }
        );
        return response.result ?? new Array<string>();
    }
    async getAuditoriumList(): Promise<Array<string>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<string>>(
            `${this.URL_MODULE}${this.URL_AUDITORIUM_LIST}`,
            { deserializeDates: true }
        );
        return response.result ?? new Array<string>();
    }
    async getTitleList(): Promise<Array<string>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<string>>(
            `${this.URL_MODULE}${this.URL_TITLE_LIST}`,
            { deserializeDates: true }
        );
        return response.result ?? new Array<string>();
    }
    async getTypeList(): Promise<Array<string>> {
        const rest = new RestClient(undefined, this.URL_BASE);
        const response = await rest.get<Array<string>>(
            `${this.URL_MODULE}${this.URL_TYPE_LIST}`,
            { deserializeDates: true }
        );
        return response.result ?? new Array<string>();
    }
}

interface ScheduleSearch {
    groups: Array<string>;
    teachers: Array<string>;
    auditoriums: Array<string>;
    types: Array<string>;
    titles: Array<string>;
}