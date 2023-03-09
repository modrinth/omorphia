import DefaultTheme from 'vitepress/theme'
import Omorphia from 'omorphia'
import DemoContainer from './DemoContainer.vue'
import ModalDemo from './ModalDemo.vue'

import './compat.scss'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Omorphia)
    ctx.app.component('DemoContainer', DemoContainer)
    ctx.app.component('ModalDemo', ModalDemo)
  },
}
