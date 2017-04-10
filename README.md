# Honey-butter
A simple bot that helps to fetch and analyze `butter-themes` from github.
### Install
```
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
