// .vitepress/theme/index.ts
import VersionSwitcher from '@viteplus/versions/components/version-switcher.component.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('VersionSwitcher', VersionSwitcher)
  },
}
