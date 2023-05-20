import { defineConfig } from 'vitepress'
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right'

export default defineConfig({
    title: 'VueSurplus',
    description: 'A composition function toolset of vue3',
    lang: 'en-US',
    ignoreDeadLinks: true,
    base: '/vuesurplus-docs',
    head: [
        ['link', { rel: 'icon', href: 'logo.png' }]
    ],
    themeConfig: {
        siteTitle: "VueSurplus",
        logo: "/logo.png",
        outlineTitle:'目录',
        // footer: {
        //     message: 'Released under the MIT License.'
        // },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/VueSurplus/vue-surplus' }
        ],
        nav: [
            { text: "文档", link: "/guide/" },
            { text: "API", link: '/core/useSyncQueue/' }
        ],
        sidebar: {
            "/guide/": [{
                text: "开始",
                items: [
                    {
                        text: "简介",
                        link: "/guide/",
                    },
                    { text: "快速上手", link: "/guide/" },
                ]
            }],
            "/core/": [{
                text: "useSyncQueue",
                link: "/core/useSyncQueue/"
            }]
        }
    },
})