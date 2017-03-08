import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { DivisionsService } from '../../divisions/divisions.service';


@Injectable()
export class UserListResolveGuard implements Resolve<void> {


  constructor(private $divisions: DivisionsService) {};


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    if (this.$divisions.getAll().length === 0)
      this.$divisions.fetchAll().subscribe();
  };
};

