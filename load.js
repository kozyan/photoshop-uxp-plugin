if (typeof window.global === 'undefined') window.global = window.globalThis;
if (typeof global.queueMicrotask !== 'function') {
    if (typeof global.setImmediate === 'function') {
        global.queueMicrotask = function (callback) {
            global.setImmediate(callback);
        };
    } else {
        global.queueMicrotask = function (callback) {
            global.setTimeout(callback, 0);
        };
    }
}

try {
    window.uxp = require('uxp');
    window.fs = require('fs');
    window.os = require('os');
    window.host = uxp.host.name;
    switch (host) {
        case 'InDesign':
            window.indesign = require('indesign');
            break;
        case 'Illustrator':
            window.illustrator = require('illustrator');
            break;
        case 'Photoshop':
            window.photoshop = require('photoshop');
            break;
    }
} catch (_) {
    console.error('Attempted to load UXP api outside UXP application');
}
