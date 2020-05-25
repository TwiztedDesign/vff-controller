export interface PropertyObjectDocumentation {
  Name: string
  Type: string
  Default: string
  Description: string
}

export interface MethodObjectDocumentation {
  Name: string,
  Parameters: string,
  Returns: string
  Description: string
}

export interface FileContent {
  title?: string
  text?: string
  code?: string
  table?: object[]
}
