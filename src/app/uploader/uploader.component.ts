import { Component } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import cronstrue from 'cronstrue/i18n';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

type CronFormType = {
  cron: FormControl<string>,
  repository: FormControl<string>,
  image: FormControl<string>,
  tag: FormControl<string>,
  retries: FormControl<number>,
}
type CronFormEventType = {
  cron: string,
  repository: string,
  iamge: string,
  tag: string,
  retries: number,
}

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  validateForm: FormGroup<CronFormType>

  isUploading: boolean = false
  fileList: NzUploadFile[] = [];
  cronValue: string = "* * * * *"

  cronMin: string = "*"
  cronHour: string = "*"
  cronDay: string = "*"
  cronMonth: string = "*"
  cronWeekDay: string = "*"

  constructor(private msg: NzMessageService, private fb: NonNullableFormBuilder){
    this.fileList = []
    this.validateForm = this.fb.group({
      cron: [this.cronValue, [this.validateCron]],
      repository: ['', [Validators.required, Validators.minLength(1)]],
      image: ['', [Validators.required, Validators.minLength(1)]],
      tag: ['latest'],
      retries: [0, Validators.min(0)],
    })
    this.validateForm.valueChanges.subscribe((data:Partial<CronFormEventType>) => this.updateCron(data));
  }

  preprocessUpload = (file: NzUploadFile) => {
    // @ts-ignore
    // argument 'file' is actually a File object with added NzUploadFile attributes
    // https://github.com/NG-ZORRO/ng-zorro-antd/issues/4744
    (file as File).text().then(value => {
      try {
        const data = JSON.parse(value)
      }
      catch {
        this.msg.error(`Error parsing file: ${file.name}`)
        return
      }
      file.status = 'uploading'
      this.fileList.push(file)
      this.fileList = this.fileList.slice()
      this.msg.success('File seems valid')
    })
    console.log(file)
    return false
  }
  handleChange({ file, fileList }: NzUploadChangeParam) {
    switch (file.status) {
      case 'uploading':
        this.msg.info('still uploading')
        break
      case 'error':
        this.msg.error('Error happened')
        break
      case 'success':
        this.msg.success('done?')
        break
      case 'done':
        this.msg.success('done2?')
        break
      case 'removed':
        this.msg.warning('removed')
        break
    }
  }

  submitForm() {
    if (!this.validateForm.valid) {
      this.msg.error('Invalid Form')
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true})
        }
      })
      return
    }
    this.fileList = this.fileList.map((file:NzUploadFile) => {
      file.status = 'success'
      return file
    })
    this.msg.success('Successfully uploaded')
    console.log(this.fileList)
  }
  validateCron(control: AbstractControl): ValidationErrors | null {
    try {
      cronstrue.toString(control.value)
      return null
    }
    catch {return {'validateCron': 'Invalid Cron value'}}
  }
  get getCron() {
    const cronValue = this.validateForm.value.cron
    if (cronValue?.split(' ').length != 5) return 'Invalid'
    try {
      return cronstrue.toString(cronValue)
    }
    catch {
      return 'Invalid'
    }
  }
  updateValues() {
    const cronValue = `${this.cronMin} ${this.cronHour} ${this.cronDay} ${this.cronMonth} ${this.cronWeekDay}`
    this.validateForm.patchValue({cron: cronValue})
  }
  
  updateCron(event: Partial<CronFormEventType>):void {
    if (event.cron === undefined) return
    let values = event.cron.split(' ')
    this.cronWeekDay = this.cronMonth = this.cronDay = this.cronHour = this.cronMin = ''
    switch (values.length)
    {
      // @ts-ignore
      case 5:
        this.cronWeekDay = values[4]
      // @ts-ignore
      case 4:
        this.cronMonth = values[3]
      // @ts-ignore
      case 3:
        this.cronDay = values[2]
      // @ts-ignore
      case 2:
        this.cronHour = values[1]
      // @ts-ignore
      case 1:
        this.cronMin = values[0]
      default:
        break
    }
  }
}
