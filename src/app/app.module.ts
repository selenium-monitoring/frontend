import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './backend/api/api.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';


import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';

import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

import { 
  LockOutline, UserOutline, InboxOutline, DownloadOutline, ReloadOutline, FormOutline,
  MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, CalendarOutline, SettingOutline,
  BarChartOutline, GlobalOutline, LayoutOutline, UploadOutline,
 } from '@ant-design/icons-angular/icons';
import { UploaderComponent } from './uploader/uploader.component';
import { LoginService } from './login/login.service';
import { appTitleStrategy } from './app-routing.module';
import { TitleStrategy } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteComponent } from './site/site.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthConfigModule } from './auth/auth-config.module';
import { AbstractSecurityStorage, AuthInterceptor, DefaultLocalStorageService } from 'angular-auth-oidc-client';
const icons: IconDefinition[] = [
  LockOutline, UserOutline, InboxOutline, DownloadOutline, ReloadOutline, FormOutline,
  MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, CalendarOutline, SettingOutline,
  BarChartOutline, GlobalOutline, LayoutOutline, UploadOutline,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UploaderComponent,
    SiteListComponent,
    SiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.baseApiUrl }),
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule.forRoot(icons),
    NzDropDownModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzAvatarModule,
    NzTableModule,
    NzPaginationModule,
    NzUploadModule,
    NzSpaceModule,
    FormsModule,
    NzDividerModule,
    NzToolTipModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzTabsModule,
    NzTagModule,
    NzAlertModule,
    NzSpinModule,
    AuthConfigModule,
    NzModalModule,
  ],
  providers: [
    provideNzConfig(ngZorroConfig),
    provideNzI18n(en_US),
    {provide: AbstractSecurityStorage, useClass: DefaultLocalStorageService},
    LoginService,
    {provide: TitleStrategy, useClass: appTitleStrategy},
    {provide: LOCALE_ID, useValue: "en-US"},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
 }
