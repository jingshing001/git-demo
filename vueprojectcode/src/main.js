//引入Vue
import Vue from 'vue'

// //引入App
import App from './App.vue'

//引入vue-router
import router from './router'

//引入Font Awesome Icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'



 library.add(fas)

 Vue.component('font-awesome-icon', FontAwesomeIcon)


//關閉Vue的生產提示
Vue.config.productionTip=false

new Vue({
    el:'#app',
    // render(createElement){
    //     return createElement('h1',{class:{'test':true}},'你好啊')
    // }
    beforeCreate(){
        Vue.prototype.$bus=this
    },
    render:h =>h(App),
    router
})