import * as Cheerio from 'cheerio';
import type { ExtractScriptBodies } from './infra';

const extractScriptBodies = (html: string): string[] => {
  /* eslint-disable */
  const $ = Cheerio.load(html);
  return $('script')
    .toArray()
    .filter((s) => !$(s).attr('src'))
    .map((s) => $(s).get()[0].children[0].data.trim())
    .filter((s) => s.startsWith('window.__INITIAL_STATE__ = '));
};

export default { extractScriptBodies } as ExtractScriptBodies;
