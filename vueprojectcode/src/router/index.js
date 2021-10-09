import Vue from'vue'; 
import VueRouter from'vue-router'; 

Vue.use(VueRouter)

const Weather =() => import('../view/Weather.vue')
const Todo=()=> import('../view/Todo.vue')

const routes=[
    {
        path:'/',
        redirect:'/todo',
    },
    {
        path:'/todo',
        component:Todo

    },
    {
        path:'/weather',
        component:Weather

    }
]

 const router =new VueRouter({
    routes,
})



export default router