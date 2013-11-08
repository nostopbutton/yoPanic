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
    public_dist: 'dist/public',
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
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
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
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
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
        fontsDir: '<%= yeoman.app %>/fonts',
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
    // not used since Uglify task does concat,
    // but still available if needed
//    concat: {
//      dist: {
//        files: {
//          '<%= yeoman.public_dist %>/scripts/scripts.js': [
//            '.tmp/scripts/{,*/}*.js',
//            '<%= yeoman.app %>/scripts/{,*/}*.js'
//          ]
//        }
//      }
//    },
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
//    uglify: {
//      options: {
//        report: 'gzip'
//        , mangle: false
//        , preserveComments: true
//        , beautify: true
//      },
//      dist: {
//        files: {
//          '<%= yeoman.public_dist %>/scripts/scripts.js': [
//            '<%= yeoman.public_dist %>/scripts/scripts.js'
//          ]
//        }
//      }
//    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.public_dist %>/scripts/{,*/}*.js',
            '<%= yeoman.public_dist %>/styles/{,*/}*.css',
            '<%= yeoman.public_dist %>/images/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.public_dist %>/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.public_dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.public_dist %>/{,*/}*.html'],
      css: ['<%= yeoman.public_dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.public_dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.public_dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.public_dist %>/images'
        }]
      }
    },
    cssmin: {
      options: {
        report: 'gzip'
      },
      dist: {
        files: {
          '<%= yeoman.public_dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    imageoptim: {
      magick_png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['/Users/Pete/dev/Sprites/MagickOut/shift']
      },
      sprite_png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['/Users/Pete/dev/Sprites/dressSprites/output/images_final_opt']
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.public_dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.public_dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.public_dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.public_dist %>/scripts'
        }]
      }
    },
    // https://github.com/ahutchings/grunt-install-dependencies
    'install-dependencies': {
      options: {
        cwd: '<%= yeoman.express_dist %>'
        , stdout: true
        , stderr: true
        , failOnError: true
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.public_dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'referenceData/**/*',
            'images/{,*/}*.{gif,webp}',
            'fonts/*'
            , '*.html', 'views/*.html', 'template/{,*/}*.html'
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
          dest: '<%= yeoman.public_dist %>',
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
    },
    concurrent: {
      server: [
        'coffee:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'compass'
      ],
      dist: [
        'coffee',
        'compass:dist',
//        'imagemin',
//        'svgmin',
        'htmlmin'
      ],
      quick_dist: [
        'coffee',
        'compass:dist'
      ]
    }
  });

  grunt.renameTask('regarde', 'watch');

//  grunt.registerTask('server', [
//    'clean:server',
//    'coffee:dist',
//    'compass:server',
//    'livereload-start',
//    'connect:livereload',
//    'open',
//    'watch'
//  ]);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
//    'coffee',
//    'compass',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
//    'jshint',
//    'test',
//    'coffee',
//    'compass:dist',
    'useminPrepare',
    'concurrent:dist',
//    'imagemin',
//    'htmlmin',
    'concat', // SWAPPED
    'cssmin', // SWAPPED
//    'uglify',
    'copy',
    'cdnify',
    'ngmin',
    'rev',
    'usemin'
    , 'install-dependencies'
  ]);

  grunt.registerTask('quick', [
    'clean:quick_dist',
    'useminPrepare',
    'concurrent:quick_dist',
    'concat',
    'cssmin',
    'copy:quick_dist',
    'cdnify',
    'ngmin',
//    'uglify', ??
    'rev',
    'usemin'
    , 'install-dependencies'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('optim_magick', [
    'imageoptim:magick_png'
  ]);

  grunt.registerTask('optim_sprites', [
    'imageoptim:sprite_png'
  ]);

//  grunt.registerTask('inst', ['install-dependencies']);
};
