import Schedule from '../model/schedule';
import ScheduleRepository from '@/data/schedule/repository/scheduleRepository'

export default class ScheduleUseCase {
    private repository = new ScheduleRepository();

    getScheduleByGroup(group: string): Promise<Schedule | null> {
        return this.repository.getScheduleByGroup(group);
    }

    async getSchedule(
        groupList: Array<string>,
        teacherList: Array<string>,
        auditoriumList: Array<string>,
        titleList: Array<string>,
        typeList: Array<string>
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