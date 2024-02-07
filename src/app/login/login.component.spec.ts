import { fakeAsync, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconDefinition } from '@ant-design/icons-angular';
import { 
  LockOutline, UserOutline
 } from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BackendService } from '../backend/backend.service';
import { ApiModule } from '../services';
import { NzSpinModule } from 'ng-zorro-antd/spin';
const icons: IconDefinition[] = [
  LockOutline, UserOutline
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ApiModule,
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        NzIconModule.forRoot(icons),
        NzDividerModule,
        NzSpinModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router)
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true))
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('validations', () => {
    it('should fail', () => {
      expect(component.validateForm.dirty).toBeFalse();
      expect(component.validateForm.valid).toBeFalse();
      component.submitForm();
      expect(component.validateForm.dirty).toBeTrue();
      
    });

    it('should not log in', fakeAsync(() => {
      component.validateForm.setValue({
        userName: 'test',
        password: 'different',
        remember: false,
      });
      expect(component.validateForm.valid).toBeTrue();
      component.submitForm();
      flush()
      expect(router.navigate).not.toHaveBeenCalledWith(['/'])
    }))
    
    it('should redirect', fakeAsync(() => {
      component.validateForm.setValue({
        userName: 'test',
        password: 'test',
        remember: false,
      });
      expect(component.validateForm.valid).toBeTrue();
      component.submitForm();
      flush()
      expect(router.navigate).toHaveBeenCalledWith(['/'])
    }));
  });
});
