# buttter-themes-search
A simple module to fetch and analyze `butter-themes` from github repositories.
### Install 
```SHELL
  npm install buttter-themes-search
```
### Usage
```JS
  const bot = require('butter-themes-search');
        //Search for themes
        bot.search((themes) => {
            themes.map((a, b) => console.log(a, b));
        });
```
### Test
```SHELL
npm test

> butter-themes-search@0.0.1 test ./butter-themes-search/test/test.js
> node ./test/test.js

 Searching for themes...

 Results found: 2 official themes, 0 third-party, 2 total themes
 
 --- butter-theme(official): butter-theme-pink 0.0.1 [0]
 --- butter-theme(official): butter-theme-dark 0.0.1 [1]
 --- ...
```
