<template>
    <div class="todo-header">
        <input type="text" v-model="topText" @keyup.enter="forApp" @blur="autoBlurInput" placeholder="請輸入待做事項" ref='inputHeader'>
        <span><font-awesome-icon icon="list-alt" />
        </span>
      </div>
</template>

<script>
export default {
    name:'UserTop',
    data(){
        return{
            topText:"",
        }
    },
    methods:{
       
       //把input的值傳送到父組件並做些判斷
       
       forApp(){
            //判斷是否有空白有的話釋出警告
            if(!this.topText.trim()) return alert('不能為空值請輸入待做事項')
            
            //傳值給父元素
            this.$emit('topTextValue',this.topText);
            
            //清空
            this.topText="";
        },

        //按下keyCode增加style
        autoFocusInput(e){
            if(e.keyCode==18){
                    this.$refs.inputHeader.style='width:200px';
                    this.$refs.inputHeader.nextElementSibling.style='visibility: hidden; transition: 0.01s;'
                    this.$refs.inputHeader.focus();
            }
        },
                 
        //失焦取消style
        autoBlurInput(){
                    this.$refs.inputHeader.style='';
                    this.$refs.inputHeader.nextElementSibling.style='';
        }
    },
        //創建鍵盤監聽
        created(){
            document.addEventListener('keyup', this.autoFocusInput);
        },
   
        //銷毀鍵盤監聽
        destroyed() {
            document.removeEventListener('keyup', this.autoFocusInput);
        },
     
}
                  
            
            
</script>
    
<style lang="scss" scoped>
    /*Top*/ 

    .todo-header{
        position: relative;
        display:inline-block;
        left: 50%;
        transform: translateX(-50%);
        background-color: #FBA183;
        margin-bottom: 30px;
        height: 60px;
        border-radius: 40px;
        padding: 0px;
        &:hover>input{
             width:200px;
             padding:0 6px;
        }
        &:hover>span{
            background:rgb(31, 31, 31);
            visibility: hidden;
            transition: 0.01s;
        }
        input{
            border: none;
            background: none;
            outline:none;
            float:left;
            padding: 0;
            color:rgb(2, 2, 2);
            font-size: 16px;
            transition: 0.4s;
            line-height: 60px;
            width: 0px;
        }
        span{ 
                color:rgb(63, 101, 144);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                text-decoration:none;
                background: #FBA183;
                display:flex;
                justify-content: center;
                align-items: center;
                transition: 0.4s;
                font-size: 30px;
        }

    }

    ::placeholder {
        color: #34401A;
    }

   
</style>