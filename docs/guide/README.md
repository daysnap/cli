
# 介绍

::: tip
帮助前端开发者快速搭建项目、切换环境、发布依赖包，让其更专注于业务开发。该脚手架的源代码仓库请移步 [这里](https://github.com/daysnap/daysnap-cli) 查看。
:::

[[toc]]


## 概要

`@daysnap/cli` 是一个基于前端进行快速开发的完整系统，提供：

- 可随意切换 `npm` 源；

- 可交互式快速搭建项目；

- 可自动升级发布 `npm` 包；

- ...

> 更多功能后续会开发...


## 快速入门

::: warning Node 版本要求
需要 [Node.js](https://nodejs.org/zh-cn/) >= 12.0
:::

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

更多命令使用请移步 [这里](/03_前端H5_/02_脚手架/02_命令.html)


### 升级

如需升级全局的 Vue CLI 包，请运行：

```shell
npm update -g @daysnap/cli
# 或者
yarn global upgrade --latest @daysnap/cli
```
