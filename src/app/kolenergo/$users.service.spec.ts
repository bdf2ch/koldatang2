/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { $usersService } from '../users/$users.service';

describe('$usersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [$usersService]
    });
  });

  it('should ...', inject([$usersService], (service: $usersService) => {
    expect(service).toBeTruthy();
  }));
});
