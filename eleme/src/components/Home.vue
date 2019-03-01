<template>
  <div class="hello">
    <!-- 导航条 -->
    <div class="nav">
      <span class="mark">ele.me</span>
      <span class="sign">
        <!-- &#xe65e; -->
        <span class="iconfont" v-if="!this.$store.state.res"><router-link to="/login" class="login">登陆</router-link>
        |<router-link to="/login" class="login">注册</router-link></span>
        <span class="iconfont login" v-if="this.$store.state.res"><router-link to="/profile" class="login">&#xe65e;</router-link>
      </span>
      </span>
       
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <!-- 当前定位城市 -->
      <div class="posCity">
        <span class="curCity">当前定位城市:</span>
        <span class="posText">定位不准时，请在城市列表中选择</span>
      </div>
      <div class="currentCity" @click="search(id,name)">
        <span class="finCity">{{name}}</span>
        <span class="bracket">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="backgroundDiv"></div>
      <!--热门城市-->
      <h4 class="hotCity">热门城市</h4>
      <ul class="hotcityShow">
        <li v-for="value in hotName" :key="value.id" class="enterCity"><span class="cityColor" @click="search(value.id,value.name)">{{value.name}}</span></li>
      </ul>
      <div class="backgroundDiv"></div>
      <!-- 所有城市 -->
      <ul v-for="(value,index) in groupWrap()" :key="index" class="groupcityWrap">
        <h4 class="word">{{value}}</h4>
        <li v-for="(v,i) in groupName[value]" :key="i" class="groupCity"><span class="groupCitycolor" @click="search(v.id,v.name)">{{v.name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      hotName: [],
      groupName: {},
      id:""
    };
  },
  created() {
    this.guessCity();
    this.hotCity();
    this.groupCity();
    this.groupWrap();
    // console.log(typeof(this.$store.state.res),"cccc")
    
  },
  methods: {
    search(id,name){
      this.$router.push({name:"searchCity",params:{cityid:id,cityname:name}})
    },
    guessCity() {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v1/cities",
        params: {
          type: "guess"
        }
      }).then(res => {
        this.name = res.data.name;
        this.id = res.data.id;
        // console.log(res.data);
        this.$store.commit("updated_guess_city",res.data)
        console.log(this.$store.state.guess_city_infor.name,1111)
      });
    },
    hotCity() {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v1/cities",
        params: {
          type: "hot"
        }
      }).then(res => {
        // console.log(res.data);
        this.hotName = res.data;
      });
    },
    groupCity() {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v1/cities",
        params: {
          type: "group"
        }
      }).then(res => {
        // console.log(res.data);
        this.groupName = res.data;
      });
    },
    groupWrap() {
      let keyValue = [];
      for (let key in this.groupName) {
        keyValue.push(key);
      }
      return keyValue.sort();
      // console.log(keyValue);
      console.log(this.groupName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 导航条样式设置 */
.nav {
  width: 100%;
  height: 52px;
  background-color: #3190e8;
  color: white;
  position: fixed;
  z-index: 100;
}
.mark {
  height: 18px;
  position: absolute;
  top: 26px;
  margin-top: -9px;
  left: 3%;
  font-size: 20px;
}
.sign {
  height: 18px;
  position: absolute;
  top: 26px;
  margin-top: -9px;
  right: 3%;
}
.iconfont {
  font-size: 20px;
}
.login{
  color: white;
}
/* 下半部分样式设置 */
.content {
  width: 100%;
  position: relative;
  top: 52px;
  overflow: hidden;
}
.posCity {
  margin-top: 10px;
  height: 38px;
  position: relative;
}
.posCity span {
  position: absolute;
  line-height: 38px;
}
.curCity {
  left: 3%;
  color: #666;
  font-size: 15px;
  font-weight: 400;
}
.posText {
  right: 3%;
  color: #9f9f9f;
  font-weight: 900;
  font-size: 13px;
}
.currentCity {
  height: 48px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
  position: relative;
}
/* 定位城市设置 */
.bracket {
  position: absolute;
  right: 3%;
  top: 24px;
  font-size: 20px;
  margin-top: -10px;
  color: #9f9f9f;
}
.el-icon-arrow-right {
  font-weight: 1000;
}
.finCity {
  position: absolute;
  left: 3%;
  top: 24px;
  font-size: 16px;
  margin-top: -8px;
}
a {
  color: #9f9f9f;
}
.backgroundDiv {
  height: 10px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e4e4e4;
}
/* 热门城市设置 */
/* .hcityWrap {
  width: 100%;
  height: 64px;
  position: relative;
} */
.hotCity {
  height: 42px;
  line-height: 42px;
  color: #666;
  font-size: 14px;
  margin-left: 3%;
}
.cityColor{
  color:#3190e8;
}
.hotcityShow {
  overflow: hidden;
  border-top: 1px solid #e4e4e4;
}
.enterCity {
  width: 25%;
  box-sizing: border-box;
  height: 47px;
  float: left;
  line-height: 47px;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
}
.hotcityShow li:nth-child(4) {
  border-right: none;
}
.hotcityShow li:nth-child(8) {
  border-right: none;
}
/* 所有城市列表 */
.groupcityWrap {
  overflow: hidden;
}
.word {
  height: 42px;
  /* width: 100%; */
  line-height: 42px;
  border-bottom: 1px solid #e4e4e4;
  text-indent: 3%;
}
.groupCity {
  width: 25%;
  box-sizing: border-box;
  height: 47px;
  float: left;
  line-height: 47px;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.groupCitycolor{
  color:#666;
}
</style>
