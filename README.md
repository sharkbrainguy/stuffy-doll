```
      _          __  __                 _       _ _
  ___| |_ _   _ / _|/ _|_   _        __| | ___ | | |
 / __| __| | | | |_| |_| | | |_____ / _` |/ _ \| | |
 \__ \ |_| |_| |  _|  _| |_| |_____| (_| | (_) | | |
 |___/\__|\__,_|_| |_|  \__, |      \__,_|\___/|_|_|
                        |___/
```

Scrape the stuff.co.nz quizzes.

```typescript
const stuffy = require('stuffy-doll').default;

const main = async () => {
  for await (const { href, title } of stuffy()) {
    console.log(`${title}: ${href}`);
  }
};

main().then(
  () => {},
  (e) => {
    process.exitCode = 1;
    console.error(`Stuffy failed: ${e}`);
  }
);
```
