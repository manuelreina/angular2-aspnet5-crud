module.exports = function (grunt) {
    grunt.config(['sw-precache', 'dist'], {
        staticFileGlobs: [
				'dist/*.css',
                'dist/*.js',
        ]
    });

}