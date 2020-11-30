import { TableState } from 'primeng/api/tablestate';
import { sortByOrder } from './sort';
import { TableColumn } from '../interfaces/table';

export const getTableState = (storageKey: string) => {
  const tableState: TableState = JSON.parse(localStorage.getItem(storageKey));
  return tableState;
};

export const getOrderedColumnsFromStorage = (columns: TableColumn[], sortKey: string, storageKey: string) => {
  const tableState = getTableState(storageKey);

  if (!tableState) {
    return columns;
  }

  return sortByOrder(columns, tableState.columnOrder, sortKey);
};
