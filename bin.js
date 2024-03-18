#!/usr/bin/env node
require('./dist/bin')
  .default()
  .then(
    () => {},
    (error) => {
      console.error(error);
      process.exitCode = 1;
    }
  );
