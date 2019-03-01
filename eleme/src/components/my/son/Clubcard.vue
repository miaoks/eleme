<template>
  <div>
    <section v-if="!cardinfor&&!buycard&&!exchange&&!buyhistory">
      <Header :left_msg="left" middle_msg="会员中心" :right_msg="0"></Header>
      <div class="cd_wrap">
        <p style="color:#666;padding:10px;">
          为账户
          <b
            style="margin:0 10px;color:black;"
          >{{this.$store.state.res&&this.$store.state.res.data.username}}</b>购买会员
        </p>
        <div class="div_con">
          <div @click="cardinfor=!cardinfor">
            <span>会员特权</span>
            <span style="color:#999;font-size:14px;">
              会员说明
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div>
            <img style="width:35px;" src="../../../assets/sss.jpg" alt>
            <div style="display:inline-block;border:none;">
              <h4>减免配送费</h4>
              <p style="font-size:10px;color:#999;margin:5px 0;">每月减免30单，每日可减免3单，每单最高减4元</p>
              <p style="font-size:10px;color:#999;">蜂鸟专送专享</p>
            </div>
          </div>
          <div>
            <img style="width:35px;" src="../../../assets/qqq.jpg" alt>
            <div style="display:inline-block;border:none;">
              <h4>减免配送费</h4>
              <p style="font-size:10px;color:#999;margin:5px 0;">每月减免30单，每日可减免3单，每单最高减4元</p>
              <p style="font-size:10px;color:#999;">蜂鸟专送专享</p>
            </div>
          </div>
        </div>
        <div class="inpp" style="margin-top:10px;">
          <span>开通会员</span>
        </div>
        <div class="inpp">
          <span style="line-height:40px;">
            1个月
            <b style="color:orange;">￥20</b>
          </span>
          <div
            style="display:inline-block;border:1px solid orange;padding:10px 20px;color:orange;border-radius:5px;"
            @click="buycard=!buycard,add()"
          >购买</div>
        </div>
        <div class="inpp" style="margin:10px 0;" @click="exchange=!exchange">
          <span>兑换会员</span>
          <span style="color:#999;font-size:14px;">
            信用卡号密码
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="inpp" style="margin:10px 0;" @click="buyhistory=!buyhistory">
          <span>购买记录</span>
          <span style="color:#999;font-size:14px;">
            开发票
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
    </section>
    <!-- 会员说明 -->
    <section v-if="cardinfor">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="cardinfor=!cardinfor"
      ></i>
      <Header :left_msg="0" middle_msg="我的优惠" :right_msg="0"></Header>
      <div style="position:absolute;top:52px;width:96%;padding:2%;">
        <h3>我是苗康嵩</h3>
        <p>内容太多,我就不复制了</p>
        <h3>我是苗康嵩</h3>
        <p>内容太多,我就不复制了</p>
        <h3>我是苗康嵩</h3>
        <p>内容太多,我就不复制了</p>
        <h3>我是苗康嵩</h3>
        <p>内容太多,我就不复制了</p>
      </div>
    </section>
    <!-- 购买会员 -->
    <section v-if="buycard">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="buycard=!buycard"
      ></i>
      <Header :left_msg="0" middle_msg="购买会员" :right_msg="0"></Header>
      <div style="position:relative;top:80px;width:96%;padding:2%;text-align:center;">
        <p>支付剩余事件</p>
        <!-- 倒计时 -->
        <div style="font-size:30px;margin-top:30px;">
          <p>00:{{minute}}:{{second}}</p>
        </div>
      </div>
      <div style="position:relative;top:140px;width:94%;padding:3%;background:#F2F2F2;">选择支付方式</div>
      <div
        style="position:relative;top:140px;width:94%;padding:3%;background:white;color:white;border-bottom:1px solid gray;"
      >
        <img
          src="../../../assets/zhifubao.jpg"
          style="width:50px;border-radius:50%;vertical-align: middle;"
        >
        支付宝
        <span @click="col=!col" style="position:absolute;right:10px;font-size:28px;">
          <i class="el-icon-circle-check-outline" :class="{'color':col}"></i>
        </span>
      </div>
      <div
        style="position:relative;top:140px;width:94%;padding:3%;background:white;border-bottom:1px solid gray;"
      >
        <img
          src="../../../assets/weixin.jpg"
          style="width:35px;border-radius:50%;vertical-align: middle;"
        >
        微信
        <span @click="col=!col" style="position:absolute;right:10px;font-size:28px;">
          <i class="el-icon-circle-check-outline" :class="{'color':!col}"></i>
        </span>
      </div>
      <button
        style="position:relative;top:160px;width:94%;margin:3%;background:#45C144;border:none;height:40px;border-radius:5px;color:white;"
      @click="ph=!ph">确认支付</button>
      <div
        v-if="ph"
        style="position:fixed;width:60%;background:gray;padding-bottom:60%;margin:-20% 20% 0;"
      >
        <p style="text-algin:center;font-size:40px;position:absolute;color:white;">当前环境无法支付或支付超时</p>
        <button
          @click.stop="ph=!ph"
          style="position:absolute;bottom:0;color:white;background:#45C144;width:100%;height:50px;z-index:100;font-size:30px;"
        >确定</button>
      </div>
    </section>
    <!-- 兑换会员 -->
    <section v-if="exchange">
        <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="exchange=!exchange"
      ></i>
      <Header :left_msg="0" middle_msg="兑换会员" :right_msg="0"></Header>
      <div style="position:relative;top:60px;width:96%;padding:2%;background:#F2F2F2;">
          <p>兑换成功后将绑定到当前账户: <span>{{this.$store.state.res&&this.$store.state.res.data.username}}</span></p>
          <input v-model="cadenum" type="text" style="width:100%;height:40px;border-bottom:1px solid #F2F2F2;margin-top:10px;" placeholder="请输入10位卡号">
          <input v-model="cadepass" type="text" style="width:100%;height:40px;" placeholder="请输入6位卡密">
          <button :class="{'btncol':cadenum.length==10&&cadepass.length==6}" style="width:90%;height:40px;color:white;margin:20px 5% 0;border:none;outline:none;" @click="exchangefun()">兑换</button>
          <div style="width:100%;text-align:center;margin-top:30px;color:#aaa;margin-left">
              <p>---温馨提示----</p>
              <div style="width:80%;margin-left:20%;text-align:left;">
                  <p style="margin: 5px 0;font-size:12px;">新兑换的会员服务，权益以「会员说明」为准。</p>
                  <p style="margin: 5px 0;font-size:12px;">22222222</p>
                  <p style="margin: 5px 0;font-size:12px;">22222222</p>
                  <p style="margin: 5px 0;font-size:12px;">22222222</p>
                  <p style="margin: 5px 0;font-size:12px;">＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
              </div>
          </div>
      </div>
       <div
        v-if="filedexchange"
        style="position:fixed;width:60%;background:gray;padding-bottom:60%;margin:-20% 20% 0;"
      >
        <p style="text-algin:center;font-size:40px;position:absolute;color:white;">没有请求接口,无效的卡号</p>
        <button
          @click.stop="filedexchange=!filedexchange"
          style="position:absolute;bottom:0;color:white;background:#45C144;width:100%;height:50px;z-index:100;font-size:30px;"
        >确定</button>
        </div>
    </section>
    <section v-if="buyhistory">
        <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="buyhistory=!buyhistory"
      ></i>
      <Header :left_msg="0" middle_msg="购买记录" :right_msg="0"></Header>
      <div style="position:relative;top:60px;width:96%;padding:2%;background:#F2F2F2;text-align:center;">
          <img src="../../../assets/none.png">
          <br>
          <p>没有购买记录</p>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
