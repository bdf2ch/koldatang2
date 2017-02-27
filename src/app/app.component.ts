import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { DivisionsService } from './divisions/divisions.service';
import { ModalService } from './ui/modal/modal.service';
import { TreeService } from './ui/tree/tree.service';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title: string;
  controls: string;
  breadcrumb: ActivatedRoute[] = [];


  constructor (private $router: Router,
               private $route: ActivatedRoute,
               private $modals: ModalService,
               private $trees: TreeService,
               private $divisions: DivisionsService) {};


  ngOnInit (): void {
    this.$router.events
      .filter(event => event instanceof NavigationEnd)
      .map(event => {
        let temp = [];
        let currentRoute = this.$route.root;

        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
          if (currentRoute.snapshot.data["extras"]["title"] !== undefined && currentRoute.snapshot.data["extras"]["title"] !== "") {
            this.controls = currentRoute.snapshot.url[0].toString();
            console.log("controls", this.controls);
            temp.push(currentRoute);
          }
        }

        return temp;
      })
      .subscribe((temp) => {
        this.breadcrumb = temp;
        let content = document.getElementById("app-content-content");
        content.scrollTop = 0;
        console.log("breadcrumb", this.breadcrumb);
      });
  };


  openAddDivisionModal () {
    this.$modals.open('add-division');
  };


  openEditDivisionModal() {
    this.$modals.open("edit-division");
  };
}
