"use strict";

/*
 * Resume API for store and get resume information
 * @example
    resume: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        client = services.client,
        token = services.token;

    app.post('/token', function (req, res) {
        token(function (token) {
            client.setJSON(token, { user_id: req.body.user_id, asset_id: req.body.asset_id }, function () {
                res.send(token);
            });
        });
    });

    app.post('/store', function (req, res) {
        client.getJSON(req.body.token, function (err, data) {
            if (!data) {
                res.send();
                return;
            }
            client.set(data.user_id + ':' + data.asset_id, req.body.playbackPosition, function () {
                res.send();
            });
        });
    });

    app.get('/load/:user_id/:asset_id', function (req, res) {
        client.get(req.params.user_id + ':' + req.params.asset_id, function (err, data) {
            res.send(data);
        });
    });
};
