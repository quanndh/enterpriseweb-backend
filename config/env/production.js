/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {


  hooks: {
    morgan: false
  },
  uploads: {
    adapter: require('skipper-disk')
  },
  datastores: {
    default: {
      apdapter: "sails-mysql",
      url: "mysql://J7ygjPhALe:IHXytPbKRf@remotemysql.com:3306/J7ygjPhALe"
    },

  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },


  security: {
    cors: {
      allRoutes: true,
      allowOrigins: 'https://tutoring-client.herokuapp.com/',
      allowCredentials: true,
      allowRequestHeaders: 'Content-Type, Accept,Authorization',
      allowRequestMethods: 'GET, POST, PUT,PATCH,DELETE',
      "Access-Control-Allow-Origin": 'https://tutoring-client.herokuapp.com/'
    },

  },


  session: {


    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },


  sockets: {


    onlyAllowOrigins: [
      'https://tutoring-client.herokuapp.com/'
    ],


    log: {
      level: 'debug'
    },


    http: {

      cache: 365.25 * 24 * 60 * 60 * 1000, // One year


      // trustProxy: true,

    },


    // port: 4787,


    // ssl: undefined,


    custom: {
      baseUrl: 'https://xtutoring.herokuapp.com/',
      internalEmailAddress: 'support@example.com',
    },


  }
};
