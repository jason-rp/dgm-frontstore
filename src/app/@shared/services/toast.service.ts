import { Subject } from 'rxjs';
import { ToastEnum } from '@app/@shared/enums/toast.enum';

export class ToastService {
  static message = new Subject<any>();
  static MessageObserver = ToastService.message.asObservable();

  static clearMessages() {
    this.message.next({ id: ToastEnum.CLEAR });
  }

  static showSuccessMessage(translationCode: string = '', message: string = '', timeout: number = 3500) {
    this.message.next({ id: ToastEnum.SUCCESS, i18n: translationCode, message, timeout });
  }

  static showErrorMessage(messageCode: string = '', message: string = '', timeout: number = 3500) {
    this.message.next({ id: ToastEnum.ERROR, i18n: messageCode, message, timeout });
  }

  static showWarningMessage(messageCode: string = '', message: string = '', options: any = {}, timeout: number = 3500) {
    this.message.next({
      id: ToastEnum.WARNING,
      i18n: messageCode,
      message,
      options,
      timeout,
    });
  }

  static showInfoMessage(messageCode: string = '', message: string = '', options: any = {}, timeout: number = 3500) {
    this.message.next({
      id: ToastEnum.INFO,
      i18n: messageCode,
      message,
      options,
      timeout,
    });
  }
}
