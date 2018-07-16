import { TestBed, inject } from '@angular/core/testing';

import { FindBestResumeService } from './find-best-resume.service';

describe('FindBestResumeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindBestResumeService]
    });
  });

  it('should be created', inject([FindBestResumeService], (service: FindBestResumeService) => {
    expect(service).toBeTruthy();
  }));
});
