import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineItem } from '@app/@core/core/models/line_item';
import { Order } from '@app/@core/core/models/order';
// import { UserService } from '@app/pages/user/services/user.service';

import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  routeSubscription$: Subscription;
  orderSubscription$: Subscription;
  orderNumber: String;
  order: Order;

  constructor(
    // private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.routeSubscription$ = this.route.params.subscribe(
      (params: any) => {
        this.orderNumber = params['number'];
        // this.orderSubscription$ =
        //   this.userService
        //   .getOrderDetail(this.orderNumber)
        //   .subscribe(order => this.order = order);
     }
    );
  }

  getProductImageUrl(line_item: LineItem) {
    const image_url = line_item.variant.images[0].small_url;
    // return environment.API_ENDPOINT + image_url;
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
    this.orderSubscription$.unsubscribe();
  }

}
