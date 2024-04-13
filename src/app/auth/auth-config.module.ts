import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dex.cloud.lan',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'thesis-dex-client',
            scope: 'openid profile email', // 'openid profile ' + your scopes
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 10,
            startCheckSession: true,
            logLevel: LogLevel.Debug,
            secureRoutes: [
                `${environment.baseApiUrl}/api/v1/sites/`
            ],
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}

