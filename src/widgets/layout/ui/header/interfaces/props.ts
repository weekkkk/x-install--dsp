import type { LayoutHeaderWidgetAction } from "../types";

export interface LayoutHeaderWidgetProps {
  showUserData?: boolean;
  userId?: number;
  actions?: LayoutHeaderWidgetAction[];
  action?: LayoutHeaderWidgetAction;
  mdActions?: LayoutHeaderWidgetAction[][];
  toggleValue?: boolean;
  dateFilter?: boolean;
}
