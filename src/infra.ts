import type { Link } from './link';

export interface FetchString {
  fetchString(url: string): Promise<string>;
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

export interface Infra
  extends FetchString,
    ExtractQuizUrls,
    ExtractScriptBodies,
    ExtractIframeSrc {}
