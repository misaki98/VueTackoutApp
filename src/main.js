/**
 * 入口js文件
 */
import Vue from 'vue'
import {
    Button
} from 'mint-ui'
import VueLazyload  from 'vue-lazyload'
import App from './App.vue'
import router from './router/index'
import store from './store'
import loading from './common/imgs/loading.gif'
// 单纯运行这个文件，并没有需要暴露或者取什么
import './mock/mockServer'
import './filters'

Vue.use(VueLazyload,{
    loading
})
// 注册一个全局组件标签<mt-button>
Vue.component(Button.name, Button)

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})