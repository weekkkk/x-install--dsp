import type { LayoutHeaderWidgetAction } from "../types";

export const layoutHeaderWidgetActionIcon: Record<LayoutHeaderWidgetAction, { icon?: string; text?: string }> = {
  "search": { icon: "xii:search" },
  "add": { icon: "xii:plus" },
  "delete-mode": {
    icon: "xii:trash",
  },
  "toggle": { icon: "xii:menu" },
  "create": { text: "Create" },
  "delete": { text: "Delete" },
};
