import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminProductsService} from '../admin-products.service';
import {Product} from '../../../../client/src/app/models/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseProduct} from '../model/BaseProduct';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput;

  id: string;
  product: BaseProduct;

  editForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private productsService: AdminProductsService) {
    this.editForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      available: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'new') {
      this.productsService.getProduct(this.id)
        .then(prod => {
          this.editForm = new FormGroup({
            name: new FormControl(prod.name, Validators.required),
            description: new FormControl(prod.description, Validators.required),
            price: new FormControl(prod.price, Validators.required),
            available: new FormControl(prod.available, Validators.required),
          });
          this.product = prod;
        });
    } else {
      this.product = new BaseProduct();
    }
  }

  save() {
    if (this.editForm.valid) {
      const edited = {
        name: this.editForm.get('name').value,
        description: this.editForm.get('description').value,
        price: this.editForm.get('price').value,
        available: this.editForm.get('available').value,
      };
      if (this.id !== 'new') {
        this.productsService.edit(parseInt(this.id, 10), edited as BaseProduct, this.fileInput.nativeElement.files[0])
          .then(() => {
            this.router.navigate(['/admin/products']);
          });
      } else {
        this.productsService.add(edited as BaseProduct, this.fileInput.nativeElement.files[0])
          .then(() => {
            this.router.navigate(['/admin/products']);
          });
      }
    }
  }

}
