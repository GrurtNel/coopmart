export class Storage {
    static saveSession(key: string, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static getSession(key: string) {
        return JSON.parse(sessionStorage.getItem(key) || '{}');
    }
    static setLocal(key: string, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getLocal(key: string) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }
}

