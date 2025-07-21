import React from "react";

export type RowData = {
  uid: string;
  name: string;
  url: string;
};

export type Keys = "name" | "mass" | "eye_color" | "gender" | "height" | "uid";

export type DetailsObjectShape = {
  [K in Keys]: string;
};

export type Details = DetailsObjectShape | null;

export type ResultData = RowData[] | [];

export type Primitives = string;
export type ElementTypes = React.ReactElement | JSX.Element;

export type TableRow<T = Primitives> = Record<string, T>;

export type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  handleNextOrPrevClick?: (
    page: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
};

export type TablePropTypes<T = Primitives> = {
  tableData: TableRow<T>[];
  columnKeys?: string[];
  renderAction?: (row: TableRow<T>) => ElementTypes;
  searchWithKey?: string;
  searchPlaceHolder?: string;
  paginationProps?: PaginationProps;
  skipFilter?: boolean;
  showLoader?: boolean;
  hideTableHeader?: boolean;
};

export type InputPropTypes = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
};
