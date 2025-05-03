import type { TableColumn } from "@nuxt/ui";
import type { EditableTableColumn, EditableTableMode } from "../types";
import type { EditableTableRow } from "./row";

export interface EditableTableProps<Row extends EditableTableRow> {
  mode?: EditableTableMode;
  rows: Row[];
  totalRow?: Partial<Record<keyof Row | string, string>>;
  columns: EditableTableColumn<Row>[];
  customColumns?: Extract<TableColumn<Row>, { accessorKey: string }>[];
  loading?: boolean;
}
