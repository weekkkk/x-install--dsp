import type { TableColumn } from "@nuxt/ui";
import type { EditableTableRow } from "../interfaces";
import type { EditableTableColumnDataType } from "./column-data-type";

export type EditableTableColumn<Row extends EditableTableRow<keyof Row>> = Extract<TableColumn<Row> & {
  editable?: boolean;
  type: EditableTableColumnDataType;
}, { accessorKey: string }>;
