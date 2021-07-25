import type { Json } from './json';

const jsonParse = <T>(json: Json<T>): T => JSON.parse(json) as T;
export default jsonParse;
