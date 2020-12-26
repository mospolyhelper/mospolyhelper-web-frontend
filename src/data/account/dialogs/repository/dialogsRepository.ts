import DialogPreview from '@/domain/account/dialogs/model/dialogs';
import AccountInfo from '@/domain/account/info/model/accountInfo';
import Result from '../../../../utils/result';
import DialogsRemoteDataSource from '../remote/dialogsRemoteDataSource';

export default class DialogsRepository {
    private remoteDataSource = new DialogsRemoteDataSource();

    getDialogs(): Promise<Result<DialogPreview[]>> {
        return this.remoteDataSource.getDialogs();
    }
}
