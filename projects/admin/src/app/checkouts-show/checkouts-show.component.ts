import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Checkout} from '../../../../client/src/app/models/checkout';
import {AdminCheckoutsService} from '../admin-checkouts.service';
import {Product} from '../../../../client/src/app/models/product';
import {AdminProductsService} from '../admin-products.service';
import {AdminTransactionsService} from '../admin-transactions.service';
import {Transaction} from '../model/Transaction';
import {AdminPaymentSystemsService} from '../admin-paymentsystems.service';
import {PaymentSystem} from '../../../../client/src/app/models/payment_system';

@Component({
  selector: 'app-checkouts-show',
  templateUrl: './checkouts-show.component.html',
  styleUrls: ['./checkouts-show.component.scss']
})
export class CheckoutsShowComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput;

  id: string;
  checkout: Checkout;
  transaction: Transaction;
  paymentSystem: PaymentSystem;

  products: Product[];
  total: number;
  productsDisplayedColumns = ['name', 'price', 'open'];

  editForm: FormGroup;

  availableStatuses = [
    'queue',
    'received',
    'packed',
    'sent'
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private checkoutsService: AdminCheckoutsService,
              private paymentSystemsService: AdminPaymentSystemsService,
              private transactionsService: AdminTransactionsService,
              private productsService: AdminProductsService) {
    this.editForm = new FormGroup({
      status: new FormControl(null, Validators.required),
      track_number: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.checkoutsService.get(parseInt(this.id, 10))
      .then(checkout => {
        this.editForm = new FormGroup({
          status: new FormControl(checkout.status, Validators.required),
          track_number: new FormControl(checkout.track_number),
        });
        this.productsService.getProductsByIds(checkout.products.map(id => id.toString(10)))
          .then(products => {
            this.total = products.map(prod => Number(prod.price)).reduce((sum, current) => sum + current, 0);
            this.products = products;
          });
        this.transactionsService.get(checkout.ppu_transaction_id)
          .then(transaction => this.transaction = transaction);
        this.paymentSystemsService.getSystem(checkout.payment_system_id)
          .then(ps => this.paymentSystem = ps);
        this.checkout = checkout;
      });
  }

  save() {
    if (this.editForm.valid) {
      const edited = {
        status: this.editForm.get('status').value,
        track_number: this.editForm.get('track_number').value,
      };
      this.checkoutsService.edit(parseInt(this.id, 10), edited)
        .then(() => {
          this.router.navigate(['/admin/checkouts']);
        });
    }
  }

}
