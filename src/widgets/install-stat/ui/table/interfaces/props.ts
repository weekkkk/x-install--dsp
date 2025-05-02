export interface InstallStatTableWidgetProps {
  userId?: number;
  mode?: "delete" | "view" | "create";
  dateRange?: { start: Date; end: Date };
}
