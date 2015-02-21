module.exports = function (grunt) {
  var path = require('path');
  grunt.initConfig({
    'build-atom-shell': {
      tag: 'v0.21.2',
      buildDir: 'build/atom-shell',
      projectName: 'KappaVision',
      productName: 'KappaVision'
    },
    'download-atom-shell': {
      version: '0.21.2',
      outputDir: 'build/atom-shell-prebuilt'
    },
    shell: {
      runWindows: {
        command: ".\\build\\atom-shell-prebuilt\\atom --remote-debugging-port=9999 ./"
      },
      runOSX: {
        command: "./build/atom-shell-prebuilt/Atom.app/Contents/MacOS/Atom --remote-debugging-port=9999 ./"
      }
    },
    ts: {
      client: {
        src: ['client/src/**/*.ts', 'client/defs/*.d.ts'],
        dest: 'client/src/app.js'
      }
    },
    less: {
      client: {
        src: 'client/src/main.less',
        dest: 'client/src/main.css'
      }
    },
    watch: {
      clientTS: {
        files: ['client/src/**/*.ts', 'client/defs/*.d.ts'],
        tasks: ['ts:client']
      },
      clientLess: {
        files: ['client/src/main.less'],
        tasks: ['less:client']
      }
    }
  });

  // For compiling it
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ts');
  // For running it
  grunt.loadNpmTasks('grunt-shell');
  // Get the shell itself (building takes AGES)
  grunt.loadNpmTasks('grunt-build-atom-shell');
  grunt.loadNpmTasks('grunt-download-atom-shell');
};