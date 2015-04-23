"use strict";

/*
 * Service to create token
 * @example
    token: {
        length: 32,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    }
 */

module.exports = function (config, libraries, services) {
    var token = function (callback) {
        var token = Array.apply({}, Array(config.length)).map(function () {
            return (function (charset) {
                return charset.charAt(Math.floor(Math.random() * charset.length))
            }(config.charset));
        }).join('');
        callback(token);
    };

    services.token = token;
};
