import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

export const rangesConst: TUiButtonSelectOption<
  | {
      getDates: () => { start: Date; end: Date };
    }
  | {
      dates?: { start: Date; end: Date };
    }
>[] = [
  {
    key: "day",
    label: "By Day",
    getDates: () => {
      const date = new Date();
      return { start: date, end: date };
    },
  },
  {
    key: "week",
    label: "By Week",
    getDates: () => {
      const date = new Date();
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    },
  },
  {
    key: "month",
    label: "By Month",
    getDates: () => {
      const date = new Date();
      return { start: startOfMonth(date), end: endOfMonth(date) };
    },
  },
  {
    key: "custom",
    label: "Custom",
    disabled: true,
  },
];
