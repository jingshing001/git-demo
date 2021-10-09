<template>
   <div id="root">  
       <router-link to='/weather'  active-class="activeColor" class='iconStyle' replace><font-awesome-icon icon="cloud-sun"  /></router-link>
        <router-link to='/todo'  active-class="activeColor" class='iconStyle' replace> <font-awesome-icon icon="list-alt" /></router-link>
        <div class="todo-container">
             <div class="todo-wrap">
                <router-view></router-view>
            </div>
        </div>
    </div>
              
</template>



<script>

  export default{
      component:{
          
      },
     
  }

</script>

<style lang="scss">
/*base*/
    body{
       
        font-family: cursive;
        }
    
  
    .btn {
      padding: 5px 15px;
      cursor: pointer;
      color:#34401A;
      font: {
          size:16px;
          weight:700;
      }
     }

     .footerBtn{
         background: none;
         border-radius: 5px;
         width: 120px;
         border: 4px solid #ff7b71;
         color:rgb(255, 255, 255);
         font-size: 20px;
         font-weight:500;
         letter-spacing: 3px;
         &:hover {
             color: #fff;
             transition: 0.5s;
            background-color: #ff7b71;
         }
     }
     
    .btn-danger {
    background-color:#ff7b71 ; 
    border: 2px solid #ff7b71; 
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    &:hover{
        color: #fff;
        background-color: #d6534a;
    }
    }
    
    .btn-edit {
    background-color:#afcf99;
    border: 2px solid #afcf99;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-right: 5px;
    &:hover{
        color: #fff;
        background-color: #98b486;
    }
    }
     
    .todo-container {
        width: 100%;
        margin: 0 auto;
    .todo-wrap{
        padding: 10px;
        }
    }

    .itemCheckbox{
      position: absolute;
      display: none;
      left:-10%;
    }

    .box1{
      margin-right: 5px;
      display:inline-flex;
      width: 16px;
      height:16px;
      border:1px solid; 
      border-radius: 3px;
      justify-content: center;
      align-items: center;
     
      
      .box2{
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #37a084;
       
      }
    }

    .iconStyle{
        font-size: 30px;
        margin: 0 10px;
        color: #5a5959;
       
    }
    .activeColor{
        color: white;
    }

 

</style>