import main from './index';

export default async (): Promise<void> => {
  for await (const link of main()) {
    console.log(link);
  }
};
