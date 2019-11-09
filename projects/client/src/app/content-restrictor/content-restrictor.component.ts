import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-content-restrictor',
  templateUrl: './content-restrictor.component.html',
  styleUrls: ['./content-restrictor.component.scss']
})
export class ContentRestrictorComponent implements OnInit {

  @Input() property: string;
  @Input() disclaimer: string;
  @Input() disclaimerFalse: string;
  isShowed = false;
  constructor(private configService: ConfigService) {
    this.configService.get()
      .then(config => this.isShowed = (config[this.property] === 'true'));
  }

  ngOnInit() {
  }

}
