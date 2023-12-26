import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush,  } from '@angular/core/testing';

import { UploaderComponent } from './uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconDefinition } from '@ant-design/icons-angular';
import { 
  InboxOutline, FormOutline, ReloadOutline
 } from '@ant-design/icons-angular/icons';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ApiModule } from '../services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SideFile, SideFileType } from './side.model';
import { equals } from 'fp-ts/lib/Ord';
import { sites } from '../site-list/mock-sites';
import { Router } from '@angular/router';
const icons: IconDefinition[] = [
  InboxOutline, FormOutline, ReloadOutline
];


describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;
  let msg: NzMessageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploaderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzUploadModule,
        NzDividerModule,
        NzTabsModule,
        ApiModule,
        NzIconModule.forRoot(icons),
      ],
    });
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    msg = TestBed.inject(NzMessageService);
    router = TestBed.inject(Router)
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true))

    let functions:(keyof NzMessageService)[] = [
      'error', 'info','success', 'warning'
    ]
    functions.forEach(funcName => {
      spyOn(msg, funcName).and.callThrough();
    })
    
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
  it('should not show wrong file info', fakeAsync(() => {
    let mockfile: NzUploadFile = {
      name: 'mock.txt',
      uid: '',
      text: () => {
        return new Promise((res, rej)=>{
          res("Wrong File")
        })
      }
    }
    expect(component.preprocessUpload(mockfile)).toBeFalse();
    flush();
    expect(msg.error).toHaveBeenCalledWith('Error parsing file: mock.txt')
    expect(component.file).toBeUndefined()
    expect(component.fileInfo).toBeUndefined()
    
    mockfile = {
      name: 'mock.txt',
      uid: '',
      text: () => {
        return new Promise((res, rej)=>{
          res("{}")
        })
      }
    }
    expect(component.preprocessUpload(mockfile)).toBeFalse();
    flush();
    expect(msg.error).toHaveBeenCalledWith('File does not look like a .side file')
    expect(component.file).toBeUndefined()
    expect(component.fileInfo).toBeUndefined()
  }));
  it('should show file info', fakeAsync(() => {
    const info: SideFileType = {
      id: 'uuid',
      version: '1.0',
      name: 'Test File',
      url: 'http://localhost',
      urls: [],
      plugins: [],
      tests: ['1','2','3'],
      suites: [{
        id: '',
        name: 'Test Suite',
        timeout: 0,
        tests: ['test1', 'test2']
      }]
    }
    const mockfile: NzUploadFile = {
      name: 'mock.txt',
      uid: '',
      text: () => {
        return new Promise((res, rej)=>{
          res(JSON.stringify(info))
        })
      }
    }
    expect(component.preprocessUpload(mockfile)).toBeFalse();
    flush();
    expect(msg.success).toHaveBeenCalledWith('File seems valid')
    expect(component.file).toBeDefined()
    expect(component.fileInfo).toBeDefined()
    expect(component.fileInfo).toEqual(info)
  }));
  describe('validations', () => {
    it('should fail as empty', () => {
      expect(component.validateForm.dirty).toBeFalse();
      expect(component.validateForm.valid).toBeFalse();
      component.submitForm();
      expect(component.validateForm.dirty).toBeTrue();
      expect(msg.error).toHaveBeenCalled()
    });
    it('should validate cron', () => {
      component.validateForm.patchValue({cron: ''})
      component.submitForm()
      expect(component.validateForm.controls.cron.dirty).toBeTrue()

      component.validateForm.patchValue({cron: '* * * * *'})
      component.submitForm()
      expect(component.getCron).toBe('Every minute')
      expect(component.validateForm.controls.cron.invalid).toBeFalse()
    });
    
    it('should accept', fakeAsync(() => {
      // fileInfo only needs the url property for validation
      component.fileInfo = {url:'test'} as SideFileType
      component.validateForm.setValue({
        cron: '* * * * *',
        image: 'test',
        name: 'test',
        repository: 'test',
        retries: 1,
        tag: ''
      });
      component.submitForm()
      expect(component.validateForm.valid).toBeTrue()
      flush()
      expect(msg.error).not.toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalledWith(['sites'])
      expect(component.validateForm.dirty).toBeFalse();
    }));

    it('should not accept duplicate name', fakeAsync(() => {
      const dummy = sites[0]
      component.fileInfo = {url:'test'} as SideFileType
      component.validateForm.setValue({
        cron: '* * * * *',
        image: 'test',
        name: dummy.name,
        repository: 'test',
        retries: 1,
        tag: ''
      });
      expect(component.validateForm.valid).toBeTrue()
      component.submitForm()
      flush()
      expect(msg.error).toHaveBeenCalledWith(`Name "${component.validateForm.value.name}" already exists!`)
      expect(component.validateForm.dirty).toBeFalse();
      discardPeriodicTasks()
      flush()
    }));
  });

  describe('Cron logic', () => {
    it('should change cron parts', () => {
      expect(component.cronMin).toBe('*')
      expect(component.cronHour).toBe('*')
      expect(component.cronDay).toBe('*')
      expect(component.cronMonth).toBe('*')
      expect(component.cronWeekDay).toBe('*')
      component.updateCron({cron: '10 20 11 3 4'})
      expect(component.cronMin).toBe('10')
      expect(component.cronHour).toBe('20')
      expect(component.cronDay).toBe('11')
      expect(component.cronMonth).toBe('3')
      expect(component.cronWeekDay).toBe('4')
    })
    it('should change cronValue', () => {
      expect(component.validateForm.controls.cron.value).toBe('* * * * *')
      component.cronMin = '11'
      component.cronHour = '12'
      component.cronDay = '13'
      component.cronMonth = '14'
      component.cronWeekDay = '15'
      component.updateValues()
      expect(component.validateForm.controls.cron.value).toBe('11 12 13 14 15')
    })
  })
});
