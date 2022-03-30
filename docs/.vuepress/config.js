
// 主要配置参考 => https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
module.exports = {
    title: 'DaySnap CLI',
    description: 'One Day One Snap',
    base: '/',
    dest: 'dist',
    host: '0.0.0.0',
    port: '12580',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    plugins: [
        '@vuepress/nprogress',
    ],
    themeConfig: {
        logo: '/img/logo.png',
        repo: 'daysnap/daysnap-cli',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        smoothScroll: true,
        nav: [
            { text: '指南', link: '/guide/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '指南',
                    collapsable: false,
                    link: '/guide/',
                    children: [
                        '',
                        'command',
                    ]
                },
                '/guide/develop',
            ]
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': '/'
            }
        }
    },
}



