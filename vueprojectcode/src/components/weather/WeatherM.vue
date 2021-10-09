<template>
<div>
<div class='card' v-if='isCard'>
    <h3>{{locationName}}</h3>
    <h5>{{wxParameter}}</h5>
    <img :src='imgSrc' alt="">
    <h1>{{maxParameter}}<sup>&deg;</sup></h1>
    <div class='footerCard'>
        <div>
            <p>max</p>
            <span>{{maxParameter}}<sup>&deg;</sup></span>
        </div>
        <div>
            <p>min</p>
            <span>{{minParameter}}<sup>&deg;</sup></span>
        </div>

    </div>
</div>
  <div class='wordCenter' v-else>{{cantFindWord}}</div>
</div>
</template>


<script>
//取得圖片路徑
const getBtnImg = path => require(`@/assets/img/${path}.gif`);
export default {

data(){
    return{
        cantFindWord:'',
        isCard:false,
        locationName:'',
        imgSrc:getBtnImg('rainy'),
        wxParameter:'',
        minParameter:'',
        maxParameter:'',
    }
},
methods:{

    //處理資料
    newlocationArray(value){
    
        this.locationName=value.locationName;
        this.wxParameter=value.weatherElement[0].time[1].parameter.parameterName;
        this.minParameter=value.weatherElement[2].time[1].parameter.parameterName;
        this.maxParameter=value.weatherElement[4].time[1].parameter.parameterName;
        // this.wxParameter.indexOf('雨')!=-1?this.imgSrc=getBtnImg('rainy') :this.imgSrc=getBtnImg('sunny') 
        this.changeWeatherPic()
        this.isCard=true;
    },
    //判斷字串切換圖片
    changeWeatherPic(){
            if(this.wxParameter.includes('雷')){
                  this.imgSrc=getBtnImg('thunder');
                

            }else if(this.wxParameter.includes('雨')){
                   this.imgSrc=getBtnImg('rainy');
                   }
            else if(this.wxParameter.includes('陰')){
                   this.imgSrc=getBtnImg('cloudy');
                   }
            else{
               {
                   this.imgSrc=getBtnImg('sunny');
                }
            }
    },
   
   //輸入錯誤
   notFind(){
        this.isCard=false;
        this.cantFindWord='找不到請重新輸入'
    }
},
    mounted(){
         this.$bus.$on('newlocationArray',this.newlocationArray); 
         this.$bus.$on('notFind',this.notFind); 
}, 
    beforedestroyed(){
        this.$bus.$off('newlocationArray');
        this.$bus.$off('notFind');
    },
}

                    
        
            
    
       
</script>

<style lang="scss">
    .card{
        position:relative;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        width:450px;
        height: 600px;
        background-color: rgba(251, 251, 251, 0.08);
        box-shadow: 5px 5px 25px rgba(0,0,0,0.1);
        border-radius: 10px;
        border: 1px rgb(209, 209, 209) solid;
        margin-top: 16px;
        color: rgb(134, 125, 90);
        h3{
            font-size:2rem;
            letter-spacing: 4px;
            font-weight: 700;
            text-align: center;
        }
        h5{
          font-size: 1.5rem;
          letter-spacing: 10px;
          font-weight: 300;
          
        }
        img{
            width:150px;
            height:150px;
            position: relative;
            top:-20px;
            
        }
        h1{
            letter-spacing: 3px;
            font-size: 60px;
            font-weight: 300;
            margin: -10px 0 0 36px;

         
        }
        .footerCard{
            display: flex;
            align-items: center;
            justify-content:space-around;
            font-size: 20px;
            margin-top: 20px;
        }
    }

   .wordCenter{
       font-size: 20px;
       text-align: center;
   }
</style>