require('./dist/bin')().then(
  () => {},
  () => {
    process.exitCode = 1;
  }
);
