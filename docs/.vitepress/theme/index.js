import DefaultTheme from 'vitepress/theme'
import Omorphia from 'omorphia'
import DemoContainer from './DemoContainer.vue'
import {ClientOnly} from "vitepress/dist/client/app/components/ClientOnly.js";

import './compat.scss'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(Omorphia)
    ctx.app.component('ClientOnly', ClientOnly)
    ctx.app.component('DemoContainer', DemoContainer)
  },
}
