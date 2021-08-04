import type { Infra } from './infra';
import type { Link } from './link';
import toTimestamp from './to-timestamp';
import * as He from 'he';
import Stories from './quizzes';

async function* main(infra: Infra): AsyncGenerator<Link> {
  const recentQuizzes = await infra.fetchJson<Stories>(
    `https://i.stuff.co.nz/_json/national/quizzes`
  );

  for (const story of recentQuizzes.stories) {
    const { title, html_assets } = story;
    const timestamp = toTimestamp(infra.now());

    if (title.indexOf('Sport') !== -1 || title.indexOf(timestamp) === -1) {
      continue;
    }

    for (const asset of html_assets) {
      const s = He.decode(asset.data_content);
      const href = infra.extractIframeSrc(s);
      if (href == null) {
        continue;
      }

      yield { href, title };
    }
  }
}

export default main;
