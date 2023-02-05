const Fs = require('fs');
const requireRootPath = "../";
const rootPath = "./";
const buildPath = rootPath + "build/";
const releasePath = rootPath + "release/";
const fileWriteOpts = { encoding: 'utf8' };

const pkg = require(requireRootPath + 'package.json');

console.log("Writing release script with metadata header...");
let meta = Fs.readFileSync(rootPath + 'metadata.txt', 'utf8')
meta = meta.replace('<%= pkg.version %>', pkg.version);
meta = meta.replace('<%= pkg.description %>', pkg.description);
meta = meta.replace('<%= pkg.author %>', pkg.author);
console.log("Done.");

const releaseScript = releasePath + "script.js";
Fs.writeFileSync(releaseScript, meta, fileWriteOpts);
Fs.appendFileSync(releaseScript, Fs.readFileSync(buildPath + 'script.js', 'utf8'), fileWriteOpts);

console.log("Writing manifest.json...");
const manifestJson = require(requireRootPath + 'manifest.json');
manifestJson.version = pkg.version;
Fs.writeFileSync(releasePath + 'manifest.json', JSON.stringify(manifestJson, undefined, 2), fileWriteOpts);
console.log("Done.");

const copyFile = (srcDirectory, destDirectory, fileName) =>
    Fs.copyFileSync(srcDirectory + fileName, destDirectory + fileName);

const copyFileRootToRelease = (fileName) => copyFile(rootPath, releasePath, fileName);

console.log("Copying icons...");
copyFileRootToRelease('icon48.png');
copyFileRootToRelease('icon128.png');
console.log("Done.");
