export type TStatTableProps = {
  stats: StatResDto[];
  footer?: StatResDto;
  readonly?: boolean;
  loading?: boolean;
  mode?: "view" | "del";
};
