import type { Infra } from './infra';
import type { Link } from './link';
import extractIframeSrc from './effects/extract-iframe-src';
import extractQuizUrls from './effects/extract-quiz-urls';
import fetchJson from './effects/fetch-json';
import console from './effects/console';
import now from './effects/now';
import main from './main';

const infra: Infra = {
  ...extractIframeSrc,
  ...fetchJson,
  ...extractQuizUrls,
  ...now,
  ...console,
};

export default (): AsyncGenerator<Link> => main(infra);
