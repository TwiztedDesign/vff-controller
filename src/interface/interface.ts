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

export interface TableTemplateColumn {
  elements: HTMLElement[]
}

export interface TableTemplateHead {
  rows: any[]
}

export interface TableTemplateBody {
  rows: any[]
}

export interface TableTemplate {
  head: TableTemplateHead,
  body: TableTemplateBody
}
