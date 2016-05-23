module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**"],
        options: {
            module: 'commonjs',
            sourceMap: false
        }
      }
    },
    typedoc: {
        build: {
            options: {
                module: 'commonjs',
                target: 'es5',
                out: 'docs/typedoc/',
                name: 'Vocative',
                readme: 'README.md' 
            },
            src: ["**/*.ts", "!node_modules/**"]
        }
    },
    watch: {
        files: ["**/*.ts", "!node_modules/**"],
        tasks: ['ts']
    }
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask("default", ["ts", "typedoc", "watch"]);
};