import * as rm from 'typed-rest-client/RestClient';
import Schedule from '../../../domain/schedule/model/schedule';

export default class ScheduleApi {
    private URL_BASE = 'https://mospolyhelper.herokuapp.com'
    private URL_MODULE = '/schedule'
    private URL_SCHEDULE = '/schedule'

    async getSchedule(): Promise<Schedule | null> {
        let rest: rm.RestClient = new rm.RestClient(undefined, this.URL_BASE)
        let response = await rest.get<Schedule>('/schedule/schedule?id=181-721')
        return response.result;
    }
}