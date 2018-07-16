/**
 * Utility functions for the http service
 */

import { HttpErrorResponse } from '@angular/common/http';

/**
 * Handle an http error
 * @param {HttpErrorResponse} err - The angular response or error thrown
 * @return {Promise<never>} A wrapped response with the bad request or error
 */
export const handleHttpError: (err: HttpErrorResponse) => Promise<never> = (err: HttpErrorResponse) => {
  if (err.error instanceof Error) {
    // The backend returned an unsuccessful response code
    return Promise.reject(err.error);
  }

  if (typeof(err.error) === 'string') {
    // This is workaround to handle HTTPErrorResponse in IE/Edge
    const errorObj = new HttpErrorResponse({
      error: JSON.parse(err.error),
      headers: err.headers,
      status: err.status,
      statusText: err.statusText,
      url: err.url,
    });
    return Promise.reject(errorObj);
  }
  // A client-side or network error occurred
  return Promise.reject(err);
};
