import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitableJobsSearchComponent } from './suitable-jobs-search.component';

describe('SuitableJobsSearchComponent', () => {
  let component: SuitableJobsSearchComponent;
  let fixture: ComponentFixture<SuitableJobsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuitableJobsSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitableJobsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
