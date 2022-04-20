
const fs = require('fs')
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

const isTransform = ({ path }) => /\.jsx?$/.test(path) && !path.endsWith('.d.ts')

const createTask = options => {
    const { src, tsConfig, dest, type, cwd } = options
    const babelConfig = getBabelConfig({ type })
    rm(path.relative(cwd, dest))
    return () => {
        gulp
            .src(src)
            .pipe(gulpTs(tsConfig))
            .pipe(gulpIf(isTransform, gulpBabel(babelConfig)))
            .pipe(gulp.dest(dest))
    }
}

const build = async tasks => {
    const series = gulp
        .series(...tasks)
        .on('end', res => {
            console.log('res => ', res)
        })
        .on('error', err => {
            console.log('err => ', err)
        })
    const build = gulp
        .parallel(series)
    build()
}

module.exports = {
    parseTsConfig,
    parseConfig,
    createTask,
    build,
}
