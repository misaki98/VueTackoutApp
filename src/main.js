/**
 * 入口js文件
 */
import Vue from 'vue'
import {
    Button
} from 'mint-ui'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 注册一个全局组件标签<mt-button>
Vue.component(Button.name, Button)

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})