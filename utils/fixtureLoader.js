const fs = require("fs");
const path = require("path");

function loadFixture(fileName) {
    const filePath = path.join(__dirname, "../fixtures", fileName);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

module.exports = { loadFixture };