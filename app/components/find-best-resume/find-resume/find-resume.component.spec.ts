import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FindResumeComponent } from './find-resume.component';
describe('FindResumeComponent', () => {
  let component: FindResumeComponent;
  let fixture: ComponentFixture<FindResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindResumeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
