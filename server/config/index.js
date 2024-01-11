const path = require('path');

const config = {
  appEnvironment: process.env.NODE_ENV,

  databaseUri: process.env.MONGODB_URI,

  port: process.env.PORT || 3000,

  siteUrl: process.env.SITE_URL,

  userUrl: process.env.USER_URL,

  cors: {
    whitelist: (process.env.CORS || '').split(' ').map((host) => {
      return new RegExp(host);
    }),

    credentials: true,

    origin: function (origin, callback) {
      if (typeof origin === 'undefined') return callback(null, true);

      for (let i = 0; i < config.cors.whitelist.length; i++) {
        const element = config.cors.whitelist[i];
        if (element.test(origin)) return callback(null, true);
      }

      callback(new Error(`Not allowed by CORS: "${origin}" not in "${config.cors.whitelist}"`));
    },
    optionsSuccessStatus: 200,
  },

  cache: {
    urlCacheOptions: {
      stdTTL: 60,
      checkperiod: 70,
      deleteOnExpire: true,
    },

    proxyCacheOptions: {
      stdTTL: 600, // 10 minutes
    },
  },
};

module.exports = config;
