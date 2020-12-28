import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.WebSocketURL = 'ws://47.101.63.199:9999/Upload'
App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
