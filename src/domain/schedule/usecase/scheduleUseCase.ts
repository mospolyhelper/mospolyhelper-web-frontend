import Schedule from '../model/schedule';
import ScheduleRepository from '@/data/schedule/repository/scheduleRepository'

export default class ScheduleUseCase {
    private repository = new ScheduleRepository();

    getScheduleByGroup(group: String): Promise<Schedule | null> {
        return this.repository.getScheduleByGroup(group);
    }

    async getSchedule(
        groupList: Array<String>,
        teacherList: Array<String>,
        auditoriumList: Array<String>,
        titleList: Array<String>,
        typeList: Array<String>
    ): Promise<Schedule | null> {
        return this.repository.getSchedule(
            groupList,
            teacherList,
            auditoriumList,
            titleList,
            typeList
        )
    }

    getGroupList(): Promise<Array<string>> {
        return this.repository.getGroupList();
    }

    getTeacherList(): Promise<Array<string>> {
        return this.repository.getTeacherList();
    }

    getAuditoriumList(): Promise<Array<string>> {
        return this.repository.getAuditoriumList();
    }

    getTitleList(): Promise<Array<string>> {
        return this.repository.getTitleList();
    }

    getTypeList(): Promise<Array<string>> {
        return this.repository.getTypeList();
    }
}