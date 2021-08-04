import type { Link } from './link';
import type { LogLevel } from './log-level';

export interface FetchJson {
  fetchJson<T>(url: string): Promise<T>;
}

export interface ExtractQuizUrls {
  extractQuizUrls(html: string): Link[];
}

export interface ExtractIframeSrc {
  extractIframeSrc(html: string): string | undefined;
}

export interface Now {
  now(): Date;
}

export interface Logger {
  log(level: LogLevel, message: string): void;
}

export interface Infra
  extends FetchJson,
    ExtractQuizUrls,
    ExtractIframeSrc,
    Logger,
    Now {}
