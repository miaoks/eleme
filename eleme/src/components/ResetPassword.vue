<template>
  <div class="hello">
    <!-- 弹窗部分 -->
    <section class="warn" v-if="warn">
      <i class="el-icon-warning warn_pic"></i>
      <p class="warn_text">{{msg}}</p>
      <h1 class="warn_confirm" @click="confirm()">确认</h1>
    </section>
    <div class="titleWrap">
      <i class="el-icon-arrow-left leftBracket" @click="resetback()"></i>
      <h1 class="loginTitle">重置登录</h1>
    </div>
    <div class="valueWrap">
      <input type="text" placeholder="账号" class="account" v-model="username">
    </div>
    <div class="valueWrap">
      <input type="text" placeholder="旧密码" class="password" v-model="oldpassWord">
    </div>
    <div class="valueWrap">
      <input type="text" placeholder="请输入新密码" class="password" v-model="newpassword">
    </div>
    <div class="valueWrap">
      <input type="text" placeholder="请确认新密码" class="password" v-model="confirmpassword">
    </div>
    <div class="valueWrap">
      <input type="text" placeholder="验证码" class="captcha" v-model="captcha_code">
      <img :src="codeImg" class="codeImg">
      <div class="change_img" @click="getCode()">
        <p class="unclear">看不清</p>
        <p class="change">换一张</p>
      </div>
    </div>
    <!-- 确认修改 -->
    <div>
      <div class="resetWrap">
        <div class="registerButton" @click="login()">确认修改</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      codeImg: "",
      value1: true,
      value2: true,
      username: "",
      oldpassWord: "",
      newpassword: "",
      confirmpassword: "",
      captcha_code: "",
      warn: false,
      msg: ""
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.$http({
        method: "POST",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true // 默认false
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
        }
        this.codeImg = res.data.code;
        // this.$router.push({name:"my",query:res.data,params:{pID:res.data.id}});
      });
    },
    login() {
      if (!this.username) {
        this.warn = !this.warn;
        this.msg = "请输入手机号/邮箱/用户名";
      } else if (!this.oldpassWord) {
        this.warn = !this.warn;
        this.msg = "请输入旧密码";
      } else if (!this.newpassword) {
        this.warn = !this.warn;
        this.msg = "请输入新密码";
      } else if (!this.confirmpassword) {
        this.warn = !this.warn;
        this.msg = "请确认新密码";
      } else if (!this.captcha_code) {
        this.warn = !this.warn;
        this.msg = "请输入验证码";
      } else if (this.newpassword != this.confirmpassword) {
        this.warn = !this.warn;
        this.msg = "两次密码不一致";
      } else {
        this.$http({
          method: "POST",
          url: "https://elm.cangdu.org/v2/changepassword",
          withCredentials: true, // 默认false
          data: {
            username: this.username,
            oldpassWord: this.oldpassWord,
            captcha_code: this.captcha_code,
            newpassword: this.newpassword,
            confirmpassword: this.confirmpassword
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.warn = !this.warn;
            this.msg = res.data.message;
          } else {
            this.warn = !this.warn;
            this.msg = "修改成功！";
          }
        });
      }
    },
    confirm() {
      this.warn = !this.warn;
    },
    resetback(){
        this.$router.go(-1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 全局设置*/
.hello {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
}
input {
  outline: none;
}
/* 警告设置 */
.warn {
  width: 72%;
  height: 212px;
  left: 14%;
  margin-top: 96px;
  position: absolute;
  text-align: center;
  z-index: 100;
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
}
.warn_pic {
  font-size: 81px;
  margin-top: 20px;
}
.warn_text {
  height: 24px;
  margin-top: 20px;
  line-height: 24px;
  font-size: 18px;
}
.warn_confirm {
  height: 48px;
  margin-top: 20px;
  line-height: 48px;
  background-color: #4cd964;
  border-bottom: 1px solid #4cd964;
  border-radius: 0 0 10px 10px;
  font-size: 700;
  color: white;
}
/* 顶部标题设置*/
.titleWrap {
  position: relative;
  height: 66px;
  margin-bottom: 20px;
}
.leftBracket {
  position: absolute;
  top: 33px;
  margin-top: -12px;
  left: 3%;
  font-size: 24px;
  color: white;
  font-weight: 700;
}
.loginTitle {
  width: 100%;
  height: 66px;
  line-height: 66px;
  text-align: center;
  color: white;
  background-color: #3190e8;
  font-size: 25px;
  font-weight: 1000;
}
/* 密码设置 */
.valueWrap {
  height: 68px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
}
.account {
  height: 28px;
  position: absolute;
  top: 34px;
  margin-top: -14px;
  margin-left: 3%;
  font-size: 25px;
  color: #666;
}
.password {
  height: 28px;
  position: absolute;
  top: 34px;
  margin-top: -14px;
  margin-left: 3%;
  font-size: 25px;
  color: #666;
}
.passwordVal {
  height: 28px;
  position: absolute;
  top: 34px;
  margin-top: -14px;
  right: 3%;
  font-size: 25px;
  color: #666;
}
.captcha {
  height: 28px;
  position: absolute;
  top: 34px;
  margin-top: -14px;
  margin-left: 3%;
  font-size: 25px;
  color: #666;
}
.codeImg {
  height: 40px;
  position: absolute;
  top: 34px;
  margin-top: -20px;
  right: 14%;
  font-size: 25px;
  color: #666;
}
.change_img {
  height: 52px;
  position: absolute;
  top: 7px;
  right: 3%;
  font-size: 18px;
}
.unclear {
  height: 23px;
}
.change {
  height: 23px;
  padding-top: 6px;
  color: #3b95e9;
}
/* 温馨提示 */
.tips {
  height: 42px;
  font-size: 16px;
  line-height: 42px;
  margin-left: 3%;
  color: red;
}
.resetWrap {
  position: relative;
}
.registerButton {
  height: 64px;
  margin: 0 3% 20px;
  line-height: 64px;
  text-align: center;
  background-color: #4cd964;
  border: 1px solid #4cd964;
  border-radius: 6px;
  color: white;
  font-size: 23px;
}
.resetPassword {
  margin-top: 20px;
  position: absolute;
  right: 3%;
  color: #3b95e9;
  font-size: 20px;
}
</style>