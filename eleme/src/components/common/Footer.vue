<template>
    <div class="wrap">
        <div @click="gouto('shophome')">
            <i class="el-icon-goods pic" :id="this.$store.state.shophome&&'sty'"></i>
            <br>
            <span>外卖</span>
        </div>
        <div @click="gouto('search')">
            <i class="el-icon-circle-check-outline pic" :id="this.$store.state.search&&'sty'"></i>
            <br>
            <span>搜索</span>
        </div>
        <div @click="gouto('order')">
            <i class="el-icon-document pic" :id="this.$store.state.order&&'sty'"></i>
            <br>
            <span>订单</span>
        </div>
        <div @click="gouto('profile')">
            <i class="el-icon-setting pic" :id="this.$store.state.profile&&'sty'"></i>
            <br>
            <span>我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            };
        },
        methods: {
            gouto(add){
                console.log(add)
                this.$router.push({name:add});
                this.$store.commit("gouto",add)
            }
        },
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .wrap {
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #f1f1f1;
    }
    .wrap div {
        width: 24%;
        margin: 0;
        text-align: center;
        box-sizing: border-box;
        display: inline-block;
        font-size: 12px;
        color: rgb(110, 110, 110);
        padding-top: 10px;
    }
    .pic{
       font-size: 20px;
    }
    .picstyle {
        background:#23AAFF;
       color: white;
    }
    #sty{
        background:#23AAFF;
        color:white;
    }
    .router-link-active{
        color: blue;
    }
    .active {
        color: aqua;
    }
</style>