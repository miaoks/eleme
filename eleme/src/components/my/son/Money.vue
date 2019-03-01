<template>
    <div class="money_wrap">
        <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
        <div class="one">
            <div class="two">
                <div class="three">
                    <span class="three_spn1">当前余额</span>
                    <span class="three_spn2" @click="balance_m()">
                            <i class="el-icon-question"></i>
                            <span>余额说明</span>
                    </span>
                    <br>
                    <p><span class="three_spn3">{{this.$store.state.res&&this.$store.state.res.data.balance||balance}}</span><span class="three_spn4">元</span></p>
                    <button class="btn">提现</button>
                </div>
            </div>
        </div>
        <p class="jiaoyi">交易明细</p>
        <div class="no_log">
            <img src="../../../assets/none.png" alt="">
            <p>暂无明细记录</p>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/common/Header"
    export default {
        data() {
            return {
                left: "el-icon-arrow-left",
                middle: "我的余额",
                right: false,
                balance: '0.00'
            }
        },
        components: {
            Header,
        },
        methods: {
            balance_m() {
                console.log("!!!@@1")
                this.$router.push({
                    name: 'balance'
                })
            }
        },
        created() {
            if (this.$store.state.res == '') {
                return;
            } else {
                this.$http({
                    method: "get",
                    url: "https://elm.cangdu.org/v1/user",
                    params: {
                        user_id: this.$store.state.res.data.user_id
                    }
                }).then((res) => {
                    this.$store.commit("login", res)
                    // console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    .money_wrap {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
    }
    .one {
        width: 100%;
        height: 196px;
        background: #3190E8;
        position: relative;
        top: 52px;
        overflow: hidden;
    }
    .two {
        margin: 8px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #FFFF;
        border-radius: 5px;
        overflow: hidden;
    }
    .three {
        margin: 10px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }
    .three_spn1 {
        color: #666;
        font-weight: 400;
        font-size: 15px;
    }
    .three_spn2 {
        position: absolute;
        right: 0;
        color: #3190E8;
    }
    .three_spn3 {
        line-height: 60px;
        font-size: 44px;
    }
    .three_spn4 {
        font-size: 17px;
    }
    .btn {
        width: 100%;
        height: 54px;
        position: absolute;
        bottom: 0;
        font-size: 20px;
        color: white;
        border: none;
        border-radius: 5px;
        outline: none;
        background: #cccccc;
        font-weight: 550;
    }
    .jiaoyi {
        position: absolute;
        top: 250px;
        line-height: 53px;
        font-size: 16px;
        color: #999;
        left: 15px;
    }
    .no_log {
        text-align: center;
        margin-top: 100px;
    }
    .no_log img {
        width: 215px;
    }
    .no_log p {
        font-size: 20px;
        color: #999;
    }
</style>
