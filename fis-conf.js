//编译src里面所有文件
fis.match(/^\/src\/(.*)/i,{ //src下所有文件，src可自定义
    release: './$1'  //./为根目录，也就是www目录，$1为根目录下第一个文件
});

fis.match('/src/css/*.less/', {
    //fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
});

//启用 fis-spriter-csssprites 插件
fis.match('::package', {    
    postpackager: fis.plugin('loader'),//文件的合并
    spriter: fis.plugin('csssprites') //css的合并
});

//{}去匹配多个规则,中间用,隔开
fis.match('{css/global.less,css/main.less}',{
    packTo: 'css/pkb.css'
});

//fis只有针对png压缩
fis.match('/src/**.png',{ 
    optimizer: fis.plugin('png-compressor',{
        type: 'pngquant'
    })
});

//对CSS进行图片合并
fis.match('{**.less,**.css}',{
    useSprite: true
});

//把所有css下png编译后放在images的根目录下
fis.match('/css/(*.png)',{ //此处为编译之后，也就是在www下
    release: './images/$1'
});

//把除html外所有放到cdn下
// fis.match('!*.html',{
//     domain: 'http://baidu.com'
// });
//不输出以下文件
fis.match('{fis-conf.js,gulpfile.js,abc.json,package.json}', {
    release: false
});
//压缩JS
fis.match('*.{js,jsx,ts,tsx,es6,es}', {
  optimizer: fis.plugin('uglify-js')
});
//压缩CSS
fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

//加MD5时间戳
fis.match('*.{js,css,png}', {
  useHash: true
});
//配置demo环境
fis.media('demo').match('*',{
  useHash:false,
  optimizer:null,
  useSprite:false,
  packTo:false,
  domain:false
});

//配置debug环境
// fis.media('debug').match('*',{

// });
