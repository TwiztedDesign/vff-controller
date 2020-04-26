export interface PreviewItem {
  file: File;
  data: string | ArrayBuffer
}

export interface SelectItem {
  key: string;
  value: string
}

export interface TableRow {
  rowData: object;
  _rowId: number
}
