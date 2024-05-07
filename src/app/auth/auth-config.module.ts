import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

export const httpLoaderFactory = (httpClient: HttpClient) => {
    const config$ = httpClient.get<any>(`assets/oidc.conf`).pipe(
      map((customConfig: any) => {
        let scope = `openid profile email groups`
        if (customConfig.extraScopes !== undefined) {
            scope = `${scope} ${customConfig.extraScopes}`
        }
        const conf = {
            authority: customConfig.authority,
            redirectUrl: window.location.origin+'/login',
            postLogoutRedirectUri: window.location.origin,
            clientId: customConfig.clientId,
            scope: scope,
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 10,
            startCheckSession: true,
            logLevel: LogLevel.Error,
            secureRoutes: [
                `${environment.baseApiUrl}/api/v1/sites/`
            ],
        }
        
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

