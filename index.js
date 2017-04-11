const gh = require('gh-got'),
      pk = require('./package.json'),
      util = require("./src/utils"),
      url = 'search/repositories?q=butter+theme+language:css+fork:false';

 module.exports = fun => {
     gh(url, {
         retries: 0,
         headers: { 'user-agent':  'butter-themes-search/1.0 (https://github.com/btzr-io/butter-themes-search)'}
     }).then( res => {

         let data = res.body.items,
             items = [],
             themes = [];

        //Get butter-themes
         data.map(item => {
             if(item.name.startsWith("butter-theme-")) items.push(item)
         })

         //Get package.json
         items.map((item, index) => util.raw(item.owner.login, item.name, null,'package.json', (json) => {
             const theme = util.parseTheme(json, item);
             themes.push(theme);
             if(themes.length === (index + 1) ) fun(themes)
         })


     )
 })
 //Error
 .catch(e => console.error(e))
}
