export type TUiTableProps<
  T extends {
    [key: string]: any;
  }
> = {
  columns: { key: keyof T; label?: string }[];
  rows: T[];
  editableCols?: (keyof T)[];
  customizeCols?: (keyof T)[];
  readonly?: boolean;
  radio?: boolean;
  by: keyof T;
};
