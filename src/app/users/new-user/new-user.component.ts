import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User = new User();
  submitted: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private users: UsersService) {
  };


  ngOnInit() {};


  onSubmit() {
    this.submitted = true;
    console.log("form submit");
  };



  save() {
    this.users.add(this.user).subscribe((user) => {
      this.router.navigate([user.id], { relativeTo: this.route });
    });
  };


  /**
   * Возврат к списку пользователей
   */
  cancel() {
    this.user.clear();
    this.router.navigate(["../"], {relativeTo: this.route});
  };

}
