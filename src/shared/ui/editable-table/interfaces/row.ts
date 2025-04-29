import type { EditableTableColumnData } from "../types";

export type EditableTableRow<Key extends string | number | symbol> = {
  id: number;
} & Partial<Record<Exclude<Key, "id">, EditableTableColumnData>>;
