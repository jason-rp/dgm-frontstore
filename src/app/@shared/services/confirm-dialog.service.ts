import { Subject } from 'rxjs';
import { Confirmation } from 'primeng/api';

export class ConfirmDialogService {
  private static content = new Subject<Confirmation>();
  static contentObserver = ConfirmDialogService.content.asObservable();

  static openConfirm(config: Confirmation) {
    this.content.next(config);
  }
}
