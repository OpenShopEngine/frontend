import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ConfigService} from '../../projects/client/src/app/config.service';
import {ServerLocalesService} from '../../projects/client/src/app/server-locales.service';
import {CartService} from '../../projects/client/src/app/cart.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ServerLocale} from '../../projects/client/src/app/models/server_locale';
import {SessionsService} from '../../projects/admin/src/app/sessions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  snavLocalizationExpanded = false;

  loadingBarActive = true;
  isAuthorized = false;
  isAdmin = false;

  locales: ServerLocale[] = [];
  config;

  mobileQuery: MediaQueryList;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;

  constructor(public router: Router,
              public cartService: CartService,
              public localesService: ServerLocalesService,
              private configService: ConfigService,
              private sessionsService: SessionsService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    window.addEventListener('loadingBarStart', () => {
      this.loadingBarActive = true;
    });

    window.addEventListener('loadingBarStop', () => {
      this.loadingBarActive = false;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        window.dispatchEvent(new Event('loadingBarStart'));
      }
      if (event instanceof NavigationEnd) {
        window.dispatchEvent(new Event('loadingBarStop'));
      }
    });
    this.configService.get()
      .then(r => {
        this.config = r;
      });

    this.checkAuthorization();
    this.checkIsAdmin();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.localesService.getLocales()
      .then(r => this.locales = r);
  }

  setLocale(id: number) {
    this.localesService.setLocale(id)
      .then(r => location.href = `/${r.locale}/`);
  }

  checkAuthorization() {
    this.sessionsService.isAuthorized()
      .then(v => {
        this.isAuthorized = v;
      });
  }

  checkIsAdmin() {
    this.sessionsService.isAdmin()
      .then(v => {
        this.isAdmin = v;
      });
  }

  logout() {
    this.sessionsService.logout();
    location.reload();
  }
}
