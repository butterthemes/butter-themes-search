var util = require("./src/utils"),
    url = 'search/repositories?q=butter+theme+language:css+fork:false';

//Module...
module.exports = function(callback) {

     util.getJson('https://api.github.com/search/repositories', {q:'butter+theme+language:css+fork:false'}, function(err, res) {

         if (err) return false;

         //Store themes
         var themes = [];

         //Fix index bug
         var fixed_index = 0;

         res.items.filter(function(a){

             //Check for themes
              return a.name.startsWith('butter-theme-');

         })

         .map(function (item) {

             //Get relevant data
             return {
                 name: item.name,
                 author: item.owner.login,
                 branch: item.default_branch,
                 description: item.description,
                 stargazers: item.stargazers_count,
                 url: item.html_url,
             }
         })

         .forEach(function(item, index, arr) {

              util.rawJson(item.author, item.name, item.branch, 'package.json', function(err, res) {

                  if(!err) {

                      //Parse theme relevant data
                      var theme = util.parseTheme(res, item);

                      //Add parsed theme
                      themes.push(theme);
                  }

                  // Fixed index (BUG)
                  fixed_index += 1;

                  if(arr.length === fixed_index) callback(themes);

              });
          });
      });
  };
