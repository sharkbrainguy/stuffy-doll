import type { Logger } from './infra';
import type { LogLevel } from './log-level';

const log = (_level: LogLevel, message: string): void => {
  console.log(message);
};

export default { log } as Logger;
