import { Component } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import cronstrue from 'cronstrue/i18n';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  validateForm: FormGroup<{
    cron: FormControl<string>,
    repository: FormControl<string>,
    image: FormControl<string>,
    tag: FormControl<string>,
    retries: FormControl<number>,
  }>

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
      cron: ['', [this.validateCron]],
      repository: ['', [Validators.required, Validators.minLength(1)]],
      image: ['', [Validators.required, Validators.minLength(1)]],
      tag: ['latest'],
      retries: [0, Validators.min(0)],
    })
  }

  preprocessUpload = ({uid, name}: NzUploadFile) => {
    this.fileList.push({uid, name, status: 'uploading'})
    this.fileList = this.fileList.slice()
    return false
  }
  handleChange({ file, fileList }: NzUploadChangeParam) {
    console.log(`status: ${file.status}`)
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
    console.log(control)
    try {
      cronstrue.toString(control.value)
      return null
    }
    catch {return {'validateCron': 'Invalid Cron value'}}
  }
  get getCron() {
    let cron = this.cronValue.split(' ')
    if (cron.length != 5) return 'Invalid'
    try {
      return cronstrue.toString(this.cronValue)
    }
    catch {
      return 'Invalid'
    }
  }
  updateValues(event:any) {
    this.cronValue = `${this.cronMin} ${this.cronHour} ${this.cronDay} ${this.cronMonth} ${this.cronWeekDay}`
  }
  updateCron(event:any) {
    let values = this.cronValue.split(' ')
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
