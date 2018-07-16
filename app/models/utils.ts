/**
 * Utility functions associated with HTTP request/responses
 */

import { HttpParams } from '@angular/common/http';

import { IParams, Scheme } from './http2';

/**
 * Build a query string given an object IParams
 * @param {?IParams} params - A potential object containing query params
 * @return {string} The built query param string
 */
export const buildQueryString: (params: IParams | undefined) => HttpParams | null = (params: IParams | undefined) => {
  if (!params) {
    return null;
  }

  let httpParams = new HttpParams();

  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      httpParams = httpParams.append(param, params[param]);
    }
  }

  return httpParams;
};

/**
 * Build a url string
 * @param {Scheme} scheme - The http scheme (http, https)
 * @param {String} host - The request host
 * @param {Number} [port] - An optional request port
 * @param {String} [path] - An optional request path
 * @return {String} The compiled url string
 */
export const buildUrlString: (scheme: Scheme, host: string, port?: number, path?: string) => string =
  (scheme: Scheme, host: string, port?: number, path?: string) => {

    if (!host || host === '') {
      return path.startsWith('/') ? path : `/${path}`;
    }

    const formattedHost = host.endsWith('/') ? host.slice(0, -1) : host;
    let url = `${scheme}://${formattedHost}`;

    if (port) {
      url += `:${port}`;
    }

    if (path) {
      url += path.startsWith('/') ? path : `/${path}`;
    }

    return url;
  };
