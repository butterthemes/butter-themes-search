const util = {},
      got = require('got');

//Raw json file from github
util.raw = (user, repo, branch, filename, callback) => {
     got( 'https://rawgit.com/' + user + '/' + repo + '/' + ( branch || 'master') + '/' + filename,
        { json: true, retries: 0})
        .then( res => callback(res.body))
        .catch(e => console.error(e))
}

//Parse relevant data
util.parseTheme  = (json, git) => ({
    name: json.name,
    version: json.version,
    author: git.owner.login,
    urls: {
        github: git.html_url,
        css: 'https://rawgit.com/' + git.owner.login + '/' + git.name + '/' + ( git.default_branch || 'master') + '/' + (json.main || 'index.css')
    }
});

//Export...
module.exports = util;
