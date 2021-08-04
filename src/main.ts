import type { Infra } from './infra';
import type { Json } from './json';
import type { StuffBlob } from './stuff-blob';
import type { Link } from './link';
import toTimestamp from './to-timestamp';
import getEmbeds from './get-embeds';
import jsonParse from './json-parse';
import * as He from 'he';
import Stories from './quizzes';

async function* main(infra: Infra): AsyncGenerator<Link> {
  const recentQuizzes = await infra.fetchJson<Stories>(
    `https://i.stuff.co.nz/_json/national/quizzes`
  );

  for (const { path, title } of recentQuizzes.stories) {
    const timestamp = toTimestamp(infra.now());

    if (title.indexOf('Sport') !== -1 || title.indexOf(timestamp) === -1) {
      continue;
    }

    const html = await infra.fetchString(`https://i.stuff.co.nz${path}`);
    const scripts = infra.extractScriptBodies(html);

    for (const script of scripts) {
      const prefix = 'window.__INITIAL_STATE__ = ';
      const js = script.trim();

      if (js.startsWith(prefix)) {
        const json = js.slice(prefix.length) as Json<Json<StuffBlob>>;
        const json2 = jsonParse(json);
        const blob = jsonParse(json2);

        for (const embed of getEmbeds(blob)) {
          const html = He.decode(embed);
          const href = infra.extractIframeSrc(html);
          if (href == null) {
            continue;
          }

          yield { href, title };
        }
      }
    }
  }
}

export default main;
