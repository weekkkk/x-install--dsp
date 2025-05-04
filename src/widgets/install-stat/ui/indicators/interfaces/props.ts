export interface InstallStatIndicatorsWidgetProps {
  userId?: number;
  mode?: "delete" | "view" | "create";
  dateRange?: { start: Date; end: Date };
}
