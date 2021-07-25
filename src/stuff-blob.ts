//  type StuffBlob' a
//   = { news :: Object (StuffItem a) }
export type StuffBlobOf<a> = {
  news: Record<string, StuffItem<a>>;
};

// type StuffItem a
//   = { news :: { display_assets :: Array { embedCode :: Maybe { embed :: a } } } }
export type StuffItem<a> = {
  news: { display_assets: { embedCode?: { embed: a } }[] };
};

// type StuffBlob
//   = StuffBlob' String
export type StuffBlob = StuffBlobOf<string>;
