/**
 * API Service
 */

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IAPIServiceOpts } from '../../models/request';
import { IParams, Scheme } from '../../models/http2';
import { IRequestOpts } from '../../models/request';
import { IResponse } from '../../models/response';
import { Http2Service } from '../http2/http2.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class APIService {
  constructor(private http: Http2Service) { }

  public get(options: IAPIServiceOpts<{}>): Observable<HttpResponse<IResponse<{}>>> {
    return this.http.get(this.buildOptions(options, 'GET'));
  }

  /**
   * @description Method to post request
   * @param {IAPIServiceOpts} options - An object containing the body
   */
  public post(options: IAPIServiceOpts<{}>): Observable<HttpResponse<IResponse<{}>>> {
    const setOptions = options;
    return this.http.post(this.buildOptions(setOptions, 'POST'));
  }

  public delete(options: IAPIServiceOpts<{}>): Observable<HttpResponse<IResponse<{}>>> {
    return this.http.delete(this.buildOptions(options, 'DELETE'));
  }

  public patch(options: IAPIServiceOpts<{}>): Observable<HttpResponse<IResponse<{}>>> {
    return this.http.patch(this.buildOptions(options, 'PATCH'));
  }

  /**
   * @description Method to build all the options to pass
   * the http service
   * @param {Object} options - An object with the options passed by
   * a service that utilizes the API service
   * @return {IRequestOpts<{}>}
   */
  private buildOptions(options: IAPIServiceOpts<{}>, method?: string): IRequestOpts<{}> {
    return {
      // don't send correlationId in body with GET requests
      body: (method && method !== 'GET' && typeof options.body !== 'string') ?
        { ...options.body } : options.body,
      headers: options.headers,
      host: environment.host,
      // if the body is a string, force the correlationId in the queyrstring for POST/PUT/PATCH/DELETE
      params: options.params,
      path: options.path,
      scheme: environment.scheme as Scheme,
    };
  }
}
