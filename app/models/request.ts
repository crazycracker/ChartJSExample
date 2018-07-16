/**
 * Model associated with an HTTP2 Request
 * @typedef {any} T - The request body type
 */

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { IParams, Scheme } from './http2';
import { buildQueryString, buildUrlString } from './utils';

/* Request options */
export interface IRequestOpts<T extends {}> {
  scheme: Scheme;
  headers?: { [key: string]: string };
  host: string;
  port?: number;
  path?: string;
  params?: IParams;
  body?: T;
}

/* Wrap request options to allow destructured creation of Request */
export interface IRequest<T> {
  hasBody: () => boolean;

  getBody: () => {};
  getHeaders: (headers: {}) => HttpHeaders | null;

  toString: () => string;
}

/**
 * The implemented Request class
 */
class RequestImpl<T extends {}> implements IRequest<T> {

  constructor(private opts: IRequestOpts<T>) { }

  /**
   * Override Request's toString and build via the http helpers
   * @return {string} The fully formed URL string
   */
  public toString(): string {
    return buildUrlString(this.opts.scheme, this.opts.host, this.opts.port, this.opts.path);
  }

  /**
   * Get the headers for this request or an empty Headers object
   * @param {Object} headers - An object containing headers for the request
   * @return {Headers} The Angular headers object
   */
  public getHeaders(headers: {} | undefined): HttpHeaders | null {
    return headers ? new HttpHeaders(headers) : new HttpHeaders({});
  }

  /**
   * Get the URL query params
   * @param {Object} params
   * @return {HttpParams} The Angular params object
   */
  public getParams(params: {} | undefined): HttpParams | null {
    return buildQueryString(params);
  }

  /**
   * Checks to see if this request has a body
   * @return {boolean} Does a body exist?
   */
  public hasBody(): boolean {
    return !!this.opts.body;
  }

  /**
   * Get the request body or throw an error
   * @return {T | Error} The request body or an error
   */
  public getBody(): {} {
    if (this.hasBody()) {
      return this.opts.body as {};
    }

    throw new Error(`${this.toString()} has no request body`);
  }
}

/**
 * Creates Request objects via function helper,
 * Abstracts object creation.
 * Request<T>({ host: '', body: <T>{}, ... }) === new Request<T>({ host: '', body: <T>{}, ... })
 */
export const Request: <T>(opts: IRequestOpts<T>) => RequestImpl<T> =
  <T>(opts: IRequestOpts<T>) => new RequestImpl<T>(opts);

  /**
 * Model associated with an HTTP Request
 * @typedef {any} T - The request body type
 */
export interface IAPIServiceOpts<T extends {}> {
  headers?: { [key: string]: string };
  path?: string;
  params?: IParams;
  body?: T;
}

