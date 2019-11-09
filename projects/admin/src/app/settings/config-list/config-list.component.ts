import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminConfigService} from '../../admin-config.service';
import {BaseConfig, Config} from '../../model/Config';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {
  @ViewChild('newConfigProperty', {static: false}) newConfigProperty;
  @ViewChild('newConfigValue', {static: false}) newConfigValue;

  @ViewChild('editingConfigProperty', {static: false}) editConfigProperty;
  @ViewChild('editingConfigValue', {static: false}) editConfigValue;

  configs: Config[];
  displayedColumns = ['property', 'value', 'actions'];

  editingConfig: Config;

  constructor(private configService: AdminConfigService) { }

  ngOnInit() {
    this.configService.get()
      .then(configs => this.configs = configs);
  }

  add() {
    const base = new BaseConfig();

    base.property = this.newConfigProperty.nativeElement.value;
    base.value = this.newConfigValue.nativeElement.value;

    this.configService.add(base)
      .then(conf => {
        this.ngOnInit();
      });
  }

  openForEdit(config: Config) {
    this.editingConfig = config;
  }

  saveEdited() {
    this.editingConfig.property = this.editConfigProperty.nativeElement.value;
    this.editingConfig.value = this.editConfigValue.nativeElement.value;

    this.configService.edit(this.editingConfig.id, this.editingConfig)
      .then(conf => {
        this.editingConfig = undefined;
        this.ngOnInit();
      });
  }

  remove(config: Config) {
    this.configService.delete(config.id)
      .then(() => {
        this.ngOnInit();
      });
  }

}
