var api  = {
    raw: "https://rawgit.com/",
    github: "https://api.github.com/",
    protocol: "butter-themes://",
    headers: {
        //Enable topics
        "Accept" : "application/vnd.github.mercy-preview+json",
        "User-Agent" : "butter-bot/0.1"
    }
};

var utils = {};

utils.getJson = function(url, callback){
    var request = new XMLHttpRequest();

    request.open('GET',url, true);

    //Set Headers
    request.setRequestHeader('User-Agent', api.headers["User-Agent"]);
    request.onload = function() {
         if (request.status >= 200 && request.status < 400) {
             // Success!
             var data = JSON.parse(request.responseText);
             callback(data);
         } else {
             console.error("status: " + request.status);
             // We reached our target server, but it returned an error
         }
     };
     request.onerror = function(e) {console.error(e)};
     request.send();
};


utils.rawJson = function(opts, callback) {
    utils.getJson( api.raw + opts.user + '/' + opts.repository + '/' + (opts.branch || 'master') + '/' + opts.filename, callback)
};

//Parse relevant information from package.json / github repository
utils.parsePackage = function (data, repo) {
 return {
     name: (data.name || repo.name),
     version: (data.version || "0.0.0"),
     description: (data.description|| repo.description),
     author: repo.owner.login,
     official: (repo.owner.login === "butterthemes") ? true : false,
     stats: {
         stars: repo.stargazers_count,
         forks: repo.forks_count
         //tags: repository.topics
     },
     url: {
         repository: repo.html_url,
         git: repo.git_url,
         css: api.raw  + repo.name + "/" + repo.name + (repo.default_branch || "master") + "/index.css",
         butter:  repo.html_url.replace('https://', api.protocol)
     }
 }
};

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
