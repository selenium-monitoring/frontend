import { Component } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import cronstrue from 'cronstrue/i18n';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  isUploading: boolean = false
  fileList: NzUploadFile[] = [];
  cronValue: string = "* * * * *"

  cronMin: string = "*"
  cronHour: string = "*"
  cronDay: string = "*"
  cronMonth: string = "*"
  cronWeekDay: string = "*"

  constructor(private msg: NzMessageService){
    this.fileList = []
    console.log(this)
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
  handleUpload() {
    this.fileList = this.fileList.map((file:NzUploadFile) => {
      file.status = 'success'
      return file
    })
    this.msg.success('Successfully uploaded')
    console.log(this.fileList)
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
