module.exports = {
    options: {
        cacheId: 'angular-universal',
        workerFileName: 'sw.js',
        baseDir: 'wwwroot',
        verbose: true,
    },
    'default': {
        staticFileGlobs: [
            'dist/*.css',
            'dist/*.js',
        ],
    },
}