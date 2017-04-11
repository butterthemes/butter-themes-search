const https = require('https'),
      api = require('./api.js'),
      utils = {};

utils.getJson = (opts, callback) => https.get(opts, (response) => {
          //Get res data...
          const statusCode = response.statusCode;
          const contentType = response.headers['content-type'];
          //Handle errors...
          let error;
          if (statusCode !== 200) {
              error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
          //Validate json
          } else if (!/^application\/json/.test(contentType)) {
              error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
          } if (error) {
              console.error(error.message);
              // consume response data to free up memory
              response.resume();
              return;
          }
          // Continuously update stream with dat
          let chunk = '';
          response.on('data', (d) => chunk += d);
          response.on('end', () => {
              // Data reception is done, do whatever with it!
              var parsed = JSON.parse(chunk);
              callback(parsed);
          });
      });

//Raw file from github repository
utils.rawJson = (opts, callback) => utils.getJson({
    hostname: api.raw,
    path: '/' + opts.user + '/' + opts.repository + '/' + (opts.branch || 'master') + '/' + opts.filename,
    headers: api.headers
}, callback);

 //Parse relevant information from package.json / github repository
 utils.parsePackage = (data, repository) => ({
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

      //Export ->
      module.exports = utils;
