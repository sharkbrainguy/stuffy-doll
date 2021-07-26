#!/usr/bin/env node
require('./dist/bin')
  .default()
  .then(
    () => {},
    () => {
      process.exitCode = 1;
    }
  );
