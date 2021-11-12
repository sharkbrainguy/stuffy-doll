import main from './index';
import { Link } from './link';

export default async (): Promise<void> => {
  const links = [] as Link[];
  for await (const link of main()) {
    links.push(link);
  }

  const json = JSON.stringify(links, null, 4);
  process.stdout.write(`${json}\n`);
};
