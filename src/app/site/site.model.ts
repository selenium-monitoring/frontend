
import cronstrue from 'cronstrue/i18n';
import { parseExpression, CronDate, CronExpression } from 'cron-parser'

export class Site {
    constructor(
        public name:string,
        public url: string,
        public dateAdded: Date,
        public cron: string,
        public lastResult: 'Success'|'Error'|'Running'|'Unknown',
        private nextRunTime?: Date,
        private lastRunTime?: Date,
    ) {
      try {
        const expression = parseExpression(this.cron)
        this.nextRunTime = expression.next().toDate()
        this.lastRunTime = expression.prev().toDate()
      }
      catch {}
    }
    get getReadableCron():string {
      if (this.nextRunTime !== undefined)
        return cronstrue.toString(this.cron, {locale: 'en'})
      else return 'Invalid'
    }
    get getLastRun() {
      return this.lastRunTime
    }
    get getNextRun() {
      return this.nextRunTime
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