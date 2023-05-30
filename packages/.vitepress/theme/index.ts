import DefaultTheme from 'vitepress/theme'
import './styles/index.css'
import demoVmodel from '../../core/useEmitProp/demo/index.vue'
import demoProps from '../../core/useEmitProp/demo/demo.vue'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        // register your custom global components
        ctx.app.component('demoVmodel',demoVmodel)
        ctx.app.component('demoProps',demoProps)
      }
}