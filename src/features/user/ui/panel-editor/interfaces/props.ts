export interface UserPanelEditorFeatureProps {
  id: number;
  defaultValues?: Pick<UserResDto, "isXInstallApp" | "isDsp" | "isDspBanner" | "isDspInApp">;
}
