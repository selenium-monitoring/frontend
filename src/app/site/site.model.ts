
import cronstrue from 'cronstrue/i18n';

export class Site {
    constructor(
        public name:string,
        public url: string,
        public dateAdded: Date,
        public cron: string,
        public testCount: number,
        public lastResult: 'Success'|'Error'|'Running',
    ) {}
    get getUrl() {
        return `/sites/${this.name}/`
    }
    get getReadableCron() {
        try {
            return cronstrue.toString(this.cron, {locale: 'en'})
        }
        catch {
            return 'Invalid Cron timing'
        }
    }

    get lastResultAsStatus() {
        switch(this.lastResult) {
            case "Error":
              return "error"
            case "Running":
              return "processing"
            case "Success":
              return "success"
            default:
              return 'warning'
          }
    }
}