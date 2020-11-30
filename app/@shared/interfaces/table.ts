export interface TableColumn {
  field: string;
  header: string;
  isBoolean?: boolean;
  colSpan?: number;
  isHidden?: boolean;
}

export interface TableState {
  first: number;
  rows: number;
  columnOrder: string[];
}

export enum SortOrder {
  Asc = 1,
  Desc = -1,
}
