<template>
  
    <div class="todo-header">
        <input type="text" v-model="topText" @keyup.enter="getWeatherData" @blur="weatherAutoBlurInput" placeholder="請輸入縣市名稱" ref='weatherInputHeader'>
        <span><font-awesome-icon icon="cloud-sun" />
        </span>
      </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'UserTop',
    data(){
        return{
            topText:"",
            locationArray:[],
            newlocationArray:{},
            isFind:true

        }
    },
    methods:{
       
       //請求數據
       getWeatherData(){
         
            //判斷是否有空白有的話釋出警告
            if(!this.topText.trim() || this.topText.length==1) {
                
                  return alert('請輸入兩個字以上')
                }
            const
         
            apikey='CWB-555B3ADC-98E3-45B6-9BF6-FE8C13BA4BB8'
            axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apikey}&format=JSON`).then(response=>{
                 this.locationArray = response.data.records.location;  
             }).catch((error)=>{
                 console.log(error)
             })
        
        }, 
                  
        //對字串進行修改
        changeWord(){
            this.topText=this.topText.split("");
            if(this.topText[0]=='台'){
                this.topText[0]='臺';
            }
            this.topText=this.topText.join('')
        },
                

        //按下keyCode增加style
        weatherAutoFocusInput(e){
            if(e.keyCode ==18){
                    this.$refs.weatherInputHeader.style='width:200px';
                    this.$refs.weatherInputHeader.nextElementSibling.style='visibility: hidden; transition: 0.01s;';
                    this.$refs.weatherInputHeader.focus();
            }
                   
            
        },
        //失焦取消style
        weatherAutoBlurInput(){
                     this.$refs.weatherInputHeader.style='';
                    this.$refs.weatherInputHeader.nextElementSibling.style='';
        }
    },

    watch:{
        //監視locationArray變動
        locationArray(){
             this.changeWord();
             this.newlocationArray=this.locationArray.find((v)=>{
                return  v.locationName.indexOf(this.topText) !=-1;
        
             })
            //清空輸入字串
            this.topText='';
           
            if(this.newlocationArray ==undefined){
                
                this.$bus.$emit('notFind',this.notFind);
                return
            }
             
             this.$bus.$emit('newlocationArray',this.newlocationArray);
        },
            
           
               
          
          
       
    },
    // 創建鍵盤監聽
    created(){
          document.addEventListener('keyup', this.weatherAutoFocusInput);
    },
    //銷毀鍵盤監聽
    destroyed() {
         document.removeEventListener('keyup', this.weatherAutoFocusInput);
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
        background-color: #fae8e3;
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
                background: #fae8e3;
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