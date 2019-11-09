import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../../checkout.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.scss']
})
export class StatusCheckComponent implements OnInit {

  fetchError = false;
  checkout = null;
  checkoutFormGroup: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setupCheckoutForm();
  }
  setupCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  fetchCheckout() {
    this.fetchError = false;
    this.checkout = null;
    this.checkoutService.get(this.checkoutFormGroup.get('id').value)
      .then(checkout => this.checkout = checkout)
      .catch(() => {
        this.fetchError = true;
      });
  }

}
