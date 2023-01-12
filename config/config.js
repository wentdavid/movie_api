/* This file is responsible for reading the configuration from a config.json file and storing it in a variable.
If there is an error reading the file or parsing the JSON, it will log an error message and exit the process.//
 */

const fs = require("fs"); 

let config = {};

try {
  const configFile = fs.readFileSync("./config.json");
  config = JSON.parse(configFile);
} catch (error) {
  console.log("config.json file not found or invalid JSON in config file");
  process.exit(1);
}

module.exports = config;
