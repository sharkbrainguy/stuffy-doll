import type { Infra } from './infra';
import type { Link } from './link';
import extractIframeSrc from './extract-iframe-src';
import extractQuizUrls from './extract-quiz-urls';
import extractScriptBodies from './extract-script-bodies';
import fetchString from './fetch-string';
import console from './console';
import now from './now';
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
