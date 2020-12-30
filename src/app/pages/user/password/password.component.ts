import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SelectItem } from 'primeng/api/selectitem';
import { untilDestroyed } from '@app/@core/until-destroyed';

/** Models */
import { UserModel } from '../user.model';

/** Services */
import { AppService } from '@app/app.service';
import { ToastService } from '@app/@shared/services/toast.service';
import { UserService } from '../user.service';
import { ValidatorService } from '@app/@shared/services/validator.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit, OnDestroy {
  @Input() data: UserModel;
  @Input() readonly = false;
  @Output() submitDialog = new EventEmitter<any>();
  @Output() hideDialog = new EventEmitter<any>();

  display = true;

  // Form
  form: FormGroup;
  roles: SelectItem[] = [];

  constructor(private appService: AppService, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();

    if (!this.data) {
      this.data = new UserModel();
    }

    this.form.patchValue(this.data);
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

    this.userService
      .setPassword(data)
      .pipe(untilDestroyed(this))
      .subscribe(
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
        email: new FormControl({ value: '', disabled: true }, Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        updateOn: 'change',
        validators: [
          ValidatorService.compareValidation('password', 'confirmPassword', 'passwordNotMatching', true, true),
        ],
      }
    );
  }
}
