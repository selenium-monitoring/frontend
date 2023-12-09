
import cronstrue from 'cronstrue/i18n';

export class Site {
    constructor(
        private id:number,
        public url: string,
        public dateAdded: Date,
        public cron: string,
        public testCount: number,
        public lastResult: 'Success'|'Error'|'Running',
    ) {}
    get getUrl() {
        return `/sites/${this.id}/`
    }
    get getReadableCron() {
        return cronstrue.toString(this.cron, {locale: 'en'})
    }
}