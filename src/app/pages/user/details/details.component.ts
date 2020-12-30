import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SelectItem } from 'primeng/api/selectitem';
import { untilDestroyed } from '@app/@core/until-destroyed';

/** Models */
import { UserModel, getAllRoles } from '../user.model';

/** Services */
// import { I18nService } from '@app/i18n';
import { AppService } from '@app/app.service';
import { ToastService } from '@app/@shared/services/toast.service';
import { UserService } from '../user.service';
import { ValidatorService } from '@app/@shared/services/validator.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  @Input() data: UserModel;
  @Input() readonly = false;
  @Output() submitDialog = new EventEmitter<any>();
  @Output() hideDialog = new EventEmitter<any>();

  display = true;
  langCodes: SelectItem[];
  panelShown = false;

  // Form
  form!: FormGroup;
  roles: SelectItem[] = [];

  constructor(private appService: AppService, private userService: UserService) {
    // this.langCodes = this.i18nService.parseToArray().map((lang) => {
    //   return { label: lang.name, value: lang.id };
    // });
  }

  ngOnInit(): void {
    this.initForm();

    if (!this.data) {
      this.data = new UserModel();
    }

    this.getReferenceData();
    this.form.patchValue(this.data);

    if (this.data.roles) {
      this.form.controls.selectedRoles.setValue(this.data.roles);
    }
  }

  ngOnDestroy() {
    // Work against memory leak if component is destroyed
    this.submitDialog.unsubscribe();
    this.hideDialog.unsubscribe();
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.appService.isLoading = true;
    const data = this.form.value;
    data.roles = data.selectedRoles;
    if (data.id === 0) {
      delete data.id;
      delete data.confirmPassword;
    } else {
      delete data.password;
    }

    let submitSubscription;
    if (data.id && data.id.length > 0) {
      submitSubscription = this.userService.update(data);
    } else {
      submitSubscription = this.userService.create(data);
    }

    submitSubscription.pipe(untilDestroyed(this)).subscribe(
      () => {
        this.appService.isLoading = false;
        ToastService.showSuccessMessage(marker('Saved successfully'));
        this.submitDialog.emit();
      },
      () => {
        this.appService.isLoading = false;
        ToastService.showErrorMessage(marker('Save failed'));
      }
    );
  }

  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl(0),
        firstName: new FormControl({ value: '', disabled: this.readonly }, Validators.required),
        lastName: new FormControl({ value: '', disabled: this.readonly }),
        email: new FormControl({ value: '', disabled: this.readonly }, Validators.required),
        selectedRoles: new FormControl({ value: [], disabled: this.readonly }, Validators.required),
      },
      {
        updateOn: 'change',
      }
    );

    if (!(this.data && this.data.id && this.data.id.length > 0)) {
      this.form.addControl('password', new FormControl('', Validators.required));
      this.form.addControl('confirmPassword', new FormControl('', Validators.required));
      this.form.setValidators([
        ValidatorService.compareValidation('password', 'confirmPassword', 'passwordNotMatching', true, true),
      ]);
    }
  }

  private getReferenceData() {
    this.roles = getAllRoles();
  }
}
