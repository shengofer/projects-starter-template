'use strict';

var
    dotenv = require('dotenv'),
    chalk = require('chalk'),
    fs = require('fs');

module.exports = tryLoad;

function tryLoad(envPath) {
    try {
        fs.statSync(envPath);
        load(envPath);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
        console.log('[' + chalk.red('!Warning') + '] Can\'t load ' + chalk.magenta(envPath) + ' file');
    }
}

function load(envPath) {
    dotenv.config({
        path: envPath
    });
}