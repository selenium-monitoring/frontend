import { FormControl } from "@angular/forms"

export type CronFormType = {
    name: FormControl<string>,
    cron: FormControl<string>,
    repository: FormControl<string>,
    image: FormControl<string>,
    tag: FormControl<string>,
    retries: FormControl<number>,
  }
export type CronFormEventType = {
    name: string,
    cron: string,
    repository: string,
    image: string,
    tag: string,
    retries: number,
  }
  