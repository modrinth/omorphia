import * as components from './components'
import Multiselect from 'vue-multiselect'
import FloatingVue from 'floating-vue'

function install(app) {
  for (const key in components) {
    app.component(key, components[key])
    app.use(FloatingVue)
  }
  app.component('Multiselect', Multiselect)
}

export default { install }
export * from './components'

import './assets/omorphia.scss'
