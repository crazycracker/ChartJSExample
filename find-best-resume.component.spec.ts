import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBestResumeComponent } from './find-best-resume.component';

describe('FindBestResumeComponent', () => {
  let component: FindBestResumeComponent;
  let fixture: ComponentFixture<FindBestResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBestResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBestResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
