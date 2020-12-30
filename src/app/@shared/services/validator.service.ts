import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export const URL_REGEXP: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\)\*\+,;=.]+$/;
export const EMAIL_REGEXP: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const PASSWORD_REGEXP: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~#^()\-_=\[\]{};:'"<>.|\\\/@$!%+*?&])[A-Za-z\d`~#^()\-_=\[\]{};:'"<>.|\\\/@$!%+*?&]{8,}$/;
export class ValidatorService {
  static mailFormat(control: FormControl): ValidationResult {
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { incorrectMailFormat: true };
    }

    return null;
  }

  static passwordFormat(control: FormControl): ValidationResult {
    if (control.value !== '' && (control.value.length <= 5 || !PASSWORD_REGEXP.test(control.value))) {
      return { incorrectPasswordFormat: true };
    }

    return null;
  }

  static url(control: FormControl) {
    if (control.value !== '' && (control.value.length <= 5 || !URL_REGEXP.test(control.value))) {
      return { incorrectUrlFormat: true };
    }

    return null;
  }

  static compareValidation(
    field: string,
    confirmationField: string,
    messageKey: string,
    isMatching = true,
    caseSensitive = false
  ): ValidatorFn {
    return (group: FormGroup): ValidationResult => {
      if (group.controls) {
        const valueA = group.controls[field],
          valueB = group.controls[confirmationField];

        if (valueA && valueB && valueA.valid && valueB.valid) {
          if (caseSensitive) {
            if (isMatching) {
              return valueA.value.trim() !== valueB.value.trim() ? { [messageKey]: true } : null;
            }
            return valueA.value.trim() === valueB.value.trim() ? { [messageKey]: true } : null;
          }
          if (isMatching) {
            return valueA.value.trim().toLowerCase() !== valueB.value.trim().toLowerCase()
              ? { [messageKey]: true }
              : null;
          }
          return valueA.value.trim().toLowerCase() === valueB.value.trim().toLowerCase()
            ? { [messageKey]: true }
            : null;
        }
      }
      return null;
    };
  }

  static excludes(values: any[] = [], isCaseSensitive = false): ValidatorFn {
    return (control: FormGroup): ValidationResult => {
      if (values && values.length === 0) {
        return null;
      }

      let val: string = control.value;

      if (isCaseSensitive) {
        return values.some((opt) => opt.trim() === val.trim()) ? { invalidValue: true } : null;
      }

      return values.some((opt) => opt.trim().toLowerCase() === val.trim().toLowerCase())
        ? { invalidValue: true }
        : null;
    };
  }
}
