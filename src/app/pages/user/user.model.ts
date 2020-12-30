import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export class UserModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  roles?: RolesEnum[];
  roleNames?: string[];

  constructor(obj?: any) {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        this[key] = obj[key];
      });
    }
  }

  getRoleNames?(): any[] {
    if (this.roles && this.roles.length > 0) {
      return this.roles.map((role) => {
        return roleNames[RolesEnum[role]];
      });
    }
    return [];
  }
}

export enum RolesEnum {
  Everyone = 0,
  Administrator,
  Editor,
  Dealer,
  WarrantyReviewer,
}

export const roleNames = {
  Administrator: marker('Administrator'),
  Editor: marker('Editor'),
  Dealer: marker('Dealer'),
  WarrantyReviewer: marker('Warranty Reviewer'),
};

export function getAllRoles() {
  let roles = [];

  for (let value in RolesEnum) {
    if (typeof RolesEnum[value] === 'number') {
      roles.push({ label: roleNames[value], value: RolesEnum[value] });
    }
  }

  return roles;
}
