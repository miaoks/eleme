<template>
    <div class="wrap">
        <div id="head_top">
            <i class="el-icon-arrow-left" @click="back()"></i>
            <span>{{this.$route.params.cityname}}</span>
            <router-link to="/"><a>切换城市</a></router-link>
        </div>
        <div class="con">
            <form action="" v-on:submit.prevent="request">
            <input v-model="inp" type="text" placeholder="输入学校、商务楼、地址" required>
            <input type="submit" value="提交">
            </form>
        </div>
        <div v-if="!bl">
        <span class="spn" v-if="this.$store.state.history.length!=0">搜索历史</span>
            <ul v-for="(value,index) in this.$store.state.history" :key="index">
                <li @click="takeout(value)">
                    <h4>{{value.name}}</h4>
                    <span class="address">{{value.address}}</span>
                </li>
            </ul>
            <div v-if="this.$store.state.history.length!=0" id="clear" @click="clear()"><span>清空所有</span></div>
        </div>
        <div v-else>
            <ul v-if="Array.prototype.isPrototypeOf(msg)&&msg.length!=0">
                <li v-for="(v,i) in msg" :key="i" @click="takeout(v)">
                    <h4>{{v.name}}</h4>
                    <span class="address">{{v.address}}</span>
                </li>
            </ul>
            <ul v-else>
                <li v-if="bl">很抱歉!无搜索结果</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inp: "",
                msg: "",
                bl: false,
            };
        },
        methods: {
            clear(){
                this.$store.commit("clear")
            },
            takeout(v) {
                this.$router.push({
                    name: "shophome",
                    params: {
                        msg: v
                    }

                })
                this.$store.commit("history",v)
            },
            back() {
                this.$router.go(-1); //返回上一层
            },
            request() {
                this.bl = true;
                this.$http({
                    method: "get",
                    url: "https://elm.cangdu.org/v1/pois",
                    params: {
                        city_id: this.$route.params.cityid,
                        keyword: this.inp
                    }
                }).then((res) => {
                    // console.log(res)
                    this.msg = res.data;
                })
            }
        },
    }
</script>

<style scoped>
    .wrap {
        background: #F5F5F5;
    }
    #head_top {
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 48px;
    }
    .el-icon-arrow-left {
        color: white;
        font-size: 20px;
        line-height: 48px;
        margin-left: 10px;
    }
    #head_top span {
        position: absolute;
        font-size: 20px;
        color: #fff;
        text-align: center;
        font-weight: 700;
        line-height: 48px;
        left: 100px;
        right: 100px;
    }
    a {
        float: right;
        font-size: 18px;
        color: #fff;
        margin-right: 10px;
        line-height: 48px;
    }
    .con {
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        margin-top: 70px;
    }
    .con input {
        width: 92%;
        height: 35px;
        margin-bottom: 10px;
        box-sizing: border-box;
        margin-left: 4%;
        margin-right: 4%;
        outline: none;
        border:1px solid lightgray;
    }
    .con input:nth-child(1){
        margin-top: 10px;
    }
    .con input:nth-child(2) {
        background: #3190e8;
        border: none;
        outline: none;
        border-radius: 10px；
    }
    .spn {
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        padding-left: 10px;
        font: 14px Microsoft YaHei;
        text-align: left;
        color: black;
    }
    li {
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro;
        padding: 10px;
    }
    li span {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    li h4 {
        margin-bottom: 10px;
    }
    #clear{
        width: 100%;
        height: 46px;
        text-align: center;
    }
    #clear span{
        line-height: 46px;
    }
    .address{
        color: rgb(105, 103, 103);
    }
</style>