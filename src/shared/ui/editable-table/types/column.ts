import type { TableColumn } from "@nuxt/ui";
import type { EditableTableRow } from "../interfaces";
import type { EditableTableColumnDataType } from "./column-data-type";

export type EditableTableColumn<Row extends EditableTableRow> = Omit<TableColumn<Row>, "accessorKey" | "header"> & {
  accessorKey: Extract<keyof Row, string>;
  header?: string;
} & {
  editable?: boolean;
  type?: EditableTableColumnDataType;
};
