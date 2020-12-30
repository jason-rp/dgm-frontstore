import { Subject } from 'rxjs';
import { Confirmation } from 'primeng/api';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from './confirm-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private translateService: TranslateService) {}

  openDeleteConfirmation(config?: Confirmation) {
    if (!config) {
      config = {};
    }

    config.header = this.translateService.instant('Delete Confirmation');
    config.message = this.translateService.instant('Are you sure you want to delete this item?');
    config.acceptLabel = this.translateService.instant('Delete');
    config.rejectLabel = this.translateService.instant('Cancel');

    // Call confirm dialog service to open confirmation
    ConfirmDialogService.openConfirm(config);
  }
}
