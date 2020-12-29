
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/@core/core/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products;
  @Input('taxonIds') selectedTaxonIds;
  @Input() toggleLayout;

  constructor(
    ) { }

  ngOnInit() { }

  getProductImageUrl(url) {
    return '';
  }

  addToCart(product: Product) {
    const variant_id = product.master.id;
    // this.store.dispatch(this.checkoutActions.addToCart(variant_id));
  }

  getMargin() {
    return this.toggleLayout.size === 'COZY' ? '0 15px 20px 0' : '0 80px 20px 0';
  }

  trackByFn(index, item) {
    return index;
  }

}
