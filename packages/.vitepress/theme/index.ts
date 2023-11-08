import DefaultTheme from 'vitepress/theme'
import './styles/index.css'
import DemoContainer from './components/DemoContainer.vue'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        // register your custom global components
        ctx.app.component('DemoContainer',DemoContainer)
      }
}