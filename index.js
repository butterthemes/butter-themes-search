var util = require("./src/utils"),
    url = 'search/repositories?q=butter+theme+language:css+fork:false';

//Module...
module.exports = function(callback) {

     util.getJson('https://api.github.com/search/repositories', {q:'butter+theme+language:css+fork:false'}, function(res) {
         //Store items
         var items = [],
             themes = [];

             res.items.map(function(item) {
                 //Check for themes
                 if(item.name.startsWith('butter-theme-')) items.push(item);
             });

             items.map(function(item, index) {

                 //Load package,json
                 util.rawJson(item.owner.login, item.name, item.default_branch, 'package.json', function(pack) {

                  //Parse theme relevant data
                  var theme = util.parseTheme(pack, item);

                  //Add parsed theme
                  themes.push(theme);

                  //Send all themes
                  if(items.length === (index + 1)) callback(themes);
              });
          });
      });
  };
