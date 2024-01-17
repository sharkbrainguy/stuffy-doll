import type { Infra } from './infra';
import type { Link } from './link';
import toTimestamp from './to-timestamp';
import Stories from './quizzes';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

async function* main(infra: Infra): AsyncGenerator<Link> {
  const recentQuizzes = await infra.fetchJson<Stories>(
    `https://www.stuff.co.nz/_json/national/quizzes`
  );
  const now = infra.now();

  for (const {
    title,
    html_assets,
    datetime_display,
  } of recentQuizzes.stories) {
    const timestamp = toTimestamp(now);
    const titleDate = `${
      MONTH_NAMES[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;

    if (
      title.indexOf('Sport') !== -1 ||
      !(datetime_display.endsWith(timestamp) || title.endsWith(titleDate))
    ) {
      continue;
    }

    for (const asset of html_assets) {
      const href = infra.extractIframeSrc(asset.data_content);
      if (href == null) {
        continue;
      }

      yield { href, title };
    }
  }
}

export default main;
