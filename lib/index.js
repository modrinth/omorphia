import * as components from './components'
import VueMultiselect from 'vue-multiselect'

function install(app) {
  for (const key in components) {
    app.component(key, components[key])
    app.use(VueMultiselect)
  }
}

export default { install }
export * from './components'

import './assets/omorphia.scss'
