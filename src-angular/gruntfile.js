/// <vs BeforeBuild='Build_dev' />
module.exports = function (grunt) {

    //#region private global variables

    //#endregion private variables



    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt);


    //laad project tasks
    grunt.loadTasks('grunt/tasks');


}