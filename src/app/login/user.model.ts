export class User {
    constructor(
        public username: string,
        private expires: Date,
        private _token?: string,
    ) {}
    
    get isLoggedIn() {
        return true
    }
}