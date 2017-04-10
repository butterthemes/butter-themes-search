
const https = require('https'),
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
              console.log(error.message);
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

      //Export ->
      module.exports = utils;
