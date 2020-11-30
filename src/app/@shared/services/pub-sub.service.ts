import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/* Publish-Subscribe Pattern */
@Injectable({
  providedIn: 'root',
})
export class PubSubService {
  private pubSubSubject: Subject<any> = new Subject();
  private emitter: Observable<any>;

  constructor() {
    this.emitter = this.pubSubSubject.asObservable();
  }

  publish(channel: string, event: any): void {
    this.pubSubSubject.next({
      channel,
      event,
    });
  }

  subscribe(channel: string, handler: (value: any) => void): Subscription {
    return this.emitter
      .pipe(
        filter((emission) => emission.channel === channel),
        map((emission) => emission.event)
      )
      .subscribe(handler);
  }
}
