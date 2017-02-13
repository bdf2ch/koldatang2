import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUser: User = new User();
  submitted: boolean = false;

  constructor() {};

  ngOnInit() {};

  onSubmit() {
    this.submitted = true;
    console.log("form submit");
  };

}
