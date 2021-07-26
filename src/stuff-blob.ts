export type StuffBlobOf<a> = {
  news: Record<string, StuffItem<a>>;
};

export type StuffItem<a> = {
  news: { display_assets: { embedCode?: { embed: a } }[] };
};

export type StuffBlob = StuffBlobOf<string>;
