<p align="center">
  <img alt="logo" src="https://avatars.githubusercontent.com/u/96568061?s=200&v=4" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">@daysnap/cli</h1>

<p align="center">重复性任务，丢给我来处理吧~~~</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@daysnap/cli">
     <img src="https://img.shields.io/npm/v/@daysnap/cli.svg" alt="npm version" />
  </a>
  <a href="https://npmcharts.com/compare/@daysnap/cli">
    <img src="https://img.shields.io/npm/dm/@daysnap/cli.svg">
  </a>
</p>


## 快速入门

> warning Node 版本要求： [Node.js](https://nodejs.org/zh-cn/) >= 12.0

### 安装

1. 你可以使用下列任一命令安装这个新的包：

   ```shell
   npm install -g @daysnap/cli
   # 或者
   yarn global add @daysnap/cli
   ```

2. 安装成功之后，就可以在命令行中访问 `dsc` 命令了

   ```shell
   dsc -v
   ```

<img src="https://github.com/daysnap/cli/blob/main/docs/commond.png?raw=true"/>


### 升级

如需升级全局的 Vue CLI 包，请运行：

```shell
npm update -g @daysnap/cli
# 或者
yarn global upgrade --latest @daysnap/cli
```



## 命令

### 基础

命令行执行 `dsc` 即可出现帮助信息

```bash
Usage: dsc <command> [options]

Options:
  -v, --version                   查看版本信息
  -h, --help                      显示命令帮助

Commands:
  config [options]                检查并修改配置
  create [options] [app-name]     创建项目
  husky [options]                 创建 git hooks
  npm [options]                   快速切换 npm 源
  oss [options] [input] [output]  glob 形式 oss
                                  上传文件，[input]需要上传的文件或文件夹，[output]的格式<:directory>[:accessKeyId][:accessKeySecret]]
  publish [options]               发布 npm 包，会自动默认处理 version 版本
  sync [names...]                 同步更新 npm 包到淘宝源，解决发布之后，淘宝源没有立即更新的问题。默认同步执行目录下
                                  package.json 的 name 包.
  help [command]                  显示命令帮助

  执行 dsc <command> -h 查看指定命令的使用方法.
```

### 查看版本

`dsc -v` 或 `dsc --version`

```bash
@daysnap/cli 0.0.16
```

### 查看帮助

- `dsc -h` 或 `dsc help` 命令效果跟 `dsc` 一致

- `dsc help [command]` 或 `dsc npm -h` 显示指定命令帮助，例如 `dsc help npm`

    ```bash
    Usage: dsc npm [options]

    快速切换 npm 源

    Options:
    -l, --list        列出当前支持的 npm 源
    -u, --use <name>  切换 npm 源
    -h, --help        显示命令帮助
    ```


### 切换 npm 源

> `dsc npm [options]`

- `dsc npm -h` 查看帮助信息

    ```bash
    Usage: dsc npm [options]

    快速切换 npm 源

    Options:
    -l, --list        列出当前支持的 npm 源
    -u, --use <name>  切换 npm 源
    -h, --help        显示命令帮助
    ```

- `dsc npm -l` 列出当前支持的 npm 源

    ```bash
    ✔ 查询完成，支持的源如下：

    npm ---------- https://registry.npmjs.org/
    yarn --------- https://registry.yarnpkg.com/
    tencent ------ https://mirrors.cloud.tencent.com/npm/
    cnpm --------- https://r.cnpmjs.org/
    taobao ------- https://registry.npmmirror.com/
    npmMirror ---- https://skimdb.npmjs.com/registry/
    ```

- `dsc npm -u <name>` or `dsc npm --use <name>` 切换对应源

    ```bash
    # dsc npm -u taobao
    ✔ 切换源 taobao => https://registry.npmmirror.com/ 完成.
    ```


### 发布 npm 包

> `dsc publish [options]`

- `dsc publish -h` 查看帮助信息

    ```bash
    Usage: dsc publish [options]

    发布 npm 包，会自动默认处理 version 版本

    Options:
      -r, --registry <registry>  指定发布源
      -v, --version <version>    指定发布的对应版本
      -m, --message <message>    提交内容
      -p, --push                 推送代码到GIT仓库
      -t, --tag [version]        指定tag版本，指定tag则默认会推送代码到git仓库
      -h, --help                 显示命令帮助
    ```

- `dsc publish` 发布项目包

  + `dsc publish -r` 指定发布到对应源

  + `dsc publish -v` 指定发布对应版本

  + `dsc publish -t` 推送代码到GIT仓库


### 创建项目

> `dsc create <app-name> -t <template>`

- `dsc create -h` 查看帮助信息

    ```
    Usage: dsc create [options] [app-name]

    创建项目

    Options:
      -t, --template <template>  指定项目模板
      -l, --list                 当前的模板列表
      -c, --cache                使用线下缓存模板
      -b, --branch <branch>      指定模板项目下不同分支，默认主分支
      -o, --orgname <orgname>    指定组织
      -d, --deposit <deposit>    指明使用 gitee 还是 github
      -u, --username <username>  指定用户
      -h, --help                 显示命令帮助

    ```

- `dsc create -l` 列出当前模板列表

    ```
    ✔ 查询模板列表完成，模板如下：

    1. chrome-extension ------------ 基于 react chrome extension 谷歌浏览器插件
    2. generate -------------------- 生成基准模板项目
    3. mini-program ---------------- 微信小程序
    4. mini-react-taro ------------- taro + react 搭建的各端小程序
    5. multi-page ------------------ 基于 webpack5 打包编译的多入口页面，适用于静态页、官网等项目
    6. react-antd ------------------ react + antd + typescript
    7. react-antd-admin ------------ react + antd + admin
    8. react-antd-pro-admin -------- react + antd + antd-pro + admin
    9. react-antd-tailwind --------- react + antd + tailwind + eslint + prettier
    10. vue3-elelment-plus-admin ---- 基于vue3 、element-plus 、vite 后台管理系统模板项目
    11. vue3-h5-webpack ------------- vue3 + webpack + eslint + prettier + vant
    12. vue3-horn-webpack ----------- vue3 + webpack + horn
    ```

- `dsc create text-app -t mini-program` 创建小程序项目


### husky git hooks

> `dsc husky [options]`

- `dsc husky -h` 查看帮助信息

    ```bash
    Usage: dsc husky [options]

    创建 git hooks

    Options:
      -f --force  如果有安装过，则强制覆盖
      --lock      是否锁定版本，采用本地配置的版本
      -h, --help  显示命令帮助
    ```


### oss 上传

> `dsc oss [options]`

- `dsc oss -h` 查看帮助信息

    ```bash
    Usage: dsc oss [options] [input] [output]

    glob 形式 oss上传文件，[input]需要上传的文件或文件夹，[output]的格式为:[<region><:bucket><:directory>[KeySecret]]

    Options:
      -c, --config <filepath>     指定配置文件
      -i, --ignore <filepath...>  忽略哪些目录、文件不需要上传，glob 形式
      -d, --dot                   是否匹配点文件
      -h, --help                  显示命令帮助
    ```


### config 配置管理

> `dsc config [options]`

- `dsc config -h` 查看帮助信息

    ```bash
    Usage: dsc config [options]

    检查并修改配置

    Options:
      -s, --set <path> <value>  修改配置
      -g, --get <path>          查询配置
      -d, --del <path>          删除配置
      -e, --edit                使用默认编辑器打开配置
      --json                    JSON 的形式展示配置
      -h, --help                显示命令帮助
    ```


### sync 包同步管理

> `dsc config [options]`

- `dsc config -h` 查看帮助信息

    ```bash
    Usage: dsc sync [options] [names...]

    同步更新 npm 包到淘宝源，解决发布之后，淘宝源没有立即更新的问题。默认同步执行目录下 package.json 的 name 包.

    Options:
      -h, --help  显示命令帮助
    ```



## 用到什么

- [commander](https://www.npmjs.com/package/commander)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [minimist](https://www.npmjs.com/package/minimist)
- [chalk](https://www.npmjs.com/package/chalk)
- [figlet](https://www.npmjs.com/package/figlet) [examples](http://www.figlet.org/examples.html)
- [ini](https://www.npmjs.com/package/ini)
- [ora](https://www.npmjs.com/package/ora)
- [shelljs](https://www.npmjs.com/package/shelljs)
- [module-alias](https://www.npmjs.com/package/module-alias)

## 注意

- [module-alias](https://www.npmjs.com/package/module-alias) 插件因为会影响修改 `package.json` 文件，所以特意备份了下源码，处理了这个问题


详情文档请移步 [这里](https://daysnap.github.io/cli/)
