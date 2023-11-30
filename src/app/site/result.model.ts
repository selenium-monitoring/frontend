export class Result {
    constructor(
        private id:number,
        public name: string,
        public cron: string,
        public createdAt: Date,
        public Status: 'Success'|'Error'|'Running',
    ) {}
}