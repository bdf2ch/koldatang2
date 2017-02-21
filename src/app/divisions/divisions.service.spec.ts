/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { $divisions } from './$divisions.service';

describe('$divisionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [$divisions]
    });
  });

  it('should ...', inject([$divisions], (service: $divisions) => {
    expect(service).toBeTruthy();
  }));
});
