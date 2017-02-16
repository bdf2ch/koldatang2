import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './models/User.model';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title: string;
  users: User[];

  constructor (private router: Router, private route: ActivatedRoute) {};

  ngOnInit (): void {
    //this.title = "test";
    //console.log("ngOnInit hook");
    //console.info("users = ", this.usersService.getAll());

    //this.usersService.init(usersMock);
    //this.users = this.usersService.getAll();
    //console.log(this.users);
    let url = this.route.root.url[0];
    console.log("url", url);
    console.log(this.route);
    this.route.data.subscribe((data: {title: string}) => {
      console.info("title", data.title);
      this.title = data.title;
    });


    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      //.filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((data) => this.title = data['title']);


    /*
    this.route.data
      .subscribe((data: any) => {
      console.log("data", data);
        if (data.title !== null) {
          this.title = data.title;
          console.log("current route title = ", data.title);
        }
      });
      */
  };
}
