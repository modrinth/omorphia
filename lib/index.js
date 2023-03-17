import * as components from './components'
import VueSelect from 'vue-select'
import FloatingVue from 'floating-vue'

function install(app) {
  for (const key in components) {
    app.component(key, components[key])
  }
  app.use(FloatingVue)
  app.component('v-select', VueSelect)
}

export default { install }
export * from './components'

import './assets/omorphia.scss'
import 'vue-select/dist/vue-select.css'
