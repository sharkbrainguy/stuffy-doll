import { Infra } from './infra';
import extractIframeSrc from './extract-iframe-src';
import extractQuizUrls from './extract-quiz-urls';
import extractScriptBodies from './extract-script-bodies';
import fetchString from './fetch-string';
import main from './main';

const infra: Infra = {
  ...extractIframeSrc,
  ...fetchString,
  ...extractQuizUrls,
  ...extractScriptBodies,
};

const main_ = async () => {
  for await (const data of main(infra)) {
    console.log(data);
  }
};

main_().then(
  () => {
    return;
  },
  (e) => {
    console.error('fuck', e);
    process.exitCode = 1;
  }
);
