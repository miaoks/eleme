<template>
  <div>
    <section class="vue_wrap">
      <div class="wrap">
      <i class="header_left" :class="left_msg" @click="back()"></i>
      <div class="header_middle" @click="resetAddress()">{{middle_msg}}</div>
      <span v-if="right_msg" class="header_right">
        <span v-if="this.$store.state.res==''" @click="tologin()">登陆|注册</span>
        <span class="iconfont login" v-else @click="tomy()">&#xe65e;</span>
      </span>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["left_msg", "middle_msg", "right_msg"],
  data() {
    return {
      left: this.left_msg
    };
  },
  methods: {
    back() {
      if (this.left == "el-icon-arrow-left") {
        this.$router.go(-1);
      } else if (this.left == "el-icon-search") {
        this.$router.push({ name: "search" });
      }
    },
    resetAddress() {
      this.$router.push({ name: "home" });
    },
    tologin() {
      this.$router.push({ name: "login" });
    },
    tomy() {
      this.$router.push({ name: "profile" });
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 52px;
  background-color: #3190e8;
  position: fixed;
  z-index: 20;
  overflow: hidden;
}
.header_left {
  height: 24px;
  position: absolute;
  left: 3%;
  top: 26px;
  margin-top: -12px;
  color: white;
  text-align: center;
  line-height: 24px;
  font-size: 18px;
}
.header_middle {
  height: 28px;
  width: 216px;
  position: absolute;
  top: 26px;
  left: 50%;
  margin-left: -108px;
  margin-top: -14px;
  color: white;
  text-align: center;
  line-height: 28px;
  font-size: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header_right {
  height: 21px;
  position: absolute;
  right: 3%;
  top: 26px;
  margin-top: -10.5px;
  color: white;
  text-align: center;
  line-height: 21px;
  font-weight: 1000;
  font-size: 18px;
}
</style>