module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        src: ['vendor/modernizr/modernizr.js', 'vendor/jquery/jquery.js', 'vendor/foundation/js/foundation/foundation.js', 'vendor/foundation/js/foundation/foundation.topbar.js', 'vendor/foundation/js/foundation/foundation.alerts.js', 'vendor/foundation/js/foundation/foundation.tooltips.js', 'vendor/picturefill/external/matchmedia.js', 'vendor/picturefill/picturefill.js', 'vendor/iosSlider/_src/jquery.iosslider.js', 'vendor/jquery.transit/jquery.transit.js', 'vendor/swiper/idangerous.swiper-1.9.js', 'vendor/fastclick/fastclick.js', 'js/main.js'],
        dest: 'js/main.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    watch: {
      html: {
        files: ['*.html', '**/*.html', '**/**/*.html'],
        tasks: ['watch_html']
      },
      scripts: {
        files: ['*.js', '**/*.js'],
        tasks: ['watch_scripts']
      },
      css: {
        files: [
          'sass/*',
          'vendor/fontawesome/sass/**'
        ],
        tasks: ['watch_css']
      }
    },
    shell: {
      jekyll_build: {
        command: 'jekyll build',
        options: {
          stdout: true
        }
      },
      compass_compile: {
        command: 'compass compile',
        options: {
          stdout: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    jekyll: {
      serve: {
        options: {
          src : '<%= app %>',
          serve: true,
          watch: true,
          config: '_config.yml'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('watch_scripts', ['concat', 'uglify', 'shell:jekyll_build']);
  grunt.registerTask('watch_css', ['shell:compass_compile', 'shell:jekyll_build']);
  grunt.registerTask('watch_html', ['shell:jekyll_build']);
  grunt.registerTask('compile_css', ['compass', 'shell:jekyll_build']);
  grunt.registerTask('jekyll_build', ['shell:jekyll_build']);
  grunt.registerTask('jekyll_serve', ['jekyll:serve']);
  grunt.registerTask('default', ['watch:css', 'watch:scripts', 'watch:html']);
};
