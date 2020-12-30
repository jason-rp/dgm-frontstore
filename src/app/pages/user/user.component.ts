import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { MenuItem } from 'primeng/api/menuitem';
import { untilDestroyed } from '@app/@core/until-destroyed';
import { finalize } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

/** Models */
import { LanguageModel } from '@app/@shared/models/language.model';
import { UserModel } from './user.model';
import { TableColumn } from '@app/@shared/interfaces/table';

/** Services */
// import { I18nService } from '@app/i18n';
import { DialogService } from '@app/@shared/services/dialog.service';
import { AppService } from '@app/app.service';
import { ToastService } from '@app/@shared/services/toast.service';
import { Utilities } from '@app/@shared/services/utilities.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('table') table: Table;

  tableCols: TableColumn[] = [
    { field: 'firstName', header: this.translateService.instant('First Name') },
    { field: 'lastName', header: this.translateService.instant('Last Name') },
    { field: 'email', header: this.translateService.instant('Email') },
    { field: 'roleNames', header: this.translateService.instant('Roles') },
  ];
  actions: MenuItem[] = [];
  utilities = new Utilities();

  data: UserModel[] = [];
  selectedData: UserModel;
  languages: LanguageModel[] = [];
  showDetails = false;
  showSetPasswordForm = false;
  readonly = false;
  globalSearch = true;

  constructor(
    // private i18nService: I18nService,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private appService: AppService,
    private userService: UserService
  ) {
    // this.languages = this.i18nService.parseToArray();
  }

  get globalSearchFields() {
    return this.tableCols.map((t) => t.field);
  }

  ngOnInit(): void {
    this.getData();
    this.getActions();
  }

  ngOnDestroy(): void {}

  changeModeSearch(event: any) {
    if (event.checked) {
      this.globalSearchFields.forEach((prop) => {
        this.table.filter('', prop, 'contains');
      });
    } else {
      this.table.filterGlobal('', 'contains');
    }
  }

  changeFilterType() {
    this.getData();
  }

  rowSelect() {
    this.readonly = true;
    this.showDetails = true;
  }

  onActionMenuToggle(rowData: UserModel) {
    this.selectedData = rowData;

    if (this.selectedData && false) {
      this.actions.splice(0, 1);
      this.actions.splice(0, 1);
    }
  }

  create() {
    this.readonly = false;
    this.selectedData = new UserModel();
    this.showDetails = true;
  }

  edit(rowData: UserModel) {
    this.readonly = false;
    this.selectedData = rowData;
    this.showDetails = true;
  }

  delete(rowData: UserModel) {
    this.dialogService.openDeleteConfirmation({
      accept: () => {
        this.appService.isLoading = true;
        this.userService.delete(rowData.id).subscribe(
          () => {
            this.getData();
            ToastService.showSuccessMessage(marker('Deleted successfully'));
          },
          () => {
            this.appService.isLoading = false;
            ToastService.showErrorMessage(marker('Delete failed'));
          }
        );
      },
    });
  }

  changePassword(rowData: UserModel) {
    this.readonly = false;
    this.selectedData = rowData;
    this.showSetPasswordForm = true;
  }

  onSubmitForm() {
    this.showDetails = false;
    this.showSetPasswordForm = false;

    // Get list users
    this.getData();
  }

  onHideForm() {
    this.selectedData = null;
    this.showDetails = false;
    this.showSetPasswordForm = false;
  }

  getData() {
    this.appService.isLoading = true;

    this.userService
      .gets()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.appService.isLoading = false))
      )
      .subscribe((res) => {
        if (res && res.data) {
          this.data = res.data.list.map((data: any) => {
            const model = new UserModel(data);
            model.roleNames = model.getRoleNames();
            return model;
          });
        }
      });
  }

  private getActions() {
    this.actions = [
      {
        id: 'edit',
        label: this.translateService.instant('Edit'),
        icon: 'fas fa-edit',
        command: () => this.edit(this.selectedData),
      },
      {
        id: 'password',
        label: this.translateService.instant('Set password'),
        icon: 'fas fa-key',
        command: () => this.changePassword(this.selectedData),
      },
      {
        id: 'delete',
        label: this.translateService.instant('Delete'),
        icon: 'fas fa-trash-alt',
        command: () => this.delete(this.selectedData),
      },
    ];

    return this.actions;
  }
}
