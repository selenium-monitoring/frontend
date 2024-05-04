import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, OpenIdConfiguration, StsConfigHttpLoader, StsConfigLoader, StsConfigStaticLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const conf = {
    authority: 'https://dex.cloud.lan',
    redirectUrl: window.location.origin+'/login',
    postLogoutRedirectUri: window.location.origin,
    clientId: 'thesis-dex-client',
    scope: 'openid profile email groups audience:server:client_id:k3s-client', // 'openid profile ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: window.location.origin + '/silent-renew.html',
    renewTimeBeforeTokenExpiresInSeconds: 10,
    startCheckSession: true,
    logLevel: LogLevel.Error,
    secureRoutes: [
        `${environment.baseApiUrl}/api/v1/sites/`
    ],
};

export const httpLoaderFactory = (httpClient: HttpClient) => {
    const config$ = httpClient.get<any>(`assets/oidc.conf`).pipe(
      map((customConfig: any) => {
        console.log(customConfig)
        let scope = `openid profile email groups`
        if (customConfig.extraScopes !== undefined) {
            scope = `${scope} ${customConfig.extraScopes}`
        }
        console.log(scope)
        
        return [conf]
      })
    );
    // return new StsConfigStaticLoader(conf)
    return new StsConfigHttpLoader(config$);
  };

@NgModule({
    imports: [
        AuthModule.forRoot({
        loader: {
            provide: StsConfigLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
        },
        // config: conf
        }),
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}

