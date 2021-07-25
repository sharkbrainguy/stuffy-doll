import * as Https from 'https';
import type { FetchString } from './infra';

const fetchString = (uri: string) =>
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

export default { fetchString } as FetchString;
