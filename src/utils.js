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
        name: pack.name,
        version: pack.version,
        description: pack.description || git.description,
        author: git.author,
        url: {
            github: git.url,
            css: "http://rawgit.com/" + git.author + "/" + git.name + "/" + git.branch + (pack.main || "index.css")
        }
    }
};

//Export...
module.exports = util;
