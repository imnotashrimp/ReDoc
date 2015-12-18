module.exports = function (config) {
    var travis = process.env.TRAVIS;
    config.set({
        frameworks: ['phantomjs-shim', 'jspm', 'jasmine', 'sinon', 'should'],
        preprocessors: {
          'lib/**/!(*spec).js': ['babel', 'coverage']
        },
        babelPreprocessor: {
            options: {
                sourceMap: 'inline',
                "optional": [
                  "runtime",
                  "optimisation.modules.system",
                  "es7.decorators",
                  "es7.classProperties"
                ]
            },
            sourceFileName: function(file) {
              return file.originalPath;
            }
        },

        coverageReporter: {
            instrumenters: { isparta : require('isparta') },
            instrumenter: {
                'lib/**/!(*spec).js': 'isparta'
            },
            dir: 'coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'lcov'}
            ]
        },
        client: {
          chai: {
            truncateThreshold: 0
          }
        },
        //load angular dependencies and browser polyfills
        files: [
          'node_modules/zone.js/dist/zone-microtask.js',
          'node_modules/babel-polyfill/dist/polyfill.js',
          'node_modules/reflect-metadata/Reflect.js'
        ],

        jspm: {
            config: 'system.config.js',
            loadFiles: ['tests/**/*.spec.js', 'tests/helpers.js', 'lib/**/*.js'],
            serveFiles: ['tests/schemas/**/*.json', 'lib/**/*.{html,css}'],
            nocache: true
        },

        proxies: {
            '/tests/': '/base/tests/',
            '/lib/': '/base/lib/',
            '/jspm_packages/': '/base/jspm_packages/',
            '/node_modules/': '/base/node_modules/',
        },
        reporters: travis ? ['mocha', 'coverage', 'coveralls'] : ['mocha', 'coverage'],

        browsers: ['PhantomJS'],

        browserNoActivityTimeout: 60000
    });
}