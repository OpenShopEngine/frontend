import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SessionsService} from '../sessions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error = null;

  constructor(private router: Router, private sessionsService: SessionsService) { }

  ngOnInit() {
    this.sessionsService.isAuthorized()
      .then(v => {
        if (v) {
          this.router.navigateByUrl('/admin');
        }
      });
  }

  login() {
    if (this.username.valid && this.password.valid) {
      this.sessionsService.login(this.username.value, this.password.value)
        .then(data => {
          location.reload();
        })
        .catch(fail => {
          console.log('Something went wrong!', fail);
          this.error = fail;
        });
    }
  }
}
