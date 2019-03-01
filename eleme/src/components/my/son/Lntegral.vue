<template>
    <div class="money_wrap">
        <section v-if="!in_">
        <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
        <div class="one">
            <div class="two">
                <div class="three">
                    <span class="three_spn1">当前积分</span>
                    <span class="three_spn2" @click="in_=!in_">
                            <i class="el-icon-question"></i>
                            <span>积分说明</span>
                    </span>
                    <br>
                    <p><span class="three_spn3">{{this.$store.state.res&&this.$store.state.res.data.balance||balance}}</span><span class="three_spn4">分</span></p>
                    <button class="btn">积分兑换商品</button>
                </div>
            </div>
        </div>
        <p class="jiaoyi">最近30天积分记录</p>
        <div class="no_log">
            <img src="../../../assets/none.png" alt="">
            <p>最近30天无积分记录</p>
            <p style="font-size:10px;margin-top:10px;">快去下单赚取大量积分吧</p>
        </div>
        </section>
        <section v-if="in_">
            <i class="el-icon-arrow-left" style="z-index:111;position:fixed;color:white;font-size:30px;top:10px;left:10px;" @click="in_=!in_"></i>
            <Header left_msg="left" middle_msg="积分说明" :right_msg="right"></Header>
            <div class="balance_con">
            <h3>Q1: 怎么获得积分？</h3>
            <p>在线支付的订单将获得订单积分奖励：<br>积分将在用户完成评价后获得。<br>可获得积分=订单金额×10（即1元=10点积分）。<br>订单金额指实际付款金额，不包含活动优惠金额<br>每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。
            </p>
            <h3>Q2: 积分用来做什么？</h3>
            <p>可以在积分商城兑换各种礼品。</p>
            <h3>Q3: 礼品兑换很多天了还没有收到，该怎么办？</h3>
            <p>礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。</p>
            <h3>Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？</h3>
            <p>不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。</p>
            </div>
        </section>
    </div>
</template>

<script>
    import Header from "@/components/common/Header"
    export default {
        data() {
            return {
                left: "el-icon-arrow-left",
                middle: "我的积分",
                right: false,
                balance: '0',
                in_:false
            }
        },
        components: {
            Header,
        },
        methods: {

        },
        created() {
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
        background: #fa7304;
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
