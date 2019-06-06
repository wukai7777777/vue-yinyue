import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import MetaInfo from 'vue-meta-info'

import VueWechatTitle from 'vue-wechat-title';  
import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body) // 解决click 在移动端延迟问题

// Vue.use(VueLazyload, {
    //   loading: require('common/image/default.png')
    // })
    
Vue.use(VueWechatTitle)
Vue.use(MetaInfo)
// or with options 图片懒加载
Vue.use(VueLazyload, {
    //preLoad: 1.3,
    //error: 'dist/error.png',
    loading: require('common/image/default.png')
        //attempt: 1
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }
})