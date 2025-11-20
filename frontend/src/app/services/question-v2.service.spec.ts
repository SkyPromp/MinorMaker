import { TestBed } from '@angular/core/testing';

import { QuestionV2Service } from './question-v2.service';

describe('QuestionV2Service', () => {
  let service: QuestionV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
