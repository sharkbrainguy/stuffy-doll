import type { Infra } from './infra';
import type { Link } from './link';
import extractIframeSrc from './effects/extract-iframe-src';
import extractQuizUrls from './effects/extract-quiz-urls';
import extractScriptBodies from './effects/extract-script-bodies';
import fetchString from './effects/fetch-string';
import console from './effects/console';
import now from './effects/now';
import main from './main';

const infra: Infra = {
  ...extractIframeSrc,
  ...fetchString,
  ...extractQuizUrls,
  ...extractScriptBodies,
  ...now,
  ...console,
};

export default (): AsyncGenerator<Link> => main(infra);
