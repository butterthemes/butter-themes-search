const api = require("./src/api")
const utils = require("./src/utils");

//Raw file from github repository
const rawJson = (opts, callback) => utils.getJson({
    hostname: api.raw,
    path: '/' + opts.user + '/' + opts.repository + '/' + (opts.branch || 'master') + '/' + opts.filename,
    headers: api.headers
}, callback);

//Parse relevant information from package.json / github repository
const parsePackage = (data, repository) => ({
    name: (data.name || repository.name),
    version: (data.version || "0.0.0"),
    description: (data.description|| repository.description),
    author: repository.owner.login,
    official: (repository.owner.login === "butterthemes") ? true : false,
    stats: {
        stars: repository.stargazers_count,
        forks: repository.forks_count
        //tags: repository.topics
    },
    url: {
        repository: repository.html_url,
        git: repository.git_url,
        css: "https://" + api.raw + "/" + repository.name + "/" + repository.name + (repository.default_branch || "master") + "/index.css",
        butter:  repository.html_url.replace('https://', api.protocol)
        }
});

//Search request opts
const config = {
    hostname: api.github,
    path: '/search/repositories?q=butter+theme+language:css+fork:false',
    headers: api.headers
};

//Modeule
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
        //Raw package.json form repository
        temp.map((item, index) => {
            //Raw package.json form repository
            rawJson({
                user: item.owner.login,
                repository: item.name,
                branch: item.default_branch,
                filename: 'package.json'
            }, (json) => {
                //Get theme relevant data & push it!
                let theme = parsePackage(json, item);
                themes[index] = theme;

                //Send all themes
                let last =  temp.length - 1;
                if (index === last) {
                    callback(themes);
                }
        });
    });
});
