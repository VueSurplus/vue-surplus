import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'VueSurplus',
    description: 'A composition function toolset of vue3',
    lang: 'en-US',
    ignoreDeadLinks: true,
    base: '/vue-surplus',
    head: [
        ['link', { rel: 'icon', href: 'logo.png' }]
    ],
    themeConfig: {
        siteTitle: "VueSurplus",
        logo: "/logo.png",
        outlineTitle: '目录',
        // footer: {
        //     message: 'Released under the MIT License.'
        // },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/VueSurplus/vue-surplus' }
        ],
        nav: [
            { text: "文档", link: "/guide/" },
            { text: "API", link: '/core/useCloneDeep/' }
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
                text: "useCloneDeep",
                link: "/core/useCloneDeep/"
            }, {
                text: "useAssignDeep",
                link: "/core/useAssignDeep/"
            }, {
                text: "useSyncQueue",
                link: "/core/useSyncQueue/"
            }, {
                text: "useEmitProp",
                link: "/core/useEmitProp/"
            }, {
                text: "useEmitProps",
                link: "/core/useEmitProps/"
            }, {
                text: "useDeferredFn",
                link: "/core/useDeferredFn/"
            }, {
                text: "useThrottleFn",
                link: "/core/useThrottleFn/"
            }, {
                text: "useLazyScript",
                link: "/core/useLazyScript/"
            }, {
                text: "useLazyLink",
                link: "/core/useLazyLink/"
            }, {
                text: "useLazyLinks",
                link: "/core/useLazyLinks/"
            },{
                text:"useCreateStore",
                link:"/core/useCreateStore/"
            },{
                text:"useCreateInjection",
                link:"/core/useCreateInjection/"
            }]
        }
    },
})