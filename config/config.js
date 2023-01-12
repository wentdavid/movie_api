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
