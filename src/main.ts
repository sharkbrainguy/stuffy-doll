import type { Infra } from './infra';
import type { Link } from './link';
// import toTimestamp from './to-timestamp';
import type { ListPage, StoryDetail } from './quizzes';
import toTimestamp from './to-timestamp';

// const MONTH_NAMES = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

async function* main(infra: Infra): AsyncGenerator<Link> {
  const recentQuizzes = await infra.fetchJson<ListPage>(
    `https://www.stuff.co.nz/api/v1.0/stuff/page?path=quizzes`
  );
  const now = infra.now();
  for (const datum of recentQuizzes.data) {
    for (const story of datum.stories) {
      const title = story.content.title;
      const date = new Date(story.date);
      if (toTimestamp(date) !== toTimestamp(now)) {
        continue;
      }

      const detail = await infra.fetchJson<StoryDetail>(
        `https://www.stuff.co.nz/api/v1.0/stuff/story/${story.id}`
      );
      for (const asset of detail.content.contentBody.assets) {
        if (asset.type === 'WIDGET') {
          const href = infra.extractIframeSrc(asset.item.content);
          if (href) {
            yield {
              href,
              title,
              date: story.date,
            } as Link;
          }
        }
      }
    }
  }
}

export default main;
