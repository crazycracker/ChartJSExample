/**
 * Model associated with an HTTP response
 * @typedef {any} T - The response body type
 */

import {
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';

/* Wrap response options to allow destructured creation of Response */
export interface IResponse<T> {
  getBody: () => T;
  getHeaders: () => HttpHeaders;
}

/**
 * The implemented Response class
 */
class ResponseImpl<T> implements IResponse<T> {

  constructor(private opts: HttpResponse<T>) {  }

  /**
   * Get the response body
   * @return {T} The response body
   */
  public getBody(): T {
    return this.opts.body;
  }

  /**
   * Get the response headers
   * @return {HttpHeaders} The response headers
   */
  public getHeaders(): HttpHeaders {
    return this.opts.headers;
  }

}

/**
 * Creates Response objects via function helper
 */
export const Response: <T>(opts: HttpResponse<T>) => ResponseImpl<T> =
  <T>(opts: HttpResponse<T>) => new ResponseImpl<T>(opts);
