import Result from '../../../../utils/result';
import InfoApi from '../api/infoApi';
import AccountInfo from '@/domain/account/info/model/accountInfo';

export default class InfoRemoteDataSource {
    private api = new InfoApi();

    getAccountInfo(): Promise<Result<AccountInfo>> {
        return this.api.getAccountInfo();
    }
}