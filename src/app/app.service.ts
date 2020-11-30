import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

interface ViewportSize {
  width: number;
  height: number;
}

@Injectable({ providedIn: 'root' })
export class AppService {
  loading: boolean;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private viewportSizeSubject = new BehaviorSubject<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  constructor() {
    this.loadingSubject
      .asObservable()
      .pipe(delay(0))
      .subscribe((val) => (this.loading = val));
  }

  set isLoading(v: boolean) {
    this.loadingSubject.next(v);
  }

  getViewportSize(): Observable<ViewportSize> {
    return this.viewportSizeSubject.asObservable();
  }

  set viewportSize(size: ViewportSize) {
    this.viewportSizeSubject.next(size);
  }
}
