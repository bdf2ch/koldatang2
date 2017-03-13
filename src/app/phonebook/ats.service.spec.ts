/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtsService } from './ats.service';

describe('AtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtsService]
    });
  });

  it('should ...', inject([AtsService], (service: AtsService) => {
    expect(service).toBeTruthy();
  }));
});
