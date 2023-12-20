import { ApplicationConfig, Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UploaderComponent } from './uploader/uploader.component';
import { Title } from '@angular/platform-browser';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteComponent } from './site/site.component';
import { loggedInGuard } from './logged-in.guard';

const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: '', title: 'Dashboard',
    canMatch: [loggedInGuard],
    children: [
      { path: '', title: 'Dashboard', component: MainComponent },
      { path: 'sites', title: 'Websites',
        children: [
          { path: '', title: 'Dashboard', component: SiteListComponent },
          { path: ':name', title: 'Website Detail', component: SiteComponent},
        ]
      },
      { path: 'upload', title: 'Upload Test', component: UploaderComponent },
    ]
  },
  { path: '**', title: 'Redirecting', redirectTo: '/login', pathMatch: 'prefix'},
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
    provideRouter(routes, withComponentInputBinding()),
    {provide: TitleStrategy, useClass: appTitleStrategy},
  ]
};