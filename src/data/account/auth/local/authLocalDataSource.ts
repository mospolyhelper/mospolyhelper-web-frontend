import { getCookie, setCookie } from '@/utils/cookieUtils'

export default class AuthLocalDataSource {
    getSessionId(): string | null {
        return getCookie('SessionId');
    }

    setSessionId(value: string) {
        setCookie('SessionId', value);
    }
}