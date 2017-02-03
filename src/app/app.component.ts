import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { $users } from './kolenergo/$users.service';
import { User } from './models/User.model';
import { usersMock } from './kolenergo/users-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./application.css']
})
export class AppComponent implements OnInit{
  title = 'koldata... works!';
  users: User[];

  constructor (private usersService: $users) {

  };

  ngOnInit (): void {
    //this.title = "test";
    console.log("ngOnInit hook");
    console.info("users = ", this.usersService.getAll());

    this.usersService.init(usersMock);
    this.users = this.usersService.getAll();
    console.log(this.users);
  };
}
