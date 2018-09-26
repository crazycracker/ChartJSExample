import { ISearchHistoryFormData } from './../../models/search-history/search-history';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IAppState } from '../../app.state';
import { IAPIServiceOpts } from '../../models/http2/request';
import { Http2Service } from '../../services/http2/http2.service';
import { IUserState } from '../../state/user.state';
import { APIService } from '../api-service/api.service';


@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private url = '/assets/data/searchHistory.json';
  contextId: string;
  userData: Object = [];

  /**
    * @constructor injects the dependent services
    * @description : The constructor initialises the class variables with the dependencies injected into the class
    * @param {apiService} APIService
   */
  constructor(
    private apiService: APIService,
    private httpService: Http2Service,
    private store: Store<IAppState>
  ) {
    this.store.select('user').subscribe((userState: IUserState) => {
      if (userState.user && userState.user[0].contextID) {
        this.contextId = userState.user[0].contextID;
        this.userData = userState.user[0].loginData;
      }
    });
  }

  /**
   * @method getFaqDetails()
   * @description : Used to Fetch the data from searchHistory.json
   * @return {Observable} : Observable of data
   */
  public getLabelDetails(): Observable<{}> {
    const request: IAPIServiceOpts<{}> = {
      path: this.url,
    };

    return this.apiService.get(request).pipe(map((res: HttpResponse<{}>) => res.body));
  }

  public postJobDetails(): Observable<{}> {
    const apiPayload = {
      // TODO will be implemented further once we get required details
      candidateID: this.userData['candidate_id'],
      sessionParam: {
        contextId: this.contextId,
        SenderId: this.userData['candidate_id'],
        SenderName: this.userData['user_name']
      }
    };
    return this.apiService.postMethod(apiPayload, environment.api.search_history);
  }
}
