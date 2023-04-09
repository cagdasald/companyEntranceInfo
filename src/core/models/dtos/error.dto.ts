export interface ErrorDto {
  status: number;
  path: string;
  message: string;
}

export interface ParsedErrorDto {
  message: string;
  name: string;
  stack: string;
  status: number;
  config: ParsedErrorConfig;
}

interface ParsedErrorConfig {
  data: string;
  method: string;
  url: string;
}
