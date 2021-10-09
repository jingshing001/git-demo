<template>
      <div class="mask" v-if="isMask">
        <div class="deleteAlert">
            <p>確定要刪除這事項?</p>
            <div>
            <button class="btn btn-edit" @click="deleteTodoArr" >確定</button>
            <button class="btn btn-danger" @click="deleteTodoArr">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
        name:'UserMask',
        data(){
            return{
                isMask:false,
                itemId:''
            }
        },
        methods:{

            //啟動遮罩
            callMask(id){
                this.itemId=id
                this.isMask=!this.isMask
            },

            //刪除事項取消遮罩
            deleteTodoArr(e){
                if(e.target.innerText=='確定'){
                this.$bus.$emit('deleteTodoArr',this.itemId);
                }
                this.isMask=false;
               
            }
        },
        mounted(){
            this.$bus.$on('callMask',this.callMask)
        }
}
</script>

<style lang="scss" scoped>
      .mask{
        position: absolute;
        background-color: rgba(0,0,0,0.5);
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index: 5;
        .deleteAlert{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            width:600px;
            height:300px;
            background-color: rgb(255, 243, 218);
            box-shadow: 0px 1px 21px -4px rgba(0,0,0,0.75);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            p{
                font-size: 1.5rem;
            }
            button{
                margin:0 10px      
                }
        }
    }
</style>