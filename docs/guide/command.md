
# 命令

::: tip
提供给开发者的使用命令。
:::

[[toc]]


## 基础

命令行执行 `dsc` 即可出现帮助信息

```
Usage: dsc <command> [options]

Options:
  -v, --version      查看版本信息
  -h, --help         显示命令帮助

Commands:
  create [options]   创建项目
  npm [options]      快速切换 npm 源
  publish [options]  发布 npm 包，会自动默认处理 version 版本
  help [command]     显示命令帮助

  执行 dsc <command> -h 查看指定命令的使用方法.
```

### 查看版本

`dsc -v` 或 `dsc --version`

```
@daysnap/cli 1.0.0
```

### 查看帮助

- `dsc -h` 或 `dsc help` 命令效果跟 `dsc` 一致

- `dsc help [command]` 或 `dsc npm -h` 显示指定命令帮助，例如 `dsc help npm`

    ```
    Usage: dsc npm [options]

    快速切换 npm 源

    Options:
    -l, --list        列出当前支持的 npm 源
    -u, --use <name>  切换 npm 源
    -h, --help        显示命令帮助
    ```


## 切换 npm 源

> `dsc npm [options]`

- `dsc npm -h` 查看帮助信息

    ```
    Usage: dsc npm [options]

    快速切换 npm 源

    Options:
    -l, --list        列出当前支持的 npm 源
    -u, --use <name>  切换 npm 源
    -h, --help        显示命令帮助
    ```

- `dsc npm -l` 列出当前支持的 npm 源

    ```
    ✔ 查询完成，支持的源如下：

    npm ---------- https://registry.npmjs.org/
    yarn --------- https://registry.yarnpkg.com/
    tencent ------ https://mirrors.cloud.tencent.com/npm/
    cnpm --------- https://r.cnpmjs.org/
    taobao ------- https://registry.npmmirror.com/
    npmMirror ---- https://skimdb.npmjs.com/registry/
    ```

- `dsc npm -u <name>` or `dsc npm --use <name>` 切换对应源

    ```
    # dsc npm -u taobao
    ✔ 切换源 taobao => https://registry.npmmirror.com/ 完成.
    ```


## 发布 npm 包

> `dsc publish [options]`

- `dsc publish -h` 查看帮助信息

    ```
    Usage: dsc publish [options]

    发布 npm 包，会自动默认处理 version 版本

    Options:
    -r, --registry <registry>  指定发布源
    -v, --version <version>    指定发布的对应版本
    -h, --help                 显示命令帮助
    ```

- `dsc publish` 发布项目包

    + `dsc publish -r` 指定发布到对应源

    + `dsc publish -v` 指定发布对应版本


## 创建项目

> `dsc create <app-name> -t <template>`

- `dsc create -h` 查看帮助信息

    ```
    Usage: dsc create <app-name> -t <template>

    创建项目

    Options:
    -t, --template <template>  指定项目模板
    -l, --list                 当前的模板列表
    -u, --username <username>  指定组织或用户
    -h, --help                 显示命令帮助
    ```

- `dsc create -l` 列出当前模板列表

    ```
    ✔ 查询模板列表完成，模板如下：

    1. mini-program ---- 微信小程序
    2. ...
    ```

- `dsc create text-app -t mini-program` 创建小程序项目
