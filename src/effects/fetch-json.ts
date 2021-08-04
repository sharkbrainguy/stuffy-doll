import type { FetchJson } from '../infra';
import type { Json } from '../json';
import Https from 'https';
import jsonParse from '../json-parse';

const fetchJson = <T>(uri: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    Https.get(uri, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const json = jsonParse(body as Json<T>);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

export default { fetchJson } as FetchJson;
