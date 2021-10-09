<template>
    <div >
    <user-mask />
    <user-top @topTextValue="addTodo" />
    <user-list :todoArr="todoArr"/>
    <user-bottom 
                :todoArr="todoArr"
                @determineAllDoneSelect="determineAllDoneSelect"
                @clearFinishTodo="clearFinishTodo"
    />
   </div>
 
</template>

<script>
import UserTop from '../components/todo/UserTop.vue'
import UserList from '../components/todo/UserList.vue'
import UserBottom from '../components/todo/UserBottom.vue'
import UserMask from '../components/todo/UserMask.vue'

import {nanoid} from 'nanoid'
export default {
    
    name:'App',
    data(){
        return{
            //拿瀏覽器儲存資料
           todoArr:JSON.parse(localStorage.getItem('todo')) || []
          
        
        }
    },
    components:{
        UserTop,
        UserList,
        UserBottom,
        UserMask
    },
    methods:{
        //把資料新增至todoArr
        addTodo(toptext){
            this.todoArr.unshift({id:nanoid(),title:toptext,done:false});
        },
        //遍歷數組todoArr判斷改變done值
        changeCheckedValue(id){
            this.todoArr.forEach(todo=>{
                if(todo.id == id) todo.done=!todo.done
            })
        },
        //刪除toDo
        deleteTodoArr(id){
             this.todoArr.forEach((todo,index)=>{
                 if(todo.id==id){
                     this.todoArr.splice(index,1);
                 }
             })
        },
        //全選或全不選
        determineAllDoneSelect(isflag){
            this.todoArr.forEach(todo=>{
                console.log(isflag);
                todo.done=isflag
            })
        },
        //清除全部已完成事項
        clearFinishTodo(){
         return this.todoArr = this.todoArr.filter(todo=>{
              return  todo.done == false
            })
        
        }       
    },
        //全局綁定事件
       mounted(){
        this.$bus.$on('changeCheckedValue',this.changeCheckedValue);
        this.$bus.$on('deleteTodoArr',this.deleteTodoArr)  ;
        this.$bus.$on('updataEdit',(todo,value)=>{
                   todo.title=value;
    })
    },
    beforeCreate() {
         document.querySelector('body').setAttribute('style','background:#37a084')
    },
    
   //解除綁定
    beforedestroyed(){
        this.$bus.$off('changeCheckedValue');
        this.$bus.$off('deleteTodoArr');
        this.$bus.$off('updataEdit');
        document.querySelector('body').removeAttribute('style')
    },

    //監視todorr變化
    watch:{
        todoArr:{
            deep:true,
          handler(todo){
            //瀏覽器儲存data
           localStorage.setItem('todo',JSON.stringify(todo))
           }
        }
    }
    
    
}
</script>

<style >

</style>