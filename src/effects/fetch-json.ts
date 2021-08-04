import type { FetchJson } from '../infra';
import Https from 'https';

const fetchJson = <T>(uri: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    Https.get(uri, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(body) as T);
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
