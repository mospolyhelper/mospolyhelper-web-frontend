import Schedule from '@/domain/schedule/model/schedule';
import ScheduleRemoteDataSource from '../remote/scheduleRemoteDataSource'

export default class ScheduleRepository {
    private remoteDataSource = new ScheduleRemoteDataSource();

    getScheduleByGroup(group: String): Promise<Schedule | null> {
        return this.remoteDataSource.getScheduleByGroup(group);
    }

    async getSchedule(
        groupList: Array<String>,
        teacherList: Array<String>,
        auditoriumList: Array<String>,
        titleList: Array<String>,
        typeList: Array<String>
    ): Promise<Schedule | null> {
        return this.remoteDataSource.getSchedule(
            groupList,
            teacherList,
            auditoriumList,
            titleList,
            typeList
        )
    }

    getGroupList(): Promise<Array<string>> {
        return this.remoteDataSource.getGroupList();
    }

    getTeacherList(): Promise<Array<string>> {
        return this.remoteDataSource.getTeacherList();
    }

    getAuditoriumList(): Promise<Array<string>> {
        return this.remoteDataSource.getAuditoriumList();
    }

    getTitleList(): Promise<Array<string>> {
        return this.remoteDataSource.getTitleList();
    }

    getTypeList(): Promise<Array<string>> {
        return this.remoteDataSource.getTypeList();
    }
}