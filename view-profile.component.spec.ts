import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';

import {APIService} from '../../../services/api-service/api.service';
import {Http2Service} from '../../../services/http2/http2.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {userReducer} from '../../../reducers/user.reducer';
import {ViewProfileComponent} from './view-profile.component';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpModule,
        StoreModule.forRoot(userReducer),
      ],
      providers: [
        APIService,
        Http2Service,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
