import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.WebSocketURL = 'ws://localhost:3001'
App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
