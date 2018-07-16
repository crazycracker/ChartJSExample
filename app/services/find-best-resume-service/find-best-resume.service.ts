import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { APIService } from '../api-service/api.service';
import { IAPIServiceOpts } from '../../models/request';


@Injectable({
  providedIn: 'root'
})
export class FindBestResumeService {
  private url = '/assets/Data/findBestResume.json';
  constructor(private apiService: APIService) { }
  public getLabelDetails(): Observable<{}> {
    const request: IAPIServiceOpts<{}> = {
      path: this.url,
    };

    return this.apiService.get(request).pipe(map((res: HttpResponse<{}>) => res.body));
  }
}
