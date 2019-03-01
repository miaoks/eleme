<template>
  <div>
    <section v-if="!djq&&!hbsm&&!cklshb&&!duihuanhb&&!recommend">
      <Header :left_msg="left" middle_msg="我的优惠" :right_msg="0"></Header>
      <div class="dis_wrap">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          text-color="#333"
          active-text-color="#3190e8"
          default-active="1"
        >
          <el-menu-item
            index="1"
            style="margin-left:15%;font-size:20px;line-height:80px;"
            @click="change_red=true"
          >红包</el-menu-item>
          <el-menu-item
            index="2"
            style="margin-left:20%;font-size:20px;line-height:80px;"
            @click="change_red=false"
          >商家代金券</el-menu-item>
        </el-menu>
        <section v-if="change_red">
          <div class="con_one">
            <span>
              有
              <span style="color:red;">{{list_red.length}}</span>个红包即将到期
            </span>
            <span>
              <i class="el-icon-question" style="color:#3190e8;background:white;"></i>
              <span style="color:#3190e8;" @click="hbsm=!hbsm">红包说明</span>
            </span>
          </div>
          <ul class="dis_ul" v-for="(v,i) in list_red" :key="i">
            <div class="top_img"></div>
            <li>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p style="color:red;">
                      ￥
                      <span style="font-size:40px;">{{parseInt(v.amount)}}</span>
                      <span>.{{(v.amount-parseInt(v.amount))*10}}</span>
                    </p>
                    <p style="font-size:14px;color: #999;">{{v.description_map.sum_condition}}</p>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <div style="border-left:1px solid gray;height:50px;"></div>
                  </div>
                </el-col>
                <el-col :span="13">
                  <div class="grid-content bg-purple">
                    <p style="font-size:25px;color: #999;">{{v.name}}</p>
                    <p
                      style="font-size:10px;margin-top:5px;color: #999;"
                    >{{v.description_map.validity_periods}}21212</p>
                    <p
                      style="font-size:10px;margin-top:5px;color: #999;"
                    >{{v.description_map.phone}}</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div
                    class="grid-content bg-purple"
                    style="font-size:20px;color:red;text-align:right;"
                  >{{v.description_map.validity_delta}}</div>
                </el-col>
              </el-row>
            </li>
          </ul>
          <p style="margin:3%;width:94%;font-size:14px;color:#999;">限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</p>
          <p style="text-align:center;color:#999;margin-top:10%;" @click="cklshb=!cklshb">查看历史红包></p>
        </section>
        <section v-if="!change_red&&!djq">
          <p style="text-align:right;">
            <i class="el-icon-question" style="color:#3190e8;background:white;"></i>
            <span
              style="color:#3190e8;margin-right:10px;font-size:14px;"
              @click="djq=!djq,change_red=true"
            >商家代金券说明</span>
          </p>
          <div style="text-align:center;margin-bottom:66%;">
            <img src="..\..\..\assets\none.png" alt>
            <p>无法使用代金券</p>
            <p style="font-size:12px;margin:10px;color:gray;">非客户端或客户版本过低</p>
            <button style="background:blue;height:40px;border-radius:5px;border:none;">下载或升级客户端</button>
          </div>
        </section>
      </div>
      <div class="dis_foot">
        <div @click="duihuanhb=!duihuanhb,dis_getCode()">兑换红包</div>
        <div @click="recommend=!recommend">推荐有奖</div>
      </div>
    </section>
    <!-- 代金券说明 -->
    <section v-if="djq">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="djq=!djq"
      ></i>
      <Header :left_msg="0" middle_msg="代金券说明" :right_msg="0"></Header>
      <div style="position:absolute;top:60px;width:96%;margin:0 2%;">
        <h2 style="margin:10px 0">Q1: 什么是商家代金券？</h2>
        <p style="line-height:25px">商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额</p>
        <h2 style="margin:10px 0">Q2: 怎么获得商家代金券？</h2>
        <p style="line-height:25px">进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。
          <br>「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。
        </p>
        <h2 style="margin:10px 0">Q3: 商家代金券使用条件</h2>
        <p style="line-height:25px">商家代金券仅限在指定商家使用
          <br>商家代金券仅限在线支付使用
          <br>每个订单只能使用一张商家代金券，不可与其他代金券叠加使用
        </p>
      </div>
    </section>
    <!-- 红包说明 -->
    <section v-if="hbsm">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="hbsm=!hbsm"
      ></i>
      <Header :left_msg="0" middle_msg="红包说明" :right_msg="0"></Header>
      <div style="position:absolute;top:60px;width:96%;margin:0 2%;">
        <h2 style="margin:10px 0">Q1: 什么是红包？</h2>
        <p style="line-height:25px">红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱红包就是钱</p>
        <h2 style="margin:10px 0">Q2: 太占位置了</h2>
        <p
          style="line-height:25px"
        >我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅我就不复制粘贴了,大家见谅</p>
      </div>
    </section>
    <!-- 查看历史红包-->
    <section v-if="cklshb">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:fixed;color:white;font-size:30px;top:10px;left:10px;"
        @click="cklshb=!cklshb"
      ></i>
      <Header :left_msg="0" middle_msg="历史红包" :right_msg="0"></Header>
      <div style="position:absolute;top:60px;width:96%;margin:0 2%;">
        <ul class="dis_ul" v-for="(v,i) in history_red" :key="i">
          <div class="top_img2"></div>
          <li>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <p style="color:darkgray;">
                    ￥
                    <span style="font-size:40px;">{{parseInt(v.amount)}}</span>
                    <span>.{{(v.amount-parseInt(v.amount))*10}}</span>
                  </p>
                  <p style="font-size:12px;color: darkgray;">{{v.description_map.sum_condition}}</p>
                </div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div style="border-left:1px solid gray;height:50px;"></div>
                </div>
              </el-col>
              <el-col :span="13">
                <div class="grid-content bg-purple">
                  <p style="font-size:25px;color: #999;">{{v.name}}</p>
                  <p
                    style="font-size:10px;margin-top:5px;color: #999;"
                  >{{v.description_map.validity_periods}}21212</p>
                  <p style="font-size:10px;margin-top:5px;color: #999;">{{v.description_map.phone}}</p>
                </div>
              </el-col>
              <el-col :span="4">
                <div
                  class="grid-content bg-purple"
                  style="font-size:28px;color:#999;text-align:right;"
                >已过期</div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
    </section>
    <!-- 兑换红包 -->
    <section v-if="duihuanhb">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="duihuanhb=!duihuanhb"
      ></i>
      <Header :left_msg="0" middle_msg="兑换红包" :right_msg="0"></Header>
      <div style="position:absolute;top:60px;width:96%;margin:0 2%;">
        <input
          style="padding:3%;font-size:20px;width:94%;outline:none;"
          type="text"
          placeholder="请输入兑换码"
          v-model="duihuanma"
        >
        <input
          v-model="dismycode"
          type="text"
          placeholder="验证码"
          style="padding:3%;font-size:20px;width:60%;outline:none;"
        >
        <span style="display:inline-block;padding-top:10px; width:30%;" @click=" dis_getCode()">
          <img :src="discodeImg" style="width:50%;">
          <div style="height:40px;width:50px;display:inline-block;width:40%;">
            <span style="font-size:30%;">看不清</span>
            <br>
            <span style="color:#3190E8;font-size:30%;">换一张</span>
          </div>
        </span>
        <input
          :class="{'dis_btn':duihuanma&&dismycode.length==4}"
          type="button"
          style="padding:3%;font-size:20px;width:94%;outline:none;color:white;"
          value="兑换"
          @click="disbtn()"
        >
        <div
          v-if="dis_hb"
          style="position:fixed;width:60%;background:gray;padding-bottom:60%;margin:-20% 20% 0;"
        >
          <p style="text-algin:center;font-size:50px;position:absolute;">{{hongbao.data.message}}</p>
          <button
            @click.stop="dis_hb=!dis_hb"
            style="position:absolute;bottom:0;color:white;background:red;width:100%;height:50px;z-index:100;font-size:30px;"
          >确定</button>
        </div>
      </div>
    </section>
    <section v-if="recommend">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="recommend=!recommend"
      ></i>
      <Header :left_msg="0" middle_msg="推荐有奖" :right_msg="0"></Header>
      <div
        style="width:100%;text-algin:center;top:150px;position:absolute;"
      >这里只是一个静态页面和一个弹框,和其他的都差不多,有空在完善</div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
