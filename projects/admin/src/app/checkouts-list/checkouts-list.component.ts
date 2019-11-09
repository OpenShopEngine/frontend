import { Component, OnInit } from '@angular/core';
import {Checkout} from '../../../../client/src/app/models/checkout';
import {AdminCheckoutsService} from '../admin-checkouts.service';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})
export class CheckoutsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'address', 'status', 'actions'];
  dataSource: Checkout[] = [];

  constructor(private checkoutsService: AdminCheckoutsService) { }

  ngOnInit() {
    this.checkoutsService.all()
      .then(checkouts => this.dataSource = checkouts);
  }
}
