import { defineConfig } from 'vitepress'
export default defineConfig({
    title: 'VueSurplus',
    description: 'A composition function toolset of vue3',
    lang: 'en-US',
    ignoreDeadLinks: true,

    themeConfig: {
        logo: '/favicon.svg',

        footer: {
            message: 'Released under the MIT License.',
            copyright: '',
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/VueSurplus/vue-surplus' }
        ]
    }
})