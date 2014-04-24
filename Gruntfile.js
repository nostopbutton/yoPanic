'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

//var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
//var mountFolder = function (connect, dir) {
//    return connect.static(require('path').resolve(dir));
//};

module.exports = function (grunt) {
    // Load grunt tasks automatically
//  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
//        ,public_dist: 'dist/public'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: yeomanConfig,
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'lib/server.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server.js',
                    node_env: 'production'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
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
//                tasks: ['compass']
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.{html, png, ico}',
                    '{.tmp,<%= yeoman.app %>}/views/{,*//*}*.{html,jade,ejs}',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
//                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
//                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '{.tmp,<%= yeoman.app %>}/referenceData/{,*//*}*.json',
//                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
//                tasks: ['livereload']
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'lib/server.js',
                    'lib/**/*.{js,json}'
                ],
                tasks: ['newer:jshint:server', 'express:dev'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },


//        connect: {
//            options: {
//                port: 9000,
//                // Change this to '0.0.0.0' to access the server from outside.
//                hostname: 'localhost'
//            },
//            livereload: {
//                options: {
//                    middleware: function (connect) {
//                        return [
//                            lrSnippet,
//                            mountFolder(connect, '.tmp'),
//                            mountFolder(connect, yeomanConfig.app)
//                        ];
//                    }
//                }
//            },
//            test: {
//                options: {
//                    middleware: function (connect) {
//                        return [
//                            mountFolder(connect, '.tmp'),
//                            mountFolder(connect, 'test')
//                        ];
//                    }
//                }
//            },
//            dist: {
//                options: {
//                    middleware: function (connect) {
//                        return [
//                            mountFolder(connect, 'dist')
//                        ];
//                    }
//                }
//            }
//        },
//        open: {
//            server: {
//                url: 'http://localhost:<%= connect.options.port %>'
//            }
//        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: [ 'lib/{,*/}*.js']
            },
            all: [
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
            , test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            quick_dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp'
                            ,'<%= yeoman.dist %>/*'
                            ,'!<%= yeoman.dist %>/.git*'
//                            ,'!<%= yeoman.dist %>/public'
                            ,'!<%= yeoman.dist %>/node_modules'
                        ]
                    }
                ]
            },
            heroku: {
                files: [
                    {
                        dot: true,
                        src: [
                            'heroku/*',
                            '!heroku/.git*',
                            '!heroku/Procfile'
                        ]
                    }
                ]
            },
            server: '.tmp',
            serve: '.tmp'

        },



        // Automatically inject Bower components into the app
//        'bower-install': {
//            app: {
//                html: '<%= yeoman.app %>/views/index.html',
//                ignorePath: '<%= yeoman.app %>/'
//            }
//        },
        coffee: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/fonts',
                importPath: '<%= yeoman.app %>/components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: true
                , assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/public/images/generated'
                }
            },
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
//          '<%= yeoman.dist %>/public/scripts/scripts.js': [
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
//          '<%= yeoman.dist %>/public/scripts/scripts.js': [
//            '<%= yeoman.dist %>/public/scripts/scripts.js'
//          ]
//        }
//      }
//    },


        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/views/{,*/}*.html',
            options: {
                dest: '<%= yeoman.dist %>/public'
            }

//            }
//                [ '<%= yeoman.app %>/views/shop.html']
//            html: ['*.html', 'views/{,*/}*.html']
//            html: '<%= yeoman.app %>/index.html',
//            html: ['<%= yeoman.app %>/views/index.html',
//                '<%= yeoman.app %>/views/index.jade'],
//            options: {
//                dest: '<%= yeoman.dist %>/public'
//            }
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
                'imagemin:dist',
//               'svgmin',
                'htmlmin:dist'
            ],
            quick_dist: [
                'coffee',
                'compass:dist'
                ,'htmlmin:dist'
            ]
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.app %>/../imagemin'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/public/images'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
////                    removeComments: true,
////                    removeCommentsFromCDATA: true,
//                    // removeCDATASectionsFromCDATA: true,
//                    // https://github.com/yeoman/grunt-usemin/issues/44
//                    // collapseWhitespace: true,
                    collapseBooleanAttributes: true,
//                    removeAttributeQuotes: true, // This caused usemin to break
                    removeRedundantAttributes: true,
//                    // useShortDoctype: true,
                    removeEmptyAttributes: true
//                    // removeOptionalTags: true,
//                    // removeEmptyElements: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>/public'
                    }
                ]
            },
            deploy: {
                options: {
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/public',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>/public'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },
        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/public/scripts',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/public/scripts'
//                        cwd: '.tmp/concat/scripts',
//                        src: '*.js',
//                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>/public',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'components/**/*',
                            'referenceData/**/*',
                            'images/{,*/}*.{gif,webp}',
                            'fonts/*'
//                            , '*.html', 'views/{,*/}*.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/../imagemin',
                        dest: '<%= yeoman.dist %>/public/images',
                        src: ['{,*/}*']
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/public/images',
                        src: ['generated/*']
                    },
                    {
                        expand: true,
                        dest: '<%= yeoman.dist %>',
                        cwd: 'lib',
                        src: ['**/*', '.gitignore', '!bak'],
                        rename: function (dest, src) {
                            var path = require('path');
                            if (src === 'distpackage.json') {
                                return path.join(dest, 'package.json');
                            }
                            return path.join(dest, src);
                        }
                    }
