<template>
<div>
 <ul class="todo-main"> 
      
        <user-item v-for="todo in todoArr" 
                    :key="todo.id" 
                    :todo="todo" 
                    >
                    </user-item>
              
      </ul>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'
export default {
    name:'UserList',
    
    //接收父組件
    props:['todoArr'],
    components:{
      UserItem
    }
}
</script>

<style scoped>
     /*list*/
    .todo-main {
 
    border-radius: 2px;
    padding: 0px;
    }
   

</style>