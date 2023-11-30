export class Site {
    constructor(
        private id:number,
        public url: string,
        public dateAdded: Date,
        public testCount: number,
        public lastResult: 'Success'|'Error'|'Running',
    ) {}
    get getUrl() {
        return `/sites/${this.id}/`
    }
}