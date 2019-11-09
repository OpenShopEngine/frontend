import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../../cart.service';
import {SessionsService} from '../../../../../admin/src/app/sessions.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() currency: string;

  addedToTheCart = false;
  isAdmin = false;

  constructor(private cartService: CartService, private sessionsService: SessionsService) {}

  ngOnInit(): void {
    if (this.cartService.getCount(this.product) > 0) {
      this.addedToTheCart = true;
    }
    this.sessionsService.isAdmin()
      .then(admin => this.isAdmin = admin);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.addedToTheCart = true;
  }

  amountAvailable() {
    return parseInt(this.product.available, 10);
  }

}
