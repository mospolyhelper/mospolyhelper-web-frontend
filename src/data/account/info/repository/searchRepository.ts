import AccountInfo from '@/domain/account/info/model/accountInfo';
import Result from '../../../../utils/result';
import InfoRemoteDataSource from '../remote/infoRemoteDataSource';

export default class InfoRepository {
    private remoteDataSource = new InfoRemoteDataSource();

    getAccountInfo(): Promise<Result<AccountInfo>> {
        return this.remoteDataSource.getAccountInfo();
    }
}
