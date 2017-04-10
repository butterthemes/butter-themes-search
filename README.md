# Honey-butter
A simple bot that searches for `butter-themes` from github.
### Install
``` 
  npm install honey-butter
```
### Usage
```JS
  const bot = require('honey-butter');
        //Search for themes
        bot.search((theme, index)=> {
          console.log(theme.name, theme.version, index);
          //-> butter-theme-dark, '0.0.1', 0
        });
```
