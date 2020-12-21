import { StorageLocalDataSource } from "../local/storageLocalDataSource";

export default class PreferencesRepository {
    constructor(
        private dataSource: StorageLocalDataSource
    ) { }

    getPreference(key: string, defaultValue: string): string {
        return this.dataSource.get(key) ?? defaultValue;
    }

    setPreference(key: string, value: string) {
        this.dataSource.set(key, value);
    }
}