// .vitepress/theme/index.ts
import VersionSwitcher from '@viteplus/versions/components/version-switcher.component.vue'
import AdminShowcase from './components/AdminShowcase.vue'
import HomeCta from './components/HomeCta.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('VersionSwitcher', VersionSwitcher)
    app.component('AdminShowcase', AdminShowcase)
    app.component('HomeCta', HomeCta)
  },
}
