import {Component, Input, OnInit} from '@angular/core';
import {CartPosition, Product} from '../../../models/product';
import {CartService} from '../../../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() position: CartPosition;
  @Input() callback: any;
  @Input() currency: string;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  removeFromCart() {
    this.cartService.removeProductFromCart(this.position.product)
      .then(this.callback);
  }

  updateQuantity(e) {
    if(/^\d+$/.test(e.target.value)) {
      const quantity = parseInt(e.target.value, 10);
      if(quantity < 0 || quantity === 0) {
        this.removeFromCart();
      } else {
        this.cartService.setQuantity(this.position.product, quantity)
          .then(this.callback);
      }
    }
  }

  amountAvailable() {
    return parseInt(this.position.product.available);
  }

}
