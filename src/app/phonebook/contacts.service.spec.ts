/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbonentsService } from './abonents.service';

describe('AbonentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonentsService]
    });
  });

  it('should ...', inject([AbonentsService], (service: AbonentsService) => {
    expect(service).toBeTruthy();
  }));
});
