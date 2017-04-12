var request = require('superagent'),
      util = {};

//Get request...
util.getJson = function(url, q, callback) {
    request
    .get(url)
    .query(q)
    .set('Accept', 'application/json')
    .end(function(err, res){
         if(!err) {
             callback(res.body);
         } else {
             console.error(err);
         }

    });
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
        author: git.owner.login,
        url: {
            github: git.html_url,
            css: "http://rawgit.com/" + git.owner.login + "/" + git.name + "/" + git.default_branch + (pack.main || "index.css")
        }
    }
};

//Export...
module.exports = util;
