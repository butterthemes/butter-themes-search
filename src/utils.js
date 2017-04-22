var request = require('superagent'),
      util = {};

//Get request...
util.getJson = function(url, q, callback) {
    request
    .get(url)
    .retry(0)
    .query(q)
    .set('Accept', 'application/json')
    .end(function(err, res){ callback(err, res.body) });
};

//Raw json file from github
util.rawJson = function(user, repo, branch, file, callback){
    util.getJson('https://rawgit.com/'+user+'/'+repo+'/'+(branch||'master')+'/'+file, null, callback);
}

//Parse github repository
util.parseTheme = function (pack, git){
    return {
        name: pack.name || git.name,
        version: pack.version || '0.0.0',
        description: pack.description || git.description,
        author: git.author || pack.author,
        stars: git.stargazers || 0,
        is_official: (git.author==="butterthemes") ? true : false,
        url: {
            github: git.url,
            butter: git.url.replace('https', 'butter-themes'),
            css: "https://rawgit.com/" + git.author + "/" + git.name + "/" + git.branch + "/" + (pack.main || "index.css")
        }
    }
};

//Export...
module.exports = util;
