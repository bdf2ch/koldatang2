import { Component, Input,  OnInit } from '@angular/core';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input()
  user: User = new User();
  submitted: boolean = false;

  constructor() {};

  ngOnInit() {};

  onSubmit(): void {
    this.submitted = true;
    console.log("form submit");
  };

  onCancel(): void {
    this.user = new User();
    this.submitted = false;
  };
}
