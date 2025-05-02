import type { EditableTableColumnData } from "../types";
import type { EditableTableRow } from "./row";

export interface EditableTableEmits<Row extends EditableTableRow> {
  change: [id: number, key: keyof Row, value?: EditableTableColumnData];
}
