const api = require("./src/api")
const utils = require("./src/utils");

//Search request opts
const config = {
    hostname: api.github,
    path: '/search/repositories?q=butter+theme+language:css+fork:false',
    headers: api.headers
};

//Module
module.exports = (callback) => utils.getJson(config, (data) => {

        //Store vaLid themes...
        let temp = [];
        data.items.map((item, index) => {

            //Check for themes...
            if (item.name.substring(0, 13) == "butter-theme-") {
                temp.push(item);
            }
        });

        //Store parsed themes...
        let themes = [];

        //Raw package.json from repository
        temp.map((item, index) => {

            //Raw package.json from repository
            utils.rawJson({

                user: item.owner.login,
                repository: item.name,
                branch: item.default_branch,
                filename: 'package.json'

            }, (json) => {

                //Get theme relevant data & push it!
                let theme = utils.parsePackage(json, item);
                themes[index] = theme;

                //Send all themes
                let last =  temp.length - 1;
                if (index === last) callback(themes);
        });
    });
});
