import { Component } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
import cronstrue from 'cronstrue/i18n';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';

import { SideFile, SideFileType } from './side.model';
import { isRight } from 'fp-ts/Either'
import { CronFormEventType, CronFormType } from './cronform.model';
import { BackendService } from '../backend.service';
import { keyof } from 'io-ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  validateForm: FormGroup<CronFormType>

  isUploading: boolean = false
  file?: NzUploadFile
  fileInfo?: SideFileType
  cronValue: string = "* * * * *"

  cronMin: string = "*"
  cronHour: string = "*"
  cronDay: string = "*"
  cronMonth: string = "*"
  cronWeekDay: string = "*"

  constructor(
    private msg: NzMessageService,
    private fb: NonNullableFormBuilder,
    private backend: BackendService,
    private router: Router,
  ){
    this.validateForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      cron: [this.cronValue, [this.validateCron, Validators.required]],
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
      let data: SideFileType
      try {
        data = JSON.parse(value)
      }
      catch(ex) {
        this.msg.error(`Error parsing file: ${file.name}`)
        return
      }
      if(isRight( SideFile.decode(data) )) {
        // file looks like a .side file
        file.status = 'success'
        this.fileInfo = data

        this.file = file
        this.msg.success('File seems valid')
      }
      else {
        this.file = undefined
        this.msg.error('File does not look like a .side file')
      }
    })
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
        this.file = undefined
        this.fileInfo = undefined
        this.msg.warning('removed')
        break
    }
    
  }

  submitForm() {
    if (!this.validateForm.valid || this.fileInfo === undefined) {
      this.msg.error('Invalid Form')
      this.validateForm.markAsPristine()
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true})
        }
      })
      return
    }
    // constrols are Partial because they can be disabled
    // https://stackoverflow.com/a/73751998
    const val = this.validateForm.getRawValue()
    this.backend.submitSite(val, this.fileInfo).then(()=> {
      this.msg.success('Successfully uploaded')
      this.router.navigate(['sites'])
    }).catch((reason:Error) => {
      this.msg.error(reason.message)
    })
    
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
