import { FormControl, AbstractControl } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export const PHONE_REGEXP: RegExp = /^(?: ?:*-*\d+)*$/;

export class CustomValidators {
  static phoneFormat(control: FormControl): ValidationResult {
    if (!control.value || (control.value !== '' && !PHONE_REGEXP.test(control.value))) {
      return { incorrectFormat: true };
    }

    return null;
  }

  static optionalPhoneFormat(control: FormControl): ValidationResult {
    if (!control.value || control.value.length === 0) {
      return null;
    }

    if (!PHONE_REGEXP.test(control.value)) {
      return { incorrectFormat: true };
    }

    return null;
  }

  static whiteSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (
      control.value &&
      control.value.length > 0 &&
      control.value.search(/^\s+$/) > -1 &&
      control.value.search(/^[a-zA-Z0-9]+$/) === -1
    ) {
      return { required: true };
    }

    return null;
  }
}
