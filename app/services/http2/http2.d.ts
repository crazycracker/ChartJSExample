/**
 * Interface for the HTTP service
 * @typedef {any} T - GET Response body type
 * @typedef {any} A - POST Request body type
 * @typedef {any} B - POST Request body type
 */

import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRequestOpts } from '../../models/request';
import { IResponse } from '../../models/response';

export interface IHTTP2Service {

  /**
   * Execute a GET request
   * @param {IRequestOpts<{}>} req - The request object
   * @return {Observable<IResponse<T>>} The observable response
   */
  get<T>(req: IRequestOpts<{}>): Observable<HttpResponse<IResponse<T>>>;

  /**
   * Execute a POST request
   * @param {IRequestOpts<A>} req - The request object
   * @return {Observable<IResponse<B>>} The observable response
   */
  post<A, B>(req: IRequestOpts<A>): Observable<HttpResponse<IResponse<B>>>;

  /**
   * Execute a DELETE request
   * @param {IRequestOpts<{}>} req - The request object
   * @return {Observable<IResponse<T>>} The observable response
   */
  delete<T>(req: IRequestOpts<{}>): Observable<HttpResponse<IResponse<T>>>;

  /**
   * Execute a PATCH request
   * @param {IRequestOpts<A>} req - The request object
   * @return {Observable<IResponse<B>>} The observable response
   */
  patch<A, B>(req: IRequestOpts<A>): Observable<HttpResponse<IResponse<B>>>;

}
