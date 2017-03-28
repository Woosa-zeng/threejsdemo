var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

var servers = function(){
    connect.server({
    	/*dev下使用dist,build下切换root*/
        root: ['dist'], 
        port: 8000,
        livereload: true
    });
};
module.exports= servers;
