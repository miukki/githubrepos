'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var env = grunt.option('env') || 'dev';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    gruntConfig: grunt.file.readJSON('gruntConfig.json'),
    projectConfig: grunt.file.readJSON('projectConfig.json'),
    ext: '{html,tmpl}',
    tmplsPath: '<%= gruntConfig.app.src%>/tmpls',

    clean: {
      tmp: {
        src: ['<%= gruntConfig.app.tmp %>']
      },
      generated: {
        src: ['<%= gruntConfig.app.generated %>']
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      js: {
        src: ['<%= gruntConfig.app.src %>/index.html'],
        ignorePath:  /\.\.\//,
        exclude: [/bootstrap-sass|jquery/]
      },
      sass: {
        src: ['<%= gruntConfig.app.src %>/styles/{,*/}*.{scss,sass}'],
        //ignorePath: /(\.\.\/){1,2}bower_components\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        exclude: [/bootstrap-sass|jquery/]

      }

    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: {
        src: [
          '<%= gruntConfig.app.src %>/scripts/{,*/}*.js',
          '!<%= gruntConfig.app.src %>/scripts/generated/*.js'
        ]
      },
      gruntfile: {
        src: [
          'Gruntfile.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      app: {
        src: [
          '<%= gruntConfig.app.src %>/scripts/{,*/}*.js',
          '!<%= gruntConfig.app.src %>/scripts/generated/*.js'
        ]
      },
      gruntfile: {
        src: [
          'Gruntfile.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        tasks: ['newer:jshint:app', 'newer:jscs:app'],
        files: ['<%= gruntConfig.app.src %>/scripts/**/*.js', '!<%= gruntConfig.app.src %>/scripts/generated/*.js'],
        options: {
          livereload: '<%= connect.options.livereload %>',
	        livereloadOnError: false
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jshint:gruntfile', 'newer:jscs:gruntfile'],
      },
      tmpls: {
        files: [
          '<%= tmplsPath %>/**/*.<%= ext %>'
        ],
        tasks: [
          'loadRules:htmlhint',
          'newer:htmlhint:tmpls',
          'newer:jsbeautifier:tmpls',
          'newer:ngtemplates'
        ],
        options: {
          livereload: '<%= connect.options.livereload %>',
	        livereloadOnError: false
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        tasks: [],
        files: [
          '<%= gruntConfig.app.src %>/index.html'
        ]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },


    // for html
    jsbeautifier: {
      options: {
        mode: 'VERIFY_AND_WRITE', //VERIFY_ONLY
        //config: 'path/to/config/file',
        css: {
          indentChar: ' ',
          indentSize: 4
        },
        html: {
          braceStyle: 'collapse',
          indentChar: ' ',
          indentScripts: 'keep',
          indentSize: 2,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
          wrapLineLength: 0,
          fileTypes: ['.html', '.tmpl', 'tmpl']
        }
      },
      tmpls: {
        src: [
          '<%= tmplsPath %>/**/*.<%= ext %>'
        ]
      }

    },

    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      tmpls: {
        options: {
          'doctype-first': false,
          'count-of-signle-quotes-equals-no-accept-odd-number': true
        },
        src: [
	        '<%= tmplsPath %>/**/*.<%= ext %>'
        ]
      }
    },


    sass: {
      options: {
        style: 'compact'
      },
      dist: {
        files: [{
          expand: true,
          cwd:  '<%= gruntConfig.app.src %>/styles/',
          src: ['*.scss'],
          dest: '<%= gruntConfig.app.tmp %>/css/',
          ext: '.css'
        }]
      }
    },


    autoprefixer: {
        options: {
            browsers: ['last 2 versions', 'ie 9', 'ff 10']
        },
        production: {
            expand: true,
            flatten: true,
            src: '<%= gruntConfig.app.tmp %>/css/*.css',
            dest: '<%= gruntConfig.app.tmp %>/css/'
        }
    },

    connect: {
      options: {
        hostname: 'localhost',
        base: ['.'],
        port: 9000,
        debug: true,
        useAvailablePort: true,
        middleware: function(){},
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(){}
        }
      }

    },

    ngconstant: {
      dist: {
        options: {
          name: 'Constant',
          dest: '<%= gruntConfig.app.generated %>/constants.js',
          //wrap: '\'use strict\';\n\n{%= __ngModule %}',
          space: '  ',
          constants: {
            Constant: {
              timeToLive: 60*60*1000,
              API: 'https://' + '<%= projectConfig.config.api.'+env+' %>',
              config: '<%= projectConfig.config %>'

            }
          }
        }
      }
    },

    //rollbar
    processhtml: {
      rollbar: {
        options: {
          process: true,
          data: {
            rollbarAccessToken: '',
            git_sha: '',
            env: env
          }
        },
        files: {
          '<%= gruntConfig.app.generated %>/rollbar.js': '<%= gruntConfig.app.src %>/scripts/rollbar.js'
        }
      }
    },

    ngtemplates: {
      options: {
        htmlmin:  {
          collapseWhitespace: true
        },

        standalone: true
      },

      main: {
        options: {
	        url: function(url) {
		        if (/tmpls/.test(url)) {
              return url.replace(new RegExp('^'+grunt.config.get('tmplsPath')+'/'), '');
		        }
		        return url;
	        },

	        module: 'Tmpls'

        },
        cwd: '.',
        src:  [
	        '<%= tmplsPath %>/**/*.<%= ext %>'
        ],
        dest:  '<%= gruntConfig.app.generated %>/tmpls.js'
      }


    },

    prettify: {
      options: {
        indent: 2,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
      },
      html: {
        expand: true,
        cwd: '<%= gruntConfig.app.src %>',
        src: ['index.html'],
        ext: '.html',
        dest: '<%= gruntConfig.app.src %>'
      }
    }


  });



  grunt.registerTask('server', 'Run local server', function(arg1, arg2) {
    //clean
    grunt.task.run(['clean:tmp']);

    //css
    grunt.task.run(['wiredep:sass', 'sass:dist', 'autoprefixer']);

    //js build
    grunt.task.run([
      'clean:generated',
      'ngconstant',
      'wiredep:js',
      'ngtemplates',
      'setMiddleware',
      'connect:livereload',
      'watch'
      //'concurrent:monitor'
    ]);

  });


    grunt.task.registerTask('setMiddleware', 'set middleware', function(target) {


    //server
    var middleware = function(connect, options, middlewares) {

	    var modRewrite = require('connect-modrewrite');
	    var serveStatic = require('serve-static');
      return [].concat([].concat(
        connect().use('/',serveStatic('./app'))
      ), [
        modRewrite(target !== 'dist' ? [
          'tmp .tmp [L]',
          'modules .tmp/scripts/modules [L]',
          'scripts app/scripts [L]',
          'data app/data [L]',
          'css .tmp/css [L]',
          'images .tmp/images [L]',
          'fonts/bootstrap ./bower_components/bootstrap-sass/assets/fonts/bootstrap [L]'
      ] : [])
      ], middlewares, [
        /*

         serveStatic('.tmp'),
          connect().use(
            '/bower_components',
            serveStatic('./bower_components')
          ),
          connect().use(
            '/scripts',
            serveStatic('./app/scripts')
          ),
         serveStatic('./app')

        */

      ]);


    }.bind(arguments);


      grunt.config.set('connect.livereload.options.middleware', middleware);

      //grunt.task.run(['connect:livereload', 'watch']);

    });


  grunt.registerTask('test:unit', 'Setup env for Unit test, Run Unit test', function(arg1, arg2) {

    //clean
    grunt.task.run(['clean:generated']);

    //setup assets for unit tests
    grunt.task.run([
      'wiredep:test',
      'ngconstant',
      'ngtemplates'

    ]);

    //run karma
    grunt.task.run(['karma']);

  });

  grunt.registerTask('loadRules:htmlhint', '', function() {
    require('./htmlhint-rules/count-of-signle-quotes-equals-no-accept-odd-number').init();
  });

  grunt.registerTask('test', ['test:unit']);

  grunt.registerTask('lint', [
    'prettify',
    'jshint',
    'jscs'
  ]);


};
