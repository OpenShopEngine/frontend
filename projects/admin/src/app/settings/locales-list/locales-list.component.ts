import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseServerLocale} from '../../model/BaseServerLocale';
import {ServerLocale} from '../../../../../client/src/app/models/server_locale';
import {AdminServerLocalesService} from '../../admin-server-locales.service';

@Component({
  selector: 'app-locales-list',
  templateUrl: './locales-list.component.html',
  styleUrls: ['./locales-list.component.scss']
})
export class LocalesListComponent implements OnInit {
  @ViewChild('newLocaleTitle', {static: false}) newLocaleTitle;
  @ViewChild('newLocaleLocale', {static: false}) newLocaleLocale;

  @ViewChild('editingLocaleTitle', {static: false}) editLocaleTitle;
  @ViewChild('editingLocaleLocale', {static: false}) editLocaleLocale;

  locales: ServerLocale[];
  displayedColumns = ['title', 'locale', 'actions'];

  editingLocale: ServerLocale;

  constructor(private localesService: AdminServerLocalesService) { }

  ngOnInit() {
    this.localesService.getLocales()
      .then(locales => this.locales = locales);
  }

  add() {
    const base = new BaseServerLocale();

    base.title = this.newLocaleTitle.nativeElement.value;
    base.locale = this.newLocaleLocale.nativeElement.value;

    this.localesService.add(base)
      .then(conf => {
        this.newLocaleTitle.nativeElement.value = '';
        this.newLocaleLocale.nativeElement.value = '';
        this.ngOnInit();
      });
  }

  openForEdit(locale: ServerLocale) {
    this.editingLocale = locale;
  }

  saveEdited() {
    this.editingLocale.title = this.editLocaleTitle.nativeElement.value;
    this.editingLocale.locale = this.editLocaleLocale.nativeElement.value;

    this.localesService.edit(this.editingLocale.id, this.editingLocale)
      .then(conf => {
        this.editingLocale = undefined;
        this.ngOnInit();
      });
  }

  remove(locale: ServerLocale) {
    this.localesService.delete(locale.id)
      .then(() => {
        this.ngOnInit();
      });
  }
}
