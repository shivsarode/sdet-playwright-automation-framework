const fs = require("fs/promises");
const path = require("path");

const cache = {};

async function loadFixture(fileName) {
    if (cache[fileName]) {
        return cache[fileName];
    }

    const filePath = path.join(__dirname, "../fixtures", fileName);
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    cache[fileName] = data;
    return data;
}

module.exports = { loadFixture };