type HtmlAsset = {
  data_content: string;
};

type Story = {
  path: string;
  title: string;
  html_assets: HtmlAsset[];
};

type Quizzes = {
  stories: Story[];
};

export default Quizzes;
