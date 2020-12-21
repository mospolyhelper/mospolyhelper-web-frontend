export default interface StorageRepository {
    set(key: string, value: string): void;

    get(key: string): string | null;

    remove(key: string): void;

    clear(): void;
}