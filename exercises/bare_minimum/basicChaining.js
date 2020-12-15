/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(fs);
Promise.promisifyAll(request);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath)
    .then((data) => {
      const user = data.toString().split('\n')[0];
      return request.getAsync(`https://api.github.com/users/${user}`);
    })
    .then((profile) => {
      return fs.writeFileAsync(writeFilePath, profile.toJSON().body);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
