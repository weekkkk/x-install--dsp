import type { LayoutHeaderWidgetAction } from "../types";

export interface LayoutHeaderWidgetProps {
  showUserData?: boolean;
  userId?: number;
  actions?: LayoutHeaderWidgetAction[];
  toggleValue?: boolean;
}
