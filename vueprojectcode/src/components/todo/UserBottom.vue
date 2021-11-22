<template>
    <div class="todo-footer" v-if="alreadyFinish">
        <label>
          <input type="checkbox"  @change="allDoneSelect" class="itemCheckbox"/>
           <div class="box1">
              <span :class='{box2:allSelect}'></span>
              </div>
          <!-- <input type="checkbox"  v-model="isAll"/> -->
        </label>
        <span>
          <span>已完成{{alreadyFinish}}</span> / 全部{{alldone}}
        </span>
        <button class="btn footerBtn" @click="alldelete">清除</button>
      </div>
</template>

<script>
export default {
    name:'UserBottom',
    props:['todoArr'],
    computed:{
      //todo全部事項
      alldone(){
        return this.todoArr.length
      },
     
     //todo已完成事項
      alreadyFinish(){
        let count = this.todoArr.filter( v =>{
          return  v.done==true
        })
        return count.length
      },
     
     //判斷事項是否以勾選
      allSelect(){
      return this.alldone == this.alreadyFinish
    },
  },
      methods:{
     
     //全選或全不選
      allDoneSelect(e){
          this.$emit('determineAllDoneSelect',e.target.checked)
      },
      //清除已全選事項
      alldelete(){
         this.$emit('clearFinishTodo')
      }
    }
}
</script>
   



<style lang="scss" scoped>
     /*bottom*/
    .todo-footer {
    span{
      width: 120px;
      
    }
    label{
      width: 90px;
      display: flex;  
      cursor: pointer;
      align-items: center;
    }
    display: flex;
    height: 50px;
    align-items: center;
    justify-content:space-between;
    padding-left:6px;
    margin-top: 5px;
    }

    .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
    }

    .box1{
      border:1px solid #ff7b71;
      width: 16px;
      height:16px;
    .box2{
          width: 12px;
          height: 12px;
          background-color: #ff943c;
       
      }

          
    }

    @media screen and (min-width:700px) {
      .todo-footer{
        
        width:600px;
        margin: 10px auto;
      }
  }
 
</style>