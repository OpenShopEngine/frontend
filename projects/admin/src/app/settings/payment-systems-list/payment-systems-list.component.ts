import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminPaymentSystemsService} from '../../admin-paymentsystems.service';
import {PaymentSystem} from '../../../../../client/src/app/models/payment_system';
import {BasePaymentSystem} from '../../model/BasePaymentSystem';

@Component({
  selector: 'app-payment-systems-list',
  templateUrl: './payment-systems-list.component.html',
  styleUrls: ['./payment-systems-list.component.scss']
})
export class PaymentSystemsListComponent implements OnInit {
  @ViewChild('newPaymentSystemName', {static: false}) newPaymentSystemName;
  @ViewChild('newPaymentSystemProvider', {static: false}) newPaymentSystemProvider;

  @ViewChild('editingPaymentSystemName', {static: false}) editPaymentSystemName;
  @ViewChild('editingPaymentSystemProvider', {static: false}) editPaymentSystemProvider;

  paymentSystems: PaymentSystem[];
  displayedColumns = ['name', 'provider', 'actions'];

  editingPaymentSystem: PaymentSystem;

  constructor(private paymentSystemService: AdminPaymentSystemsService) { }

  ngOnInit() {
    this.paymentSystemService.getSystems()
      .then(paymentSystems => this.paymentSystems = paymentSystems);
  }

  add() {
    const base = new BasePaymentSystem();

    base.name = this.newPaymentSystemName.nativeElement.value;
    base.provider = this.newPaymentSystemProvider.nativeElement.value;

    this.paymentSystemService.add(base)
      .then(conf => {
        this.newPaymentSystemName.nativeElement.value = '';
        this.newPaymentSystemProvider.nativeElement.value = '';
        this.ngOnInit();
      });
  }

  openForEdit(paymentSystem: PaymentSystem) {
    this.editingPaymentSystem = paymentSystem;
  }

  saveEdited() {
    this.editingPaymentSystem.name = this.editPaymentSystemName.nativeElement.value;
    this.editingPaymentSystem.provider = this.editPaymentSystemProvider.nativeElement.value;

    this.paymentSystemService.edit(this.editingPaymentSystem.id, this.editingPaymentSystem)
      .then(conf => {
        this.editingPaymentSystem = undefined;
        this.ngOnInit();
      });
  }

  remove(paymentSystem: PaymentSystem) {
    this.paymentSystemService.delete(paymentSystem.id)
      .then(() => {
        this.ngOnInit();
      });
  }
}
