<template>
    <li>
          <label>
            <input type="checkbox" @change="changeDone(todo.id)" :checked="todo.done" class="itemCheckbox"/>
            <div class="box1">
              <span :class='{box2:todo.done}'></span>
              </div>
            <span v-show="!todo.isEdit">{{todo.title}}</span>
            <input  type="text" 
                    v-show="todo.isEdit"   
                    @change="changeEditInput(todo,$event)" 
                    :value="todo.title"
                    @blur="cancelFocus(todo)"
                    ref="inputElement"
                    >
          </label>
          <button class="btn btn-danger" @click="callMask(todo.id)">删除</button>
          <button v-show="!todo.isEdit" class="btn btn-edit" @click="editInput(todo)">編輯</button>
        </li>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    name:'UserItem',
    props:['todo'],
    data(){
      return{
      }
    },
    methods:{
     
      //響應change並啟用父組件方法改變done值
     
      changeDone(id){
        // this.changeCheckedValue(id)
        this.$bus.$emit('changeCheckedValue',id)
      },
     
      //呼叫遮罩
      callMask(id){
            // this.deleteTodoArr(id);
            // this.$bus.$emit('deleteTodoArr',id);
            this.$bus.$emit('callMask',id)
      },
          
      //編輯輸入
      editInput(todo){ 
        //判斷是否有isEdit屬性沒有設置一個有則直接為true
        if(this.hasOwnProperty.call(todo,"isEdit")){
            todo.isEdit=true
        }else{
          this.$set(todo,'isEdit',true);
        }
        //點編輯扭直接focus()
        this.$nextTick(function(){
          this.$refs.inputElement.focus()
          });
    },
      
        

      //輸入框變動
      changeEditInput(todo,e){
        if(!e.target.value.trim()) return alert('請輸入不可為空白')
        todo.isEdit=false
       this.$bus.$emit('updataEdit',todo,e.target.value)
      },

      //失焦
      cancelFocus(todo){
        todo.isEdit=false;
      },

    },
    //animejs
    mounted(){
          anime({
          targets: 'li',
          rotate: '1turn',
      
        });
    },
}
  
</script>

<style lang="scss" scoped>
     /*item*/
    li{
    list-style: none;
    height: 50px;
    padding: 0 5px;
    margin-bottom: 10px;
    font-size: 20px;
    background-color: #ffa875;
    box-shadow: 9px 9px 23px -7px rgba(251,161,131,0.66);
    color: #34401A;
    button {
        float: right;
        margin-top: 7px;
        display:none;
    }
    &:hover button{
        display:block;
    }
    
    }

    label input:last-child{
        margin-left: 3px;
        background: none;
        border: 2px solid white;
        outline: none;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color:#34401A;
    }

 

    label{
      display:inline-flex;
      height: 100%;
      align-items: center;
    }

@media screen and (min-width:700px) {
 
      li{
        
        width:600px;
        margin: 10px auto;
      }
  }


</style>