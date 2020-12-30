import { LanguageEnum } from '../enums/language.enum';

export class LanguageModel {
  id: LanguageEnum = LanguageEnum.Vn;
  code = '';
  name = '';
  translationCode = '';

  constructor(id?: LanguageEnum, code?: string, name?: string, translationCode?: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.translationCode = translationCode;
  }
}
