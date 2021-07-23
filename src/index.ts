import * as Https from 'https';
import * as Cheerio from 'cheerio';
import * as He from 'he';

const getHttps = (uri: string) =>
  new Promise<string>((resolve, reject) => {
    Https.get(uri, (res) => {
      let txt = '';
      res.setEncoding('utf8');
      res.resume();
      res.on('data', (s) => {
        txt += s;
      });
      res.on('close', () => {
        resolve(txt);
      });
    }).on('error', (e) => {
      reject(e);
    });
  });

const allQuizUrls = async () => {
  const html = await getHttps(`https://i.stuff.co.nz/national/quizzes`);
  const $ = Cheerio.load(html);

  return $('li.story-list__item.js-adfliction__target--all a')
    .toArray()
    .map((x) => ({
      title: $('h3', x).text().trim(),
      href: $(x).attr('href') as string,
    }));
};

const getTheIframeSrc = (html: string) => {
  const $ = Cheerio.load(html);
  return $('iframe').attr('src');
};

const main = async () => {
  for await (const thing of getAllTheThings()) {
    console.log(thing);
  }
};

async function* getAllTheThings() {
  const urls = await allQuizUrls();
  for (const { href, title } of urls) {
    // TODO: this is where you would pick the ones you want based on today's date etc
    yield* getOneThing({ href, title });
  }
}

async function* getOneThing({ href, title }: { href: string; title: string }) {
  const html = await getHttps(`https://i.stuff.co.nz/${href}`);
  const $ = Cheerio.load(html);
  const stateTag = $('script')
    .toArray()
    .filter((s) => !$(s).attr('src'))
    .map((s) => $(s).get()[0].children[0].data.trim())
    .filter((s) => s.startsWith('window.__INITIAL_STATE__ = '))
    .map((s) => JSON.parse(s.slice('window.__INITIAL_STATE__ = '.length)))
    .map((s) => JSON.parse(s));

  for (const embed of getStuffEmbeds(stateTag[0])) {
    if (embed == null) {
      continue;
    }

    const html = He.unescape(embed || '');
    const href = getTheIframeSrc(html);
    if (href == null) {
      continue;
    }

    yield { title, href };
  }
}

main().then(
  () => {
    return;
  },
  (e) => {
    console.error('fuck', e);
    process.exitCode = 1;
  }
);

//  type StuffBlob' a
//   = { news :: Object (StuffItem a) }
type StuffBlobOf<a> = {
  news: Record<string, StuffItem<a>>;
};

// type StuffItem a
//   = { news :: { display_assets :: Array { embedCode :: Maybe { embed :: a } } } }
type StuffItem<a> = {
  news: { display_assets: { embedCode?: { embed: a } }[] };
};

// type StuffBlob
//   = StuffBlob' String
type StuffBlob = StuffBlobOf<string>;

function* getEmbeds<a>(blob: StuffBlobOf<a>): Generator<a> {
  for (const k in blob.news) {
    const n = blob.news[k];
    for (const asset of n.news.display_assets) {
      if (asset.embedCode != null) {
        yield asset.embedCode.embed;
      }
    }
  }
}

const getStuffEmbeds = (blob: StuffBlob): Generator<string> => getEmbeds(blob);
