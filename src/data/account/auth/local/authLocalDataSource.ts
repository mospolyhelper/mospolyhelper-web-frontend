import { getCookie, setCookie } from '@/utils/cookieUtils'
import Result from '../../../../utils/result';

export default class AuthLocalDataSource {
    getSessionId(): string {
        return getCookie('SessionId') ?? '';
    }

    setSessionId(value: string) {
        setCookie('SessionId', value);
    }
}