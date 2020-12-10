import Schedule from '@/domain/schedule/model/schedule';
import ScheduleApi from '../api/scheduleApi'

export default class ScheduleRemoteDataSource {
    private api = new ScheduleApi();

    getScheduleByGroup(group: String): Promise<Schedule | null> {
        return this.api.getScheduleByGroup(group);
    }

    async getSchedule(
        groupList: Array<String>,
        teacherList: Array<String>,
        auditoriumList: Array<String>,
        titleList: Array<String>,
        typeList: Array<String>
    ): Promise<Schedule | null> {
        return this.api.getSchedule(
            groupList,
            teacherList,
            auditoriumList,
            titleList,
            typeList
        )
    }

    getGroupList(): Promise<Array<string>> {
        return this.api.getGroupList();
    }

    getTeacherList(): Promise<Array<string>> {
        return this.api.getTeacherList();
    }

    getAuditoriumList(): Promise<Array<string>> {
        return this.api.getAuditoriumList();
    }

    getTitleList(): Promise<Array<string>> {
        return this.api.getTitleList();
    }

    getTypeList(): Promise<Array<string>> {
        return this.api.getTypeList();
    }
}