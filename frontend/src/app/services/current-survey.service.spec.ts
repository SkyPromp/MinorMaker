import { TestBed } from '@angular/core/testing';

import { CurrentSurveyService } from './current-survey.service';

describe('CurrentSurveyService', () => {
  let service: CurrentSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
