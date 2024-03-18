type Story = {
  content: { title: string };
  id: number;
  date: string;
};

type StoryList = {
  stories?: Story[];
};

export type ListPage = {
  data: StoryList[];
};

export type WidgetAsset = {
  type: 'WIDGET';
  item: {
    content: string;
  };
};

export type ImageAsset = { type: 'IMAGE' };

export type Asset = WidgetAsset | ImageAsset;

export type StoryDetail = {
  content: { contentBody: { assets: Asset[] } };
};
