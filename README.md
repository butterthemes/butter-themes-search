# buttter-themes-search

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![npm](https://img.shields.io/npm/v/butter-themes-search.svg)](https://www.npmjs.com/package/butter-themes-search)
[![npm](https://img.shields.io/npm/dt/butter-themes-search.svg)](https://www.npmjs.com/package/butter-themes-search)

A simple module to fetch and analyze `butter-themes` from github repositories.

### Install
```SHELL
  npm install buttter-themes-search
```

### Usage
```JS
  const search = require('butter-themes-search');
        //Search for themes
        search((themes) => {

            //Do stuff with...
            themes.map((a, b) => console.log(a, b));
        });
```

### Test
```SHELL
npm test

> butter-themes-search@0.0.1 test ./butter-themes-search/test/test.js
> node ./test/test.js

 Searching for themes...

 Results found: 2 official themes, 0 third-party, 2 total.

 --- butter-theme(official): butter-theme-pink 0.0.1 [0]
 --- butter-theme(official): butter-theme-dark 0.0.1 [1]
 --- ...
```
