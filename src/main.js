import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import './style/index.scss'

App.mpType = 'app'

import uView from 'uview-ui'
import 'uview-ui/theme.scss'
import 'uview-ui/index.scss'

Vue.use(uView)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
