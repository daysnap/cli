
const path = require('path')
const ts = require('typescript')
const merge = require('deepmerge')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpBabel = require('gulp-babel')
const gulpTs = require('gulp-typescript')

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
        ],
        plugins: [
            [
                require.resolve('@babel/plugin-transform-runtime'),
                { useESModules: type === 'esm', version: require('@babel/runtime/package.json').version }
            ]
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

const isTransform = ({ path }) => !path.endsWith('.d.ts')

const createTask = options => {
    const { src, tsConfig, dest, type, cwd } = options
    const babelConfig = getBabelConfig({ type })
    return new Promise((resolve, reject) => {
        // 删除目标文件
        rm(path.relative(cwd, dest))
        // 设置环境变量
        process.env.BABEL_ENV = type
        gulp.src(src)
            .pipe(gulpIf(isTsFile, gulpTs(tsConfig.compilerOptions)))
            .pipe(gulpIf(isTransform, gulpBabel(Object.assign(babelConfig))))
            .pipe(gulp.dest(dest))
            .on('end', resolve)
            .on('error', reject)
    })
}

const build = async tasks => {
    for (let i = 0, len = tasks.length; i < len; i++) {
        await tasks[len]
    }
}

module.exports = {
    parseTsConfig,
    parseConfig,
    createTask,
    build,
}
