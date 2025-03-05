export type TUiTableProps<
  T extends {
    [key: string]: any;
  }
> = {
  columns: { key: keyof T | string; label?: string }[];
  rows: T[];
  editableCols?: (keyof T)[];
  customizeCols?: (keyof T | string)[];
  readonly?: boolean;
  isRadio?: boolean;
  isCheckbox?: boolean;
  by: keyof T;
  loading?: boolean;
};
