import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { APIService } from '../api-service/api.service';
import { IAPIServiceOpts } from '../../models/request';

@Injectable()
export class ChatService {
  private url = '/assets/Data/ChatMessages.json';

  constructor(
    private apiService: APIService
  ) {}
  /**
   * @method getChatDetails()
   * @description : Used to Fetch the data from ChatMessages.json
   * @return {Observable} : Observable of data
   */
  public getChatDetails(): Observable<{}> {
    const request: IAPIServiceOpts<{}> = {
      path: this.url,
    };

    return this.apiService.get(request).pipe(map((res: HttpResponse<{}>) => res.body));
  }


  /**
   * @method updateUserDetails
   * @description This method used to update user password
   * @param {Object} data - loyalty member Id, user name or email address
   * @returns {Observable}
   */
  public updateUserDetails(data: {}): Observable<{}> {
    const opts: IAPIServiceOpts<{}> = {
      body: {
        login: data['userId'],
        user_password: data['password'],
      },
      path: '',
    };
    return this.apiService.post(opts).pipe(map((res: HttpResponse<{}>) => res.body));
  }
}
