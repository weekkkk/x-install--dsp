import type { EditableTableColumn, EditableTableMode } from "../types";
import type { EditableTableRow } from "./row";

export interface EditableTableProps<Row extends EditableTableRow<keyof Row>> {
  mode?: EditableTableMode;
  rows: Row[];
  columns: EditableTableColumn<Row>[];
}
