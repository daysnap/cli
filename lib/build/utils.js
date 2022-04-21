
const path = require('path')
const ts = require('typescript')
const merge = require('deepmerge')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpBabel = require('gulp-babel')
const gulpTs = require('gulp-typescript')
const gulpSass = require('gulp-sass')(require('sass'))
const gulpCssnano = require('gulp-cssnano')
const through = require('through2');

const { readFileSync, isExists, sleep, rm } = require('../../utils/helper')

const parseTsConfig = async options => {
    const { cwd } = options
    const filepath = `${cwd}/tsconfig.json`
    const getTsConfig = filepath => {
        let { error, config } = ts.readConfigFile(filepath, readFileSync)
        if (error) throw error
        if (config.extends) {
            const filepath = path.relative(cwd, config.extends)
            delete config.extends
            config = merge(config, getTsConfig(filepath))
        }
        return config
    }
    return await isExists(filepath) ? getTsConfig(filepath) : {}
}

const getBabelConfig = options => {
    const { type } = options
    return {
        presets: [
            require.resolve('@babel/preset-typescript'),
            [ require.resolve('@babel/preset-env'), { modules: type === 'esm' ? false : 'auto' } ],
            require.resolve('@babel/preset-react'),
        ],
        plugins: [
            [
                require.resolve('@babel/plugin-transform-runtime'),
                { useESModules: type === 'esm', version: require('@babel/runtime/package.json').version }
            ],
            require.resolve('@babel/plugin-proposal-class-properties'),
        ]
    }
}

const parseConfig = async options => {
    await sleep()
    const { cfg, cwd } = options
    const filepath = cfg ? path.relative(cwd, cfg) : `${cwd}/.dscrc.js`
    return require(filepath)
}

const isTsFile = ({ path }) => /\.tsx?$/.test(path) && !path.endsWith('.d.ts')

const isTransform = ({ path }) => /\.(t|j)sx?$/.test(path) && !path.endsWith('.d.ts')

const isSassFile = ({ path }) => /\.s(a|c)ss$/.test(path)

const isStyleJs = ({ path }) => path.match(/(\/|\\)style(\/|\\)index\.js/)

const createTask = options => {
    const { src, tsConfig, dest, type, cwd } = options
    const babelConfig = getBabelConfig({ type })
    return () => new Promise((resolve, reject) => {
        // 删除目标文件
        rm(path.relative(cwd, dest))
        console.log('type => ', type)
        // 设置环境变量
        process.env.BABEL_ENV = type
        gulp.src(src)
            .pipe(gulpIf(isTsFile, gulpTs(tsConfig.compilerOptions)))
            .pipe(gulpIf(isTransform, gulpBabel(babelConfig)))
            .pipe(gulpIf(isSassFile, gulpSass()))
            .pipe(gulpIf(isSassFile, gulpCssnano({ zindex: false, reduceIdents: false })))
            .pipe(gulpIf(isStyleJs, through.obj(function (file, encoding, next) {
                this.push(file.clone())
                const content = file.contents.toString(encoding)
                const cssInjection = content => content
                    .replace(/\/style\/?'/g, "/style/css'")
                    .replace(/\/style\/?"/g, '/style/css"')
                    .replace(/\.scss/g, '.css')
                file.contents = Buffer.from(cssInjection(content))
                file.path = file.path.replace(/index\.js/, 'css.js')
                this.push(file)
                next()
            })))
            .pipe(gulp.dest(dest))
            .on('end', resolve)
            .on('error', reject)
    })
}

const build = async tasks => {
    for (let i = 0, len = tasks.length; i < len; i++) {
        await tasks[i]()
    }
}

module.exports = {
    parseTsConfig,
    parseConfig,
    createTask,
    build,
}
