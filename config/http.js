/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const express = require('express');
module.exports.http = {

  middleware: {



    order: [
      'staticAsset',
      'cookieParser',
      'staticUpload',
      // 'fileUploaded',
      'session',
      'bodyParser',
      'compress',
      'logApiCall',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    staticAsset: express.static(process.cwd() + '/assets'),
    staticUpload: express.static(process.cwd() + '/upload/images'),
    logApiCall: (function () {
      return async function (req, res, next) {
        // req.setTimeout(40000);
        let method = req.method;
        let startTime = new Date().getTime();
        let logInfo = sails.helpers.plog.with({
          type: 1,
          content: `request-${req.url} - ${JSON.stringify(req.body)}`
        });
        res.on('finish', async () => {
          sails.helpers.plog.with({
            key: logInfo.key,
            type: 2,
            content: `request-${req.url}-done`
          })
          if (method !== 'OPTIONS') sails.log(method, res.statusCode, req.url, `[${new Date().getTime() - startTime}]`);
        })
        return next();
      }
    })(),

    bodyParser: (function _configureBodyParser() {
      var skipper = require('skipper');
      var middlewareFn = skipper({ strict: true, maxTimeToBuffer: 10000, limit: '20mb' });
      return middlewareFn;
    })(),


  },

};
