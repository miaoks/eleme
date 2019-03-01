<template>
  <div>
    <section  v-if="!contrue">
      <Header :left_msg="left" middle_msg="服务中心" :right_msg="0"></Header>
      <section class="ser_wrap">
        <div class="quesstyle">
          <div>在线提问</div>
          <div>在线客服</div>
        </div>
        <div class="hot_ques">热门问题</div>
        <div class="ser_con" v-for="(v,i) in ser_arr" :key="i" @click="contrue=!contrue">
          <span>{{v}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </section>
    </section>
    <section v-if="contrue">
         <i
        class="el-icon-arrow-left"
        style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;"
        @click="contrue=!contrue"
      ></i>
        <Header :left_msg="left" middle_msg="服务中心" :right_msg="0"></Header>
        <span>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
            方式都是一样的<br>
        </span>
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      ser_arr: [
        "超级会员",
        "签到规则",
        1,
        2,
        12,
        21,
        3,
        13,
        13,
        21432,
        4,
        32,
        43,
        134,
        13,
        51,
        53,
        1351,
        451,
        451151,
        5,
        1,
        43,
        5134,
        5,
        1543,
        5134,
        1,
        12,
        341,
        41,
        431
      ],
      contrue: false
    };
  },
  components: {
    Header
  }
};
</script>

<style>
.ser_wrap {
  position: absolute;
  top: 50px;
  width: 100%;
}
.quesstyle {
  width: 100%;
  font-size: 0;
}
.quesstyle div {
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  font-size: 16px;
  padding: 10% 0;
}
.hot_ques {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  padding: 5% 2%;
}
.ser_con {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  padding: 4% 2%;
  font-size: 12px;
  color: #8a8787;
  display: flex;
  justify-content: space-between;
}
</style>