//                    , {
//                        expand: true,
//                        dest: '<%= yeoman.dist %>',
//                        src: [
//                            'package.json',
//                            'server.js',
//                            'lib/**/*'
//                        ]
//                    }
                ]
            },
//            quick_dist: {
//                files: [
//                    {
//                        expand: true,
//                        dot: true,
//                        cwd: '<%= yeoman.app %>',
//                        dest: '<%= yeoman.dist %>/public',
//                        src: [
//                            '*.{ico,png,txt}',
//                            '.htaccess',
//                            'components/**/*',
//                            'referenceData/**/*',
//                            'images/{,*/}*.{gif,webp}',
//                            'fonts/*'
//                        ]
//                    },
//                    {
//                        expand: true,
//                        dot: true,
//                        dest: '<%= yeoman.dist %>',
//                        cwd: 'lib',
//                        src: ['**/*', '.gitignore'],
//                        rename: function (dest, src) {
//                            var path = require('path');
//                            if (src === 'distpackage.json') {
//                                return path.join(dest, 'package.json');
//                            }
//                            return path.join(dest, src);
//                        }
//                    }
//                ]
//            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Replace Google CDN references
        //        https://github.com/yeoman/generator-angular/issues/266
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/public/{,*/}*.html']
//                html: ['<%= yeoman.dist %>/views/*.html']
            }
        },

        cssmin: {
            options: {
                report: 'gzip'
            },
            dist: {
//                files: {
//                    '<%= yeoman.dist %>/public/styles/main.css': [
//                        '.tmp/styles/{,*/}*.css',
//                        '<%= yeoman.app %>/styles/{,*/}*.css'
//                    ]
//                }
            }
        },
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },
        // Concat
        concat: {
//            options: {
//                separator: ';'
//            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
//            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },


        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/public/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/public/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/public/images/*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/public/fonts/*'
                    ]
                }
            }
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/public/views/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/public/styles/{,*/}*.css'],
//            html: ['<%= yeoman.dist %>/views/{,*/}*.html',
//                '<%= yeoman.dist %>/views/{,*/}*.jade'],
//            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
//                dirs: ['<%= yeoman.dist %>/public']
                assetsDirs: ['<%= yeoman.dist %>/public']
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



        // https://github.com/ahutchings/grunt-install-dependencies
        'install-dependencies': {
            options: {
                cwd: '<%= yeoman.dist %>', stdout: true, stderr: true, failOnError: true
            }
        },




        karma: {
            unit: {
                configFile: 'config/karma.unit.conf.js',
                singleRun: true
            }
        }
    });

//    grunt.renameTask('regarde', 'watch');

//  grunt.registerTask('server', [
//    'clean:server',
//    'coffee:dist',
//    'compass:server',
//    'livereload-start',
//    'connect:livereload',
//    'open',
//    'watch'
//  ]);

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
        }

        grunt.task.run([
            'clean:server',
//            'bower-install',
            'concurrent:server',
            'autoprefixer',
            'express:dev',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
//        }
//
//        grunt.task.run([
//            'clean:server',
//            'concurrent:server',
//            'livereload-start',
//            'connect:livereload',
//            'open',
//            'watch'
//        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
//    'coffee',
//    'compass',
        'concurrent:test',
//        'connect:test',
        'autoprefixer',
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
//        'concat', // SWAPPED
//        'cssmin', // SWAPPED
//    'uglify',
        'copy',
//    'cdnify',
        'ngmin',
        'rev',
        'usemin'
        , 'install-dependencies'
    ]);

    grunt.registerTask('new-build', [
        'clean:dist'
//        ,'bower-install'
        ,'useminPrepare'
        ,'concurrent:dist'
        ,'autoprefixer'
        ,'concat'
//        ,'ngmin'
        ,'copy:dist'
//        ,'cdnify'
        ,'cssmin'
        ,'uglify'
        ,'rev'
        ,'usemin'
        ,'htmlmin:deploy'
        , 'install-dependencies'
    ]);

    grunt.registerTask('quick', [
        'clean:quick_dist'
//        ,'bower-install'
        ,'useminPrepare'
        ,'concurrent:quick_dist'
//        ,'autoprefixer'
       , 'concat'
//       , 'ngmin'
        ,'copy:dist'
//        ,'cdnify'
        ,'cssmin'
        ,'uglify'
        ,'rev'
        ,'usemin'
        ,'htmlmin:deploy'
        , 'install-dependencies'
    ]);

    grunt.registerTask('default', [
        'jshint',
//        'newer:jshint',
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
