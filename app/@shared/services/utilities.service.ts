export class Utilities {
  static isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  static trimString(target: string) {
    return target ? target.trim() : '';
  }
}
