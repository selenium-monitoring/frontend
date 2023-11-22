import { ApplicationConfig, Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy, provideRouter } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UploaderComponent } from './uploader/uploader.component';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '', title: 'Dashboard', component: MainComponent,
    canActivate: [],
  },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'upload', title: 'Upload Test', component: UploaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

@Injectable({providedIn: 'root'})
export class appTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | Selenium Monitoring`);
    }
  }
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: TitleStrategy, useClass: appTitleStrategy},
  ]
};