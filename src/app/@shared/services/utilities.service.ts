declare var require: any;
import { Subscription } from 'rxjs';
const R = require('ramda');
const acceptedImageTypes = ['gif', 'jpeg', 'png', 'jpg'];

export class Utilities {
  static unsubscribe(subscription: Subscription) {
    if (subscription) {
      setTimeout(() => {
        subscription.unsubscribe();
      });
    }
  }

  static isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static emptyGuid() {
    return '00000000-0000-0000-0000-000000000000';
  }

  static sortBy(arr: any[], prop: string) {
    const sortByProp = R.sortBy(R.compose(R.prop(prop)));
    return sortByProp(arr);
  }

  static isImageByName(fileName: string) {
    if (fileName) {
      const extension: string = fileName.split('.').pop();
      const isImage: boolean = acceptedImageTypes.includes(extension?.toLowerCase());
      return isImage;
    }

    return false;
  }

  static extractEnums(enumType: any) {
    const results: any[] = [];
    const keys = Object.keys(enumType).filter((k) => typeof enumType[k as any] === 'number');
    keys.forEach((key) => {
      results.push({ label: key, value: enumType[key] });
    });
    return results;
  }

  /**
   * Process data which is prepared to send to server
   * Translate data
   */
  static processSubmissionTranslationData(data: any, langCodes: any[]): any {
    const props = Object.getOwnPropertyNames(data);
    props.forEach((prop) => {
      const propParts = prop.split('_');
      const language = langCodes.find((t) => t.code === propParts[1]);
      if (propParts.length === 2 && language) {
        // Translation property
        let productTranslation = data.translations.find((translation: any) => translation.language === language.id);
        if (productTranslation) {
          productTranslation[propParts[0]] = data[prop];
        } else {
          productTranslation = {};
          productTranslation[propParts[0]] = data[prop];
          productTranslation.language = language.id;
          data.translations.push(productTranslation);
        }

        delete data[prop];
      }
    });

    return data;
  }

  getFieldValue(data: any, field: string) {
    let value = '';
    if (field.includes('.')) {
      const props = field.split('.');
      value = data;
      for (const prop of props) {
        if (!value) {
          break;
        }
        value = value[prop];
      }
    } else {
      value = data ? data[field] : '';
    }

    return value;
  }
}
