export class StorageLocalDataSource {
    private localStorageSupported: boolean;

    constructor() {
        this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
    }

    // add value to storage
    set(key: string, value: string) {
        if (this.localStorageSupported) {
            localStorage.setItem(key, value);
        }
    }

    // get one item by key from storage if supported
    get(key: string): string | null {
        if (this.localStorageSupported) {
            var item = localStorage.getItem(key)!;
            return item;
        } else {
            return null;
        }
    }

    // remove value from storage
    remove(key: string) {
        if (this.localStorageSupported) {
            localStorage.removeItem(key);
        }
    }

    // clear storage (remove all items from it)
    clear() {
        if (this.localStorageSupported) {
            localStorage.clear();
        }
    }
}