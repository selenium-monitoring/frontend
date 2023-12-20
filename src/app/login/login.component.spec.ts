import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        NzIconModule.forRoot(icons),
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
    
    it('should redirect', () => {
      component.validateForm.setValue({
        userName: 'test',
        password: 'test',
        remember: false,
      });
      expect(component.validateForm.valid).toBeTrue();
      component.submitForm();
      expect(router.navigate).toHaveBeenCalledWith(['/'])
    });
  });
});