export default {
  data() {
    return {
        // 购买记录
        buyhistory:false,
        // ////
        filedexchange:false,
        cadenum:'',
        cadepass:'',
        // 兑换会员
        exchange:false,
        ph:false,
      col: false,
      zhifu: true,
      left: "el-icon-arrow-left",
      //   会员说明
      cardinfor: false,
      // 购买会员
      buycard: false,
      minutes: 5,
      seconds: 0,
      time: ""
    };
  },
  components: {
    Header
  },
  methods: {
    //  点击兑换会员
      exchangefun(){
          if (this.cadenum.length==10&&this.cadepass.length==6) {
              this.filedexchange=!this.filedexchange
          }
      },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add: function() {
      var _this = this;
      clearTimeout(this.time);
      this.time = setInterval(function() {
        if (_this.seconds == "00" && _this.minutes != "00") {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes == "00" && _this.seconds == "00") {
          _this.seconds = 0;
          _this.ph=_this.ph
          window.clearInterval(_this.time);
          //   alert("完美");
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  }
};
</script>

<style>
.btncol{
    background: #45c144;
}
.el-icon-circle-check-outline {
  background: rgb(172, 170, 170);
  color: white;
  border-radius: 50%;
}
.color {
  background: #45c144;
}
.cd_wrap {
  position: relative;
  top: 52px;
  background: #f2f2f2;
  width: 100%;
}
.div_con {
  padding-left: 10px;
  background: white;
}
.div_con div:nth-child(1) {
  display: flex;
  justify-content: space-between;
}
.div_con div {
  /* width: 100%; */
  background: white;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.inpp {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}
</style>
