/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'test-proj',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    torii: {
      providers: {
        'google-oauth2-bearer': {
          apiKey: '950791375127-mujesd1t22u7343inodacbgp96v8lui9.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200',
        },
      }
    },

    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:4500",
    },

    'simple-auth-token': {
      serverTokenEndpoint: 'http://localhost:4500/get-token',
    },

    'simple-auth': {
      authorizer: 'simple-auth-authorizer:token'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
