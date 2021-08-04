import type { Infra } from './infra';
import type { Link } from './link';
import extractIframeSrc from './effects/extract-iframe-src';
import fetchJson from './effects/fetch-json';
import console from './effects/console';
import now from './effects/now';
import main from './main';

const infra: Infra = {
  ...extractIframeSrc,
  ...fetchJson,
  ...now,
  ...console,
};

export default (): AsyncGenerator<Link> => main(infra);
