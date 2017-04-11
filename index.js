const api = require("./src/api")
const utils = require("./src/utils");

//Search request
var url =  api.github + 'search/repositories?q=butter+theme+language:css+fork:false';

//Module
module.exports = function(callback) { utils.getJson(url, function(data) {

    //Store vaLid themes...
    var temp = [];

    //Check for themes...
    data.items.map(function(item, index) {
        if (item.name.substring(0, 13) == "butter-theme-") temp.push(item);
    });

    //Store parsed themes...
    var themes = [];

    //Raw package.json from repository
    temp.map(function (item, index){
        //Raw package.json from repository
        utils.rawJson({
            user: item.owner.login,
            repository: item.name,
            branch: item.default_branch,
            filename: 'package.json'}, function (json) {

                //Get theme relevant data & push it!
                var theme = utils.parsePackage(json, item);
                themes[index] = theme;

                //Send all themes
                var last =  temp.length - 1;
                if (index === last) callback(themes);
            });
        });
    });
}
