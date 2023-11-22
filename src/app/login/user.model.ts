export class User {
    constructor(
        public username: string,
        private _token: string,
        private expires: Date) {}
    
    get isLoggedIn() {
        return true;
    }
}