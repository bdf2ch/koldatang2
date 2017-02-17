import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from "@angular/router";
import { Component, OnInit } from '@angular/core';
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
  breadcrumb: ActivatedRoute[] = [];

  constructor (private router: Router, private route: ActivatedRoute) {};

  ngOnInit (): void {
    //this.title = "test";
    //console.log("ngOnInit hook");
    //console.info("users = ", this.usersService.getAll());

    //this.usersService.init(usersMock);
    //this.users = this.usersService.getAll();
    //console.log(this.users);
    //let url = this.route.root.url[0];
    //console.log("url", url);
    //console.log(this.route);
    //this.route.data.subscribe((data: {title: string}) => {
    //  console.info("title", data.title);
    //  this.title = data.title;
    //});


    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(event => {


        let temp = [];
        let currentRoute = this.route.root;


        console.log("root", this.route.root);

        /*
        while (currentRoute.firstChild) {
          temp.push(currentRoute);
          currentRoute = currentRoute.firstChild;
        }
        */







        //temp.push(currentRoute);

        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
          temp.push(currentRoute);
        }




        //return this.route.pathFromRoot;
        return temp;
        //return route;

        //while (route.firstChild) route = route.firstChild;
        //return route;
      })
      //.filter(route => route.outlet === 'primary')
      //.mergeMap(route => route.data)
      .subscribe((temp) => {this.breadcrumb = temp; console.log("breadcrumb", this.breadcrumb);});


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
