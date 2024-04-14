/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LoginResponse } from '../models/login-response';
import { Login } from '../models/login';
import { SiteList } from '../models/site-list';
import { SubmitSite } from '../models/submit-site';
import { Site } from '../models/site';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly LoginPath = '/api/v1/login';
  static readonly pingPath = '/api/v1/ping';
  static readonly SiteListPath = '/api/v1/sites/';
  static readonly SubmitSitePath = '/api/v1/sites/';
  static readonly SiteItemPath = '/api/v1/sites/{site}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param Body undefined
   * @return LoginResponse
   */
  LoginResponse(Body: Login): __Observable<__StrictHttpResponse<LoginResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoginResponse>;
      })
    );
  }
  /**
   * @param Body undefined
   * @return LoginResponse
   */
  Login(Body: Login): __Observable<LoginResponse> {
    return this.LoginResponse(Body).pipe(
      __map(_r => _r.body as LoginResponse)
    );
  }
  pingResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/ping`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  ping(): __Observable<null> {
    return this.pingResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @return SiteList
   */
  SiteListResponse(): __Observable<__StrictHttpResponse<SiteList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/sites/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SiteList>;
      })
    );
  }
  /**
   * @return SiteList
   */
  SiteList(): __Observable<SiteList> {
    return this.SiteListResponse().pipe(
      __map(_r => _r.body as SiteList)
    );
  }

  /**
   * @param Body undefined
   */
  SubmitSiteResponse(Body?: SubmitSite): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/sites/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param Body undefined
   */
  SubmitSite(Body?: SubmitSite): __Observable<null> {
    return this.SubmitSiteResponse(Body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param site undefined
   * @return Site
   */
  SiteItemResponse(site: string): __Observable<__StrictHttpResponse<Site>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/sites/${encodeURIComponent(String(site))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Site>;
      })
    );
  }
  /**
   * @param site undefined
   * @return Site
   */
  SiteItem(site: string): __Observable<Site> {
    return this.SiteItemResponse(site).pipe(
      __map(_r => _r.body as Site)
    );
  }
}

module ApiService {
}

export { ApiService }
