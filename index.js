const api = require("./src/api")
const utils = require("./src/utils");

//Parse relevant information from package.json / github repository
const parsePackage = (package, repository) => { return {
    name: (package.name || repository.name),
    version: (package.version || "0.0.0"),
    description: (package.description|| repository.description),
    author: (repository.owner.login || package.author),
    stats: {
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        tags: repository.topics,
    },
    url: {
        repository: repository.html_url,
        git: repository.git_url,
        css: "https://" + api.raw + "/" + repository.name + "/" + repository.name + repository.default_branch + "/index.css",
        butter:  repository.html_url.replace('https://', api.protocol),
        }
}};

//Raw file from github repository
const getRaw = (opts, fn) => utils.getJson({
    hostname: api.raw,
    path: '/' + opts.user + '/' + opts.repository + '/' + opts.branch + '/' + opts.filename,
    headers: api.headers
}, fn);

//Search request opts
const config = {
    hostname: api.github,
    path: '/search/repositories?q=butter+theme+language:css+fork:false',
    headers: api.headers
};

//Modeule methods
const m = {};
m.search = (callback) => utils.getJson(config, (data) => {
        data.items.map((item, index) => {
            //Check for themes...
            if (item.name.substring(0, 13) == "butter-theme-") {
                //Raw package.json form repository
                getRaw({
                    user: item.owner.login,
                    repository: item.name,
                    branch: item.default_branch || 'master',
                    filename: 'package.json'
                }, (package) => {
                    //Get theme relevant data...
                    let theme = parsePackage(package, item);
                    callback(theme, index, data.total_count);
                })
            }
        })
    });

    m.search((theme,index, results) => {
        //
        console.log(theme,index,results);
    });

module.exports = m;
