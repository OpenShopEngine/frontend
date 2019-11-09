import {Component, Injectable, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';
import {CartPosition, Product} from '../../models/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentSystemsService} from '../../paymentsystems.service';
import {HttpClient} from '@angular/common/http';
import {PaymentSystem} from '../../models/payment_system';
import {ConfigService} from '../../config.service';
import {CheckoutService} from '../../checkout.service';
import {Checkout, CheckoutBase} from '../../models/checkout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private http: HttpClient,
              private paymentSystemService: PaymentSystemsService,
              public cartService: CartService,
              private formBuilder: FormBuilder,
              private configService: ConfigService,
              private checkoutService: CheckoutService) {
    this.fetchItems = this.fetchItems.bind(this);
    this.cleanCart = this.cleanCart.bind(this);

    this.configService.get()
      .then(r => {
        this.config = r;
      });
  }

  config;

  cartPositions: CartPosition[] = [];
  paymentSystems: PaymentSystem[] = [];

  accountFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  totalPrice(): string {
    const prices = this.cartPositions.map(v => parseFloat(v.product.price) * v.quantity);
    return (prices || [0, 0]).reduce((a, b) => (a + b), 0).toFixed(2);
  }

  ngOnInit() {
    this.paymentSystemService.getSystems()
      .then(res => this.paymentSystems = res);

    this.fetchItems();

    this.accountFormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)],
      email: ['', Validators.email],
    });
    this.addressFormGroup = this.formBuilder.group({
      street: ['', Validators.required],
      house: ['', Validators.pattern('^[0-9]*$')],
      building: [''],
      apt: ['', Validators.pattern('^[0-9]*$')],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['', Validators.required],
      postcode: ['', Validators.required],
    });
    this.paymentFormGroup = this.formBuilder.group({
      paymentSystem: ['', Validators.required],
    });
  }

  fetchItems() {
    this.cartService.getCart()
      .then(res => {
        this.cartPositions = res;
      });
  }

  cleanCart() {
    this.cartService.setCart([])
      .then(res => this.fetchItems());
  }

  processingCheckout = false;
  isProcessedCheckout = false;
  processedCheckout: Checkout;

  checkout() {
    this.processingCheckout = true;

    const checkoutBase = new CheckoutBase();

    checkoutBase.fullname = `${this.accountFormGroup.get('firstname').value} ${this.accountFormGroup.get('lastname').value}`;
    checkoutBase.email = this.accountFormGroup.get('email').value;
    checkoutBase.phone = this.accountFormGroup.get('phone').value;
    checkoutBase.address = `${this.addressFormGroup.get('street').value}, ${this.addressFormGroup.get('house').value}, ` +
      `${this.addressFormGroup.get('building').value}, ${this.addressFormGroup.get('apt').value}, ` +
      `${this.addressFormGroup.get('city').value}, ${this.addressFormGroup.get('province').value}, ` +
      `${this.addressFormGroup.get('country').value}, ${this.addressFormGroup.get('postcode').value}`;

    checkoutBase.products = [];

    this.cartPositions.forEach(position => {
      for (let i = 0; i < position.quantity; i++) {
        checkoutBase.products.push(position.product.id);
      }
    });

    this.cleanCart();

    this.paymentSystemService.getSystem(parseInt(this.paymentFormGroup.get('paymentSystem').value, 10))
      .then(r => {
        this.checkoutService.checkout(r, checkoutBase)
          .then(r => {
            if (r.redirect_url === null) {
              this.processedCheckout = r.checkout;
              this.isProcessedCheckout = true;
              this.processingCheckout = false;
            } else {
              location.href = r.redirect_url;
            }
          });
      });
  }
}
