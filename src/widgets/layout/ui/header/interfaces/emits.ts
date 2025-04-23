export interface LayoutHeaderWidgetEmits {
  login: [resolve: () => void];
  logout: [resolve: () => void];
  search: [resolve: () => void];
  delete: [resolve: () => void];
  add: [resolve: () => void];
  toggle: [resolve: () => void];
}
