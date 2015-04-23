'use strict';

// Initialize New Relic Node.js agent

if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
}

// Load the libraries and modules

var config = {
    libraries: {
        bodyParser: require('body-parser')
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: [
            [require('dragonnodejs-express'), {
                app: {
                    port: process.env.PORT
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED,
                    users: process.env.AUTH_USERS,
                    user: process.env.AUTH_USER,
                    password: process.env.AUTH_PASSWORD,
                    realm: process.env.AUTH_REALM
                },
                cors: {},
                header: {
                    'X-Powered-By': null
                }
            }],
            [require('dragonnodejs-redis'), {
                client: {
                    uri: process.env.REDISCLOUD_URL
                },
                json: {},
                cache: {
                    disabled: process.env.CACHE_DISABLED
                }
            }]
        ],
        directory: {
            app: {},
            token: {
                length: 32,
                charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            },
            resume: {}
        }
    }
};
require('dragonnodejs')(config);
