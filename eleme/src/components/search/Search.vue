<template>
  <div>
    <Header :left_msg="left" middle_msg="搜索"></Header>
    <div class="ser_con">
      <section class="ser_sec1">
        <el-input placeholder="请输商家或美食名称" v-model="input10" clearable></el-input>
        <button class="ser_btn" @click="serbtn">提交</button>
      </section>
      <!-- 搜索内容 -->
      <ul v-if="storearr.length>0" class="ul11">
        <p style="padding:3%;background:#F2F2F2;width:100%;box-sizing:border-box;">商家</p>
        <li v-for="(res,index) in storearr" :key="index" class="lione" @click="goshop(res)">
          <div style="vertical-align: top;margin-left:10px;">
            <img :src="'//elm.cangdu.org/img/'+res.image_path" style="width:40px;">
          </div>
          <div style="font-size:12px;width:85%;border-bottom:1px solid grey;padding-bottom:10px;margin-bottom:20px;">
            <p style="">
              <span>{{res.name}}</span>
              <span style="color: rgb(255, 96, 0); font-size: 9px; font-weight: bold;">支付</span>
            </p>
            <p  style="line-height:35px;">
              <span>月售</span>
              {{res.recent_order_num}}
              <span>单</span>
            </p>
            <p>{{res.float_minimum_order_amount}}/{{res.distance}}</p>
          </div>
        </li>
      </ul>

      <!-- 搜索历史 -->
      <ul class="ser_ul" v-if="inphistory!=''&&storearr.length==0">
        <p style="padding:3%;background:#F2F2F2;width:100%;box-sizing:border-box;">搜索历史</p>
        <li v-for="(v,i) in inphistory" :key="i">
          <p>
            <span>{{v}}</span>
            <i class="el-icon-close" @click="delhistory(i)"></i>
          </p>
        </li>
        <p
          style="width:100%;text-align:center;padding:10px 0;background:white;"
          @click="clear()"
        >清空搜索历史</p>
      </ul>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      input10: "",
      inphistory: [],
      storearr: ""
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    serbtn() {
      console.log(this.$store.state, 1111);
      console.log(this.input10);
      if (this.input10 != "") {
        this.$set(this.inphistory, this.inphistory.length, this.input10);
        this.$http({
          methood: "get",
          url: "https://elm.cangdu.org/v4/restaurants/",
          params: {
            geohash:
              this.$store.state.guess_city_infor.latitude +
              "," +
              this.$store.state.guess_city_infor.longitude,
            keyword: this.input10
          }
        }).then(res => {
          console.log(res, 0);
          this.storearr = res.data;
        });
      }
    },
    delhistory(i) {
      this.inphistory.splice(i, 1);
    },
    // 清空历史记录
    clear() {
      this.inphistory = [];
      this.conOrhistory = false;
    },
    goshop(v){
    this.$router.push({name:"shophome",params:{store_date:v}})
    console.log(v,10)
  }
  },
  
};
</script>

<style scoped>
.ser_con {
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #f2f2f2;
}
.ser_sec1 {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  background: white;
}
.ser_ul {
  width: 100%;
  background: white;
  position: absolute;
  top: 75px;
  /* width: 96%; */
  box-sizing: border-box;
}
.ser_ul li {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 3%;
  background: white;
  border-bottom: 1px solid grey;
}
.el-icon-close {
  position: absolute;
  right: 10px;
}
.el-input {
  width: 70%;
  color: #333;
}
.ser_btn {
  width: 25%;
  height: 40px;
  border: none;
  outline: none;
  background: #3190e8;
  border-radius: 5px;
}
.lione {
  border-bottom: 1px solid grey;
  background: white;
  padding-top:10px;
}
.lione div {
  display: inline-block;
}
.ul11{
  position: absolute;
  top: 75px;
  width: 100%;
  box-sizing: border-box;
}
</style>