const api = require("./src/api")
const utils = require("./src/utils");

//Raw file from github repository
const rawJson = (opts, callback) => utils.getJson({
    hostname: api.raw,
    path: '/' + opts.user + '/' + opts.repository + '/' + (opts.branch || 'master') + '/' + opts.filename,
    headers: api.headers
}, callback);

//Parse relevant information from package.json / github repository
const parsePackage = (package, repository) => ({
    name: (package.name || repository.name),
    version: (package.version || "0.0.0"),
    description: (package.description|| repository.description),
    author: repository.owner.login,
    stats: {
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        tags: repository.topics
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

//Modeule methods
const m = {};
m.search = (callback) => utils.getJson(config, (data) => {
        //Store vaLid themes
        let themes = [];
        data.items.map((item, index) => {
            //Check for themes...
            if (item.name.substring(0, 13) == "butter-theme-") {
                themes.push(item);
            }
        });
        //Raw package.json form repository
        themes.map((item, index) => {
        rawJson({
            user: item.owner.login,
            repository: item.name,
            branch: item.default_branch,
            filename: 'package.json'
        }, (package) => {
            //Get theme relevant data...
            let theme = parsePackage(package, item);
            callback(theme, index);
        });
    });
});

module.exports = m;
