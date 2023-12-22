import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiModule } from './services';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { IconDefinition } from '@ant-design/icons-angular';
import { 
  DashboardOutline, BarChartOutline, SettingOutline,
  UserOutline, GlobalOutline, MenuUnfoldOutline, MenuFoldOutline
 } from '@ant-design/icons-angular/icons';
import { NzDividerModule } from 'ng-zorro-antd/divider';
const icons: IconDefinition[] = [
  DashboardOutline, BarChartOutline, SettingOutline,
  UserOutline, GlobalOutline, MenuUnfoldOutline, MenuFoldOutline
];

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      ApiModule,
      NzLayoutModule,
      NzBreadCrumbModule,
      NzIconModule.forRoot(icons),
      NzMenuModule,
      NzDividerModule,
    ],
    declarations: [AppComponent],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Selenium Monitoring'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Selenium Monitoring');
  });

  it('should render login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nz-content a')?.textContent).toContain('Home');
  });
});
