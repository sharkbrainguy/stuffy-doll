import type { Link } from './link';
import type { LogLevel } from './log-level';

export interface FetchString {
  fetchString(url: string): Promise<string>;
}

export interface FetchJson {
  fetchJson<T>(url: string): Promise<T>;
}

export interface ExtractQuizUrls {
  extractQuizUrls(html: string): Link[];
}

export interface ExtractScriptBodies {
  extractScriptBodies(html: string): string[];
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
  extends FetchString,
    FetchJson,
    ExtractQuizUrls,
    ExtractScriptBodies,
    ExtractIframeSrc,
    Logger,
    Now {}
