import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Subscription } from 'rxjs';
// import { HttpService } from '../../../core/services/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  loading: any;
  notiSubs: Subscription;

  constructor(
    ) {
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.notiSubs.unsubscribe();
  }

}
