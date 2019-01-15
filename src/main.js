import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import { TransferDom, ToastPlugin, XDialog, VChart } from 'vux'
import App from './App'
import Index from './pages/Index'
import List from './pages/List'
import Detail from './pages/Detail'

Vue.use(VueRouter)
Vue.use(ToastPlugin)

const routes = [{
  path: '/',
  component: Index
}, {
  path: '/list',
  component: List
}, {
  path: '/detail',
  component: Detail
}]

const router = new VueRouter({
  routes
})

Vue.use(Vuex)

var ajax = axios.create({
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

ajax.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Vue.$vux.toast.text('网络忙…', 'middle')
    return Promise.reject(error)
  }
)

ajax.interceptors.response.use(
  response => {
    if (response.data.retcode) {
      switch (response.data.retcode) {
        case '302':
          location.replace(response.data.body)
          break
        case '0000':
          break
        default :
          Vue.$vux.toast.text(response.data.errMsg, 'middle')
          break
      }
    }
    return response.data
  },
  error => {
    Vue.$vux.toast.text('网络忙…', 'middle')
    return Promise.reject(error)
  }
)

Vue.prototype.ajaxjson = function (api, param = {}) {
  return new Promise((resolve, reject) => {
    ajax.post(api, param).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

Vue.prototype.ajaxform = function (api, param = {}) {
  return new Promise((resolve, reject) => {
    ajax.post(api, qs.stringify(param), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

const store = new Vuex.Store()

store.registerModule('vux', {
  state: {
  },
  mutations: {
  },
  actions: {
  }
})

require('es6-promise').polyfill()
sync(store, router)

Vue.directive('transfer-dom', TransferDom)

Vue.component('x-dialog', XDialog)
Vue.component('v-chart', VChart)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