export default {
  data() {
    return {
      // 推荐
      recommend: false,
      // 兑换红包
      duihuanhb: false,
      dis_hb: false,
      hongbao: "",
      left: "el-icon-arrow-left",
      list_red: "",
      change_red: true,
      // 历史红包
      history_red: "",
      // 代金券说明判断
      djq: false,
      hbsm: false,
      // 查看吧历史红包
      cklshb: false,
      // 验证码
      discodeImg: "",
      dismycode: "",
      duihuanma: ""
    };
  },
  components: {
    Header
  },
  created() {
    this.request();
  },
  methods: {
    request() {
      if (this.$store.state.res != "") {
        // 可用红包
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/promotion/v2/users/" +
            this.$store.state.res.data.user_id +
            "/hongbaos?limit=20&offset=0"
        }).then(res => {
          // console.log(res)
          this.list_red = res.data;
        });
        // 历史红包
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/promotion/v2/users/" +
            this.$store.state.res.data.user_id +
            "/expired_hongbaos?limit=20&offset=0"
        }).then(res => {
          console.log(res);
          this.history_red = res.data;
        });
      }
    },
    disbtn() {
      if (this.dismycode.length == 4 && this.duihuanma) {
        this.$http({
          method: "POST",
          url:
            "https://elm.cangdu.org/v1/users/" +
            this.$store.state.res.data.user_id +
            "/hongbao/exchange",
          withCredentials: true, // 默认false
          data: {
            exchange_code: this.duihuanma,
            captcha_code: this.dismycode
          }
        }).then(res => {
          this.hongbao = res;
          console.log(res);
          this.dis_getCode();
          this.dis_hb = !this.dis_hb;
        });
      }
    },
    dis_getCode() {
      this.$http({
        method: "POST",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true // 默认false
      }).then(res => {
        if (res.data.status == 200) {
        }
        this.discodeImg = res.data.code;
      });
    }
  }
};
</script>

<style>
.dis_wrap {
  position: relative;
  width: 100%;
  /* border: 1px solid red; */
  top: 40px;
  overflow: hidden;
  background: #f5f5f5;
}
.con_one {
  width: 96%;
  padding: 2%;
  display: flex;
  justify-content: space-between;
}
.dis_ul {
  width: 94%;
  margin: 3%;
}
.dis_ul li {
  width: 94%;
  border-radius: 5px;
  background: white;
  padding: 4% 3%;
}
.top_img {
  background: url(../../../assets/1.png) repeat;
  width: 100%;
  height: 10px;
}
.top_img2 {
  background: darkgray;
  width: 100%;
  height: 10px;
  color: darkgray;
}
.dis_foot {
  position: fixed;
  width: 100%;
  height: 20px;
  bottom: 10px;
  z-index: 100;
  padding: 10px 0;
  font-size: 0;
}
.dis_foot div {
  width: 50%;
  text-align: center;
  display: inline-block;
  color: #555;
  line-height: 40px;
  border: 1px solid #555;
  box-sizing: border-box;
  font-size: 16px;
}
/* 兑换红包的btn */
.dis_btn {
  background: rgb(38, 38, 230);
}
</style>
