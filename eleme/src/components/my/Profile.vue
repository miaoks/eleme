<template>
  <div class="m_wrap">
    <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
    <div class="user" @click="boolean?tologin():userinfor()">
      <img src="//elm.cangdu.org/img/default.jpg" id="img">
      <div class="user_div">
        <span class="m_login" v-if="this.$store.state.res!=''">{{this.$store.state.res.data.username}}</span>
        <span class="m_login" v-else>登录|注册</span>
        <br>
        <i class="el-icon-phone"></i>
        <span v-if="this.$store.state.res!=''">
                <span v-if="this.$store.state.res.data.mobile!=''">{{this.$store.state.res.data.mobile}}</span>
        <span v-else>暂无绑定手机号</span>
        </span>
        <span v-else>暂无绑定手机号</span>
        <i class="el-icon-arrow-right one"></i>
      </div>
    </div>
    <div class="m_money">
      <div @click="money()">
        <span class="spn1"><b>{{balance}}</b>元</span>
        <br>
        <span class="spn2">我的余额</span>
      </div>
      <div @click="toDiscounts">
        <span class="spn1"><b style="color: #ff5f3e;">{{gift_amount}}</b>个</span>
        <br>
        <span class="spn2">我的优惠</span>
      </div>
      <div @click="toLntegral">
        <span class="spn1"><b style="color: #6ac20b;">{{point}}</b>分</span>
        <br>
        <span class="spn2">我的积分</span>
      </div>
    </div>
    <div class="con">
      <div class="con_son" @click="tomyorder">
        <i class="el-icon-document"></i>
        <span>我的订单</span>
        <i class="el-icon-arrow-right i_right"></i>
      </div>
      <div class="con_son" @click="tomyshop">
        <i class="el-icon-document"></i>
        <span>积分商城</span>
        <i class="el-icon-arrow-right i_right"></i>
      </div>
      <div class="con_son" @click="tomyclubcard">
        <i class="el-icon-document"></i>
        <span>饿了么会员卡</span>
        <i class="el-icon-arrow-right i_right"></i>
      </div>
    </div>
    <div class="con con2">
       <div class="con_son fuwu" @click="toservice">
        <i class="el-icon-document"></i>
        <span>服务中心</span>
        <i class="el-icon-arrow-right i_right"></i>
      </div>
      <div class="con_son fuwu">
        <i class="el-icon-document"></i>
        <span>下载饿了么APP</span>
        <i class="el-icon-arrow-right i_right"></i>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../common/Header"
  import Footer from "../common/Footer"
  export default {
    data() {
      return {
        left: "el-icon-arrow-left",
        middle: "我的",
        right: false,
        balance:"0.00",
        gift_amount:'0',
        point:'0',
        boolean:this.$store.state.res==''
      };
    },
    components: {
      Header,
      Footer
    },
    created() {
      if (this.$store.state.res=='') {
        return;
      } else {
        this.$http({
          method:"get",
          url:"https://elm.cangdu.org/v1/user",
          params:{
            user_id: this.$store.state.res.data.user_id
          }
        }).then((res)=>{
          this.balance=parseFloat(res.data.balance).toFixed(2);
          this.gift_amount=res.data.gift_amount;
          this.point=res.data.point;
        })
      }
    },
    methods: {
      // 服务中心
      toservice(){
        console.log("服务")
         this.$router.push({name: "service"})
      },
      // 我的会员卡
      tomyclubcard(){
        this.$router.push({name: "clubcard"})
      },
      // 积分商城
      tomyshop(){
        console.log("积分商城是空的,demal没有")
        alert("积分商城是空的,demal没有")
      },
      // 我的订单
      tomyorder(){
        // 这里设置跳转到订单的路由
        this.$router.push({name:"order"})
      },
      // 我的积分
      toLntegral(){
        this.$router.push({name: "lntegral"})
      },
      // 去我的优惠
      toDiscounts(){
         this.$router.push({name: "discounts"})
      },
      userinfor(){
        this.$router.push({name: "userinfor"})
      },
      tologin() {
        this.$router.push({name: "login"})
      },
      money() {
        console.log("11111")
        this.$router.push({name: "money",params:{balance:this.balance}})
      },
    },
  };
</script>

<style scoped>
.m_wrap{
  background-color: #F5F5F5;
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
}
  .user {
    position: relative;
    top: 51px;
    background: #3190E8;
    color: white;
    padding: 20px 0;
    width: 100%;
  }
  #img {
    display: inline-block;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    vertical-align: bottom;
    margin-left: 20px;
  }
  .m_login {
    font-weight: 700;
    font-size: 22px;
    color: #fff;
    display: inline-block;
    margin-bottom: 5px;
  }
  .user_div {
    display: inline-block;
    height: 45px;
    padding: 10px;
  }
  .one {
    position: absolute;
    right: 20px;
    top: 40px;
  }
  .m_money {
    width: 100%;
    position: relative;
    background: #FFFF;
    margin-top: 50px;
  }
  .m_money div {
    display: inline-block;
    width: 32%;
    height: 100px;
    /* box-sizing: border-box; */
    border-left: 1px solid #F5F5F5;
    text-align: center;
  }
  .m_money span {
    left: 0;
    right:0;
    text-align: center;
    display: inline-block;
  }
  .spn1 {
    margin-top: 30px;
    margin-bottom: 20px;
    color: #666;
  }
   .spn2 {
    margin-bottom: 10px;
    color: #666;
  }
  .spn1 b{
    display: inline-block;
    font-size: 30px;
    color: #f90;
    font-weight: 700;
    line-height: 10px;
    font-family: Helvetica Neue,Tahoma;
  }
  .con {
    position: relative;
    margin-top: 10px;
    background: #FFFF;
  }
  .con div {
    width: 100%;
    height: 30px;
    padding-top:10px;
  }
  .con div i:nth-child(1) {
    margin-left:20px;
    font-size: 20px;
  }
  .con div span {
    font-size: 20px;
    color: #333;
    font-weight: 400;
  }
  .i_right {
    color: rgb(187, 187, 187);
    font-weight: 400;
    font-size: 16px;
    position: absolute;
    right: 10px;
  }
  .con_son {
    border-bottom: 1px solid rgb(226, 225, 225);
  }
  .con2 {
     position: relative;
  }
</style>