import * as Cheerio from 'cheerio';
import type { Link } from './link';
import type { ExtractQuizUrls } from './infra';

const extractQuizUrls = (html: string): Link[] => {
  const $ = Cheerio.load(html);

  return $('li.story-list__item.js-adfliction__target--all a')
    .toArray()
    .map((x) => ({
      title: $('h3', x).text().trim(),
      href: $(x).attr('href') as string,
    }));
};

const impl: ExtractQuizUrls = { extractQuizUrls };
export default impl;
