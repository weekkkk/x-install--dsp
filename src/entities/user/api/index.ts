export type TPanel = "dsp" | "dsp--in-app" | "dsp--banner";

export type TUser = {
  id: string;
  dateAdd: string;
  nickname?: string;
  panels: Record<TPanel, boolean>;
};
