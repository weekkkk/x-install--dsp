export interface DspStatTableWidgetProps {
  userId?: number;
  mode?: "delete" | "view" | "create";
  dateRange?: { start: Date; end: Date };
  panel: Exclude<UserPanel, "install">;
}
