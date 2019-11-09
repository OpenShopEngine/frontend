import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkout-status-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
