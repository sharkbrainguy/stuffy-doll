import * as Cheerio from 'cheerio';
import type { ExtractIframeSrc } from './infra';

const extractIframeSrc = (html: string): string | undefined => {
  const $ = Cheerio.load(html);
  return $('iframe').attr('src');
};

export default { extractIframeSrc } as ExtractIframeSrc;
