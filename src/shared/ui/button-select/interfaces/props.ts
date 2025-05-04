import type { ButtonSelectOption } from "./option";

export interface ButtonSelectProps {
  options: ButtonSelectOption[];
  selectedColor?: "primary" | "neutral";
}
