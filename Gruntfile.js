'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    public: 'dist/public',
    express_dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '{.tmp,<%= yeoman.app %>}/referenceData/{,*/}*.json',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.express_dist %>/*',
            '!<%= yeoman.express_dist %>/.git*'
          ]
        }]
      },
      quick_dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.express_dist %>/*',
            '!<%= yeoman.express_dist %>/.git*',
            '!<%= yeoman.express_dist %>/node_modules'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'config/karma.unit.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.public %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.public %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.public %>/{,*/}*.html'],
      css: ['<%= yeoman.public %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.public %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.public %>/images'
        }]
      }
    },
    cssmin: {
      options: {
        report: 'gzip'
      },
      dist: {
        files: {
          '<%= yeoman.public %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
//          removeCommentsFromCDATA: false,
//////          https://github.com/yeoman/grunt-usemin/issues/44
//          collapseWhitespace: false,
//          collapseBooleanAttributes: false,
//          removeAttributeQuotes: false,
//          removeRedundantAttributes: false,
//          useShortDoctype: false,
//          removeEmptyAttributes: false,
//          removeOptionalTags: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.public %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.public %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.public %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.public %>/scripts'
        }]
      }
    },
    uglify: {
      options: {
        report: 'gzip'
        , mangle: false
        , preserveComments: true
        , beautify: true
      },
      dist: {
        files: {
          '<%= yeoman.public %>/scripts/scripts.js': [
            '<%= yeoman.public %>/scripts/scripts.js'
          ]
        }
      }
    },
    'install-dependencies': {
      options: {
        cwd: '<%= yeoman.express_dist %>'
        , stdout: true
        , stderr: true
        , failOnError: true
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.public %>/scripts/{,*/}*.js',
            '<%= yeoman.public %>/styles/{,*/}*.css',
            '<%= yeoman.public %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.public %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.public %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'referenceData/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
            , '*.html', 'views/*.html'
          ]
        },
        {
          expand: true,
          dest: '<%= yeoman.express_dist %>',
          cwd: 'heroku',
          src: ['**/*', '.gitignore'],
          rename: function (dest, src) {
            var path = require('path');
            if (src === 'distpackage.json') {
              return path.join(dest, 'package.json');
            }
            return path.join(dest, src);
          }
        }]
      },
      quick_dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.public %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'referenceData/**/*',
            'images/{,*/}*.*',
            'styles/fonts/*'
            , '*.html', 'views/*.html', 'template/{,*/}*.html'
            , 'scripts/{,*/}*.*'
          ]
        },
        {
          expand: true,
          dot: true,
          dest: '<%= yeoman.express_dist %>',
          cwd: 'heroku',
          src: ['**/*', '.gitignore'],
          rename: function (dest, src) {
            var path = require('path');
            if (src === 'distpackage.json') {
              return path.join(dest, 'package.json');
            }
            return path.join(dest, src);
          }
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

//  var exec = require('child_process').exec;
//
//  grunt.registerTask('install-dependencies', 'Installs npm dependencies.', function () {
//    var cb, options, cp;
//
//    cb = this.async();
//    options = this.options({
//      cwd: '',
//      stdout: true,
//      stderr: true,
//      failOnError: true
//    });
//    cp = exec('npm install', {cwd: options.cwd}, function (err, stdout, stderr) {
//      if (err && options.failOnError) {
//        grunt.warn(err);
//      }
//      cb();
//    });
//
//    grunt.verbose.writeflags(options, 'Options');
//
//    if (options.stdout || grunt.option('verbose')) {
//      console.log("Running npm install in: " + options.cwd)
//      cp.stdout.pipe(process.stdout);
//    }
//
//    if (options.stderr || grunt.option('verbose')) {
//      cp.stderr.pipe(process.stderr);
//    }
//  });


  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
//    'jshint',
//    'test',
    'coffee',
    'compass:dist',
//    'useminPrepare',
    'imagemin',
    'cssmin',
//    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'uglify',
//    'rev',
//    'usemin'
    , 'install-dependencies'
  ]);

  grunt.registerTask('quick', [
    'clean:quick_dist',
//    'jshint',
//    'test',
    'coffee',
    'compass:dist',
//    'useminPrepare',
//    'imagemin',
    'cssmin',
//    'htmlmin',
//    'concat',
    'copy:quick_dist',
    'cdnify',
    'ngmin',
//    'uglify',
//    'rev',
//    'usemin'
//    , 'npm_install'
    , 'install-dependencies'
  ]);

  grunt.registerTask('default', ['build']);
  grunt.registerTask('inst', ['install-dependencies']);
};
