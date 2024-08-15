import type { Infra } from './infra';
import type { Link } from './link';
import type { ListPage, StoryDetail } from './quizzes';
import toTimestamp from './to-timestamp';

const papers = [
  {
    name: 'Stuff',
    quizzes: () => `https://www.stuff.co.nz/api/v1.0/stuff/page?path=quizzes`,
    quiz: (id: string | number) =>
      `https://www.stuff.co.nz/api/v1.0/stuff/story/${id}`,
  },

  {
    name: 'The Post',
    quizzes: () =>
      `https://www.thepost.co.nz/api/v1.0/the-post/page?path=quizzes`,
    quiz: (id: string | number) =>
      `https://www.thepost.co.nz/api/v1.0/the-post/story/${id}`,
  },
];

async function* main(infra: Infra): AsyncGenerator<Link> {
  for (const paper of papers) {
    const recentQuizzes = await infra.fetchJson<ListPage>(paper.quizzes());
    const now = infra.now();
    for (const datum of recentQuizzes.data) {
      // Skip datum that has no stories
      if (datum.stories === undefined) continue;

      for (const story of datum.stories) {
        const title = story.content.title;
        const date = new Date(story.date);
        if (toTimestamp(date) !== toTimestamp(now)) {
          continue;
        }

        const detail = await infra.fetchJson<StoryDetail>(paper.quiz(story.id));
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
}

export default main;
