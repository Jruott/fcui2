var cwd = __dirname;
var path = require( 'path' );

/**
 * 输入目录
 *
 * @type {string}
 */
exports.input = path.resolve(cwd);

/**
 * 输出目录
 *
 * @type {string}
 */
exports.output = path.resolve( cwd, 'build' );

/**
 * 排除文件pattern列表
 *
 * @type {Array}
 */
exports.exclude = [
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp',
    'node_modules',
    'dep',
    'demo',
    'test',
    'build',
    '.gitignore',
    '.gitreview',
    '.travis.yml',
    'edp-*.js',
    'FcBabelProcessor.js',
    'index.html',
    'karma.conf.js',
    'LICENSE',
    '*.json',
    '*.conf',
    '*.md',
    'test-main.js'
];


var moduleEntries = 'html,htm,phtml,tpl,vm,js';
var pageEntries = 'html,htm,phtml,tpl,vm';

/**
 * 获取构建processors的方法
 *
 * @return {Array}
 */
exports.getProcessors = function () {
    var FcBabelProcessor = require('./FcBabelProcessor');

    return [
        new FcBabelProcessor(),
        new LessCompiler( {
            files: [
                'src/css/main.less'
            ]
        } ),
        new CssCompressor(),
        new ModuleCompiler( {
            configFile: './module.conf',
            entryExtnames: moduleEntries
        } ),
        new JsCompressor({
            files: [
                'dist/fcui2.js'
            ],
            compressOptions: {
                warnings: false
            },
            sourceMapOptions: {
                enable: false
            }
        }),
        new OutputCleaner({
            files: [
                '*.less'
            ]
        })
    ];
};

/**
 * builder主模块注入processor构造器的方法
 *
 * @param {Object} processors
 */
exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};
