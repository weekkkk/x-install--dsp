export type TUiButtonSelectOption<T extends { [key: string]: any } = {}> = {
  key: string;
  label: string;
  disabled?: boolean;
} & T;
