const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const configPath = path.join(rootDir, "data", "site.json");
const site = JSON.parse(fs.readFileSync(configPath, "utf8"));

if (!site.name || !site.baseUrl || !site.cloudflarePagesProject) {
  throw new Error("data/site.json is missing required site configuration");
}

site.baseUrl = site.baseUrl.replace(/\/$/, "");

module.exports = { rootDir, site };
