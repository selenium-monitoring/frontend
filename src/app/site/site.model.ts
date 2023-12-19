
import cronstrue from 'cronstrue/i18n';
import { parseExpression, CronDate } from 'cron-parser'

export class Site {
    constructor(
        public name:string,
        public url: string,
        public dateAdded: Date,
        public cron: string,
        public lastResult: 'Success'|'Error'|'Running'|'Unknown',
        private interval?: CronDate
    ) {
      try {
        this.interval = parseExpression(this.cron).next()
      }
      catch {}
    }
    get getReadableCron():string {
        if (this.interval !== undefined)
          return cronstrue.toString(this.cron, {locale: 'en'})
        else return 'Invalid'
    }
    get getNextRun() {
      return this.interval?.toString()
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
              return 'default'
          }
    }
}