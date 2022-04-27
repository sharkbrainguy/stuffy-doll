type HtmlAsset = {
  data_content: string;
};

type Story = {
  path: string;
  title: string;
  html_assets: HtmlAsset[];
  datetime_display: string;
};

type Quizzes = {
  stories: Story[];
};

export default Quizzes;
