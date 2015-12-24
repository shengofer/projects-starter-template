var karma = require('karma');

var bowerJson = require('../bower.json');

function camelCase(str) {
    return str
        .replace(/^[_.\/\\\-\s]+/, '')
        .toLowerCase()
        .replace(/[_.\/\\\-\s]+(\w|$)/g, function (m, p1) {
            return p1.toUpperCase();
        });
}

function injectDependency(contents, name) {
    var rModuleDef = /angular\s*\.\s*module\s*\(\s*'[^']+'\s*,\s*\[\s*([^\[\]]+)\s*\]\s*\)/;

    return contents.replace(rModuleDef, function(m, p1) {
        var deps = p1.split(',');

        deps.push('\'' + name + '\'');

        return m.replace(p1,  deps.join(','));
    });
}


function moduleName(bundleName) {
    return [ bowerJson.moduleName, bundleName ? '.' + bundleName : '' ].join('');
}

function streamToPromise(stream) {
    return new Promise(function(fulfil, reject) {
        stream
            .on('end', fulfil)
            .on('error', reject);
    });
}

function runKarma(options) {
    options = options || {};

    return new Promise(function (fulfil, reject) {
        var server = new karma.Server({
            configFile: options.configFile,
            singleRun: options.singleRun
        }, function(err) {
            if (err) {
                reject(err);
            } else {
                fulfil();
            }
        });

        server.start();
    });
}

module.exports = {
    camelCase: camelCase,
    injectDependency: injectDependency,
    moduleName: moduleName,
    streamToPromise: streamToPromise,
    runKarma: runKarma
};
