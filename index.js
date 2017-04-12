const util = require("./src/utils"),
      url = 'search/repositories?q=butter+theme+language:css+fork:false';

//Module...
module.exports = callback => util.getJson('https://api.github.com/search/repositories', {q:'butter+theme+language:css+fork:false'}, (res) => {

          //Store items
          const items = [],
                themes = [];

          res.items.map(item => {
              //Check for themes
              if(item.name.startsWith('butter-theme-')) items.push(item);
          });

          items.map((item, index) => {

              //Load package,json
              util.rawJson(item.owner.login, item.name, item.default_branch, 'package.json', (pack) => {

                  //Parse theme relevant data
                  const theme = util.parseTheme(pack, item);

                  //Add parsed theme
                  themes.push(theme);

                  //Send all themes
                  if(items.length === (index + 1)) callback(themes);
              })
          });
      });
