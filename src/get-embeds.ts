import type { StuffBlobOf } from './stuff-blob';

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

export default getEmbeds;
