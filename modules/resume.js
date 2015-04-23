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

    app.get('/load/:user_id/:query', function (req, res) {
        var query = JSON.parse(req.params.query);
        if (typeof query == 'object') {
            query = query.map(function (asset_id) { return req.params.user_id + ':' + asset_id; });
            client.mget(query, function (err, data) {
                res.send(data);
            });
        } else {
            client.get(req.params.user_id + ':' + query, function (err, data) {
                res.send(data);
            });
        }
    });

    app.io.route('store', function (req) {
        client.getJSON(req.data.token, function (err, data) {
            if (!data) {
                return;
            }
            client.set(data.user_id + ':' + data.asset_id, req.data.playbackPosition, function () {});
        });
    });
};
