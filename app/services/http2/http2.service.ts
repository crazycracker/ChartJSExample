/**
 * Core HTTP Service
 * Wraps the Angular2 HTTP Service to provide easier handling
 * @typedef {any} T - GET Response body type
 * @typedef {any} A - POST Request body type
 * @typedef {any} B - POST Request body type
 */

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHTTP2Service } from './http2';
import { handleHttpError } from '../../utils/http-error-handler';
import { IRequestOpts, Request } from '../../models/request';
import { IResponse } from '../../models/response';

@Injectable()
export class Http2Service implements IHTTP2Service {

  constructor(
    private http: HttpClient,
  ) {  }

  /**
   * Execute a GET request
   * @param {IRequestOpts<{}>} req - The request object
   * @return {Observable<IResponse<T>>} The observable response
   */
  public get<A>(req: IRequestOpts<{}>): Observable<HttpResponse<IResponse<A>>> {
    const request = Request<{}>(req);
    return this.http
      .get<IResponse<A>>(request.toString(), {
        headers: request.getHeaders(req.headers),
        observe: 'response',
        params: request.getParams(req.params),
      }).pipe(catchError(handleHttpError));
  }

  /**
   * Execute a POST request
   * @param {IRequestOpts<A>} req - The request object
   * @return {Observable<IResponse<B>>} The observable response
   */
  public post<A, B>(req: IRequestOpts<A>): Observable<HttpResponse<IResponse<B>>> {
    const request = Request<A>(req);

    return this.http
      .post<IResponse<B>>(
        request.toString(),
        request.hasBody() ? request.getBody() : null,
      {
        headers: request.getHeaders(req.headers),
        observe: 'response',
        params: request.getParams(req.params),
      }).pipe(catchError(handleHttpError));
  }

  /**
   * Execute a DELETE request
   * @param {IRequestOpts<{}>} req - The request object
   * @return {Observable<IResponse<T>>} The observable response
   */
  public delete<A>(req: IRequestOpts<{}>): Observable<HttpResponse<IResponse<A>>> {
    const request = Request<{}>(req);

    return this.http
      .delete<IResponse<A>>(request.toString(), {
        headers: request.getHeaders(req.headers),
        observe: 'response',
        params: request.getParams(req.params),
      }).pipe(catchError(handleHttpError));
  }

  /**
   * Execute a PATCH request
   * @param {IRequestOpts<A>} req - The request object
   * @return {Observable<IResponse<B>>} The observable response
   */
  public patch<A, B>(req: IRequestOpts<A>): Observable<HttpResponse<IResponse<B>>> {
    const request = Request<A>(req);

    return this.http
    .patch<IResponse<B>>(
      request.toString(),
      request.hasBody() ? request.getBody() : null,
      {
        headers: request.getHeaders(req.headers),
        observe: 'response',
        params: request.getParams(req.params),
      }).pipe(catchError(handleHttpError));
  }
}
