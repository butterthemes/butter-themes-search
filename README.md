# Honey-butter
A simple bot that helps to fetch and analyze `butter-themes` from github.
### Install
```SHELL
  npm install honey-butter
```
### Usage
```JS
  const bot = require('honey-butter');
        //Search for themes
        bot.search((themes) => {
            themes.map((a, b) => console.log(a, b));
        });
```
### Test
```SHELL
npm test

> honey-butter@0.0.1 test ./honey-butter/test/test.js
> node ./test/test.js

 @honeyButter is searching...

 @honeyButter found: 2 themes.
 --- butter-theme: butter-theme-pink 0.0.1 [0]
 --- butter-theme: butter-theme-dark 0.0.1 [1]
```
