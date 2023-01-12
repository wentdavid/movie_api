/* This file loads the env.json file and assigns the properties inside it to the process.env object.
This allows you to have different configurations for different environments (e.g. development, production) and easily switch between them by changing the NODE_ENV environment variable. */

const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "./env.json");

let env = JSON.parse(fs.readFileSync(envPath));

let node_env = process.env.NODE_ENV || "development";

Object.assign(process.env, env[node_env]);
