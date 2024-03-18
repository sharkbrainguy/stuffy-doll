import type { FetchJson } from '../infra';

const fetchJson = async <T>(uri: string): Promise<T> => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${uri}: ${response.status} ${response.statusText}`
    );
  }
  const result = (await response.json()) as T;
  return result;
};

export default { fetchJson } as FetchJson;
