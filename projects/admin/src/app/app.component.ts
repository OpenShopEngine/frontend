import {Component, OnInit} from '@angular/core';
import {SessionsService} from './sessions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private sessionsService: SessionsService) {}

  ngOnInit(): void {
    this.checkAuthorization();
  }

  checkAuthorization() {
    this.sessionsService.isAuthorized()
      .then(v => {
        if (!v) {
          this.router.navigateByUrl('/admin/login');
        } else {
          this.router.navigateByUrl('/admin/products');
        }
      });
  }

}
