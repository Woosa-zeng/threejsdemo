var gulp = require('gulp');
var exec = require('gulp-exec');
var clean = require('gulp-clean');
var abc = require('./abc.json');
var process = require('child_process'); //node子进程，为解决-w不打印日志
var _process = require('process');
var output = abc.output;
var os = require('os'); //判断系统的OS包

var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
};
var reportOptions = {
	err: true, // default = true, false means don't write err 
	stderr: true, // default = true, false means don't write stderr 
	stdout: true // default = true, false means don't write stdout 
};


//mac下 ; 分隔   win下 & 分隔
//启动demo环境 
var demoExec = 'fis3 server clean ; fis3 release demo ; fis3 server start -p '+ abc.port +' ; fis3 release demo1 -wL';
var demoExecWin = 'fis3 server clean & fis3 release demo & fis3 server start -p '+ abc.port +' & fis3 release demo1 -wL';
//启动debug环境
var debugExec = 'fis3 server clean ; fis3 release debug ; fis3 server start -p '+ abc.port +' ; fis3 release debug1 -wL';
var debugExecWin = 'fis3 server clean & fis3 release debug & fis3 server start -p '+ abc.port +' & fis3 release debug1 -wL';
var platform = os.type();

gulp.task('demo',function(cb){
	//判断是win还是mac
	var _exec = platform == 'Windows_NT' ? demoExecWin : demoExec;
	var ls = process.exec(_exec, function(stdout,stderr){
		cb(); //回调，让结束 或者return
	});

	//监听打印
	ls.stdout.on('data',function(data){
		_process.stdout.write(data);
	});
	ls.stderr.on('data',function(data){
		_process.stdout.write('stderr: '+ data);
	});
	
});

// debug环境
gulp.task('debug', function(cb){
	var _exec = platform == 'Windows_NT' ? debugExecWin : debugExec;
	var ls = process.exec(_exec, function(stdout,stderr){
		cb();
	});

	//监听打印
	ls.stdout.on('data',function(data){
		_process.stdout.write(data);
	});
	ls.stderr.on('data',function(data){
		_process.stdout.write('stderr: '+ data);
	});
});

gulp.task('output', function(cb){
	//构建任务
	//Build需要清除已有文件 gulp-clean
	gulp.src('./abc.json',{read:false})
		.pipe(exec('fis3 release -d ' + output, options))
		.pipe(exec.reporter(reportOptions));
	cb();

});


//清除build文件，如果build文件夹不存在会报错，所以需要先输出一次再清除，再生成

gulp.task('clean',function(cb){
	gulp.src(output, {read: false})
		.pipe(clean());
	cb();
});

//用series,gulp4.0以上 ,先输出一次，再清除，再生成
gulp.task('build',gulp.series('output','clean','output'));