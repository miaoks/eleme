<template>
  <div>
    <Header :left_msg="left" middle_msg="传递的分类"></Header>
    <div class="nav">
      <div class="nav_tit" @click="select
      (1)" :class="{'color':index==1}">
        <span>分类</span>
        <i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':index==1}"></i>
      </div>
      <div class="nav_tit" @click="select(2)" :class="{'color':index==2}">
        <span>排序</span>
        <i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':index==2}"></i>
      </div>
      <div class="nav_tit" @click="select(3)" :class="{'color':index==3}">
        <span>筛选</span>
        <i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':index==3}"></i>
      </div>
      <!-- 第一列表 -->
      <div class="nav_con" v-if="index==1">
        <ul class="nav_left">
          <li v-for="(v,i) in classlist" :key="i" @click="chose(i)" :class="{'bacg':bacindex==i}">
            <span>
              <span style="color:red">图&nbsp;</span>
              <span>{{v.name}}</span>
            </span>
            <span>
              <span
                style="border-radius:30%;background:#CCCCCC;color:white;padding:2px;"
              >{{v.count}}</span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </li>
        </ul>
        <ul class="nav_right">
          <li
            v-for="(val,ind) in classlist[bacindex].sub_categories"
            :key="ind"
            @click="search_food(val.id)"
          >
            <span>{{val.name}}</span>
            <span>{{val.count}}</span>
          </li>
        </ul>
      </div>
      <!-- 第二列 -->
      <div class="nav_con" v-if="index==2">
        <ul class="nav_two">
          <li @click="sortshop(4)" :class="{'sortcolor':sortclass==4}">
            <span>智能排序</span>
            <i class="el-icon-check" v-if="sortclass==4"></i>
          </li>
          <li @click="sortshop(5)" :class="{'sortcolor':sortclass==5}">
            <span>距离最近</span>
            <i class="el-icon-check" v-if="sortclass==5"></i>
          </li>
          <li @click="sortshop(6)" :class="{'sortcolor':sortclass==6}">
            <span>销量最高</span>
            <i class="el-icon-check" v-if="sortclass==6"></i>
          </li>
          <li @click="sortshop(1)" :class="{'sortcolor':sortclass==1}">
            <span>起送价最低</span>
            <i class="el-icon-check" v-if="sortclass==1"></i>
          </li>
          <li @click="sortshop(2)" :class="{'sortcolor':sortclass==2}">
            <span>配送速度最快</span>
            <i class="el-icon-check" v-if="sortclass==2"></i>
          </li>
          <li @click="sortshop(3)" :class="{'sortcolor':sortclass==3}">
            <span>评分最高</span>
            <i class="el-icon-check" v-if="sortclass==3"></i>
          </li>
        </ul>
      </div>
      <!-- 第三列 -->
      <div class="nav_con" v-if="index==3">
        <div class="cont">
          <p style="margin-bottom:2%;">配送方式</p>
          <div class="chose1" @click="songstyle(1)" :class="{'givestyle':songstyle(1)}">
            <span v-if="songstyle(1)" style="color:red">鸟&nbsp;</span>
            <span v-else>✔&nbsp;</span> 蜂鸟专送
          </div>
        </div>
        <div class="cont">
          <p style="margin-bottom:2%;">商家属性(可多选)</p>
          <div class="chose1 chosed" v-for="(v,i) in sjlist" :key="i" @click="filter(v.id)" :class="{'givestyle':cycle(v.id)}">
            <li>
              <span v-if="!cycle(v.id)" :style="'color:#'+v.icon_color">{{v.icon_name}}&nbsp;</span>
              <span v-if="cycle(v.id)">✔&nbsp;</span>
              {{v.name}}
            </li>
          </div>
        </div>
        <div class="cont" style="background:#F1F1F1;">
          <button
            style="width:49%;text-align:center;line-height:30px;background:white;border-radius:5px;border:none;outline:none;"
            @click="cleararr()"
          >清空</button>
          <button
            style="width:49%;text-align:center;line-height:30px;background:#56D176;border-radius:5px;border:none;outline:none;color:white;"
            @click="btn_m()"
          >确定</button>
        </div>
      </div>
    </div>
    <section class="shop_list">
      <ul
        class="store_wrap"
        v-for="value in store_data"
        :key="value.id"
        @click.capture.stop="to_store_details(value)"
      >
        <li class="store">
          <div class="store_left">
            <img :src="'//elm.cangdu.org/img/'+value.image_path" alt>
          </div>
          <div class="store_right">
            <div class="store_info">
              <p>
                <span class="brand">品牌</span>
                <span class="effect">{{value.name}}</span>
              </p>
              <p>
                <!-- <span>五角星</span>
                <span>rating</span>-->
                <!-- 评分引入 -->
                <el-rate
                  class="revise_star"
                  v-model="value5"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <span class="sales">月售{{value.recent_order_num}}单</span>
              </p>
              <p>
                <span class="fee">￥{{value.float_delivery_fee}}起送</span>
                <span class="fee">/</span>
                <span class="fee">配送费约￥{{value.float_minimum_order_amount}}</span>
              </p>
            </div>
            <div class="store_details">
              <p>保准票</p>
              <p>
                <span class="dispatch">蜂鸟专送</span>
                <span class="ontime">准时达</span>
              </p>
              <p>
                <span class="distance">{{value.distance}}</span>
                <span class="distance">/</span>
                <span class="time">{{value.order_lead_time}}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      index: "",
      classlist: "",
      bacindex: 0,
      sjlist: "",
      store_data: "",
      value5: 3,
      idarr: [],
      sortclass: "",
      delivery_modearr:[]
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
    console.log(this.$store.state.guess_city_infor);
    if (this.$store.state.guess_city_infor) {
      //   获取所有商铺分类列表
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/v2/restaurant/category",
        query: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude
        }
      }).then(res => {
        console.log(res.data, "第一列");
        this.classlist = res.data;
      });
      //   请求商家列表 第三列
      this.$http({
        method: "get",
        url:
          "https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes",
        query: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude
        }
      }).then(re => {
        console.log(re.data, "第三列");
        //   this.classlist=res.data;
        this.sjlist = re.data;
      });
      // 根据餐馆分类获取餐馆列表
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude,
          restaurant_category_id: 20
        }
      }).then(r => {
        console.log(r.data, 111111);
        console.log(this.$store.state.guess_city_infor.longitude);
        this.store_data = r.data;
      });
    } else {
      this.$router.push({
        name: "home"
      });
    }
  },
  methods: {
    select(v) {
      if (this.index == v) {
        this.index = "";
      } else {
        this.index = v;
      }
    },
    chose(i) {
      this.bacindex = i;
    },
    //   详细分类
    search_food(id) {
      console.log(id);
      console.log("to_store_details ");
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude,
          restaurant_category_ids: [id]
        }
      }).then(r => {
        (this.index = ""), console.log(r.data, 111111);
        this.store_data = r.data;
      });
    },
    // 对餐馆排序
    sortshop(id) {
      this.sortclass = id;
      console.log(id);
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude,
          order_by: id
        }
      }).then(r => {
        (this.index = ""), console.log(r.data, "排序结果");
        this.store_data = r.data;
      });
    },
    // 对餐馆筛选
    filter(id) {
        console.log(this.cycle(id))
        if (this.cycle(id)) {
            this.idarr.splice(this.cycle(id)-1,1)
        }else{
            this.idarr.push(id);
      console.log(this.idarr, "添加");
        }
    },
    cleararr() {
      this.idarr = [];
      console.log(this.idarr, "清空");
    },
    // 配送方式
    songstyle(id) {
        if (this.delivery_modearr[0]==1) {
            this.delivery_modearr=[]
            return false;
        }else{
            this.delivery_modearr=[1]
            return true;
        }
    },
    // 筛选后请求
    btn_m() {
      console.log("请求");
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.$store.state.guess_city_infor.latitude,
          longitude: this.$store.state.guess_city_infor.longitude,
          support_ids: this.idarr,
          delivery_mode: this.delivery_modearr,
        }
      }).then(r => {
          this.index=""
        console.log(r.data, "筛选结果");
        this.store_data = r.data;
      });
    },
    cycle(num) {
      for (var i = 0; i < this.idarr.length; i++) {
        if (num === this.idarr[i]) {
          return true+i;
        }
      }
      return false;
    },
    // 去商店详情
    to_store_details(id) {
      // this.$router.push({name:"storeDetail",params:{store_data:id}})
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 52px;
  width: 100%;
  background: #f2f2f2;
  font-size: 0;
  z-index: 100;
}
.nav_tit {
  display: inline-block;
  box-sizing: border-box;
  width: 33.3%;
  padding: 10px;
  border: 1px solid rgb(160, 159, 159);
  text-align: center;
  background: white;
}
.nav_tit {
  font-size: 14px;
  color: #333;
}
.color {
  color: #3190e8 !important;
}
.nav_con {
  width: 100%;
  background: white;
  height: 322px;
  overflow: hidden;
  position: relative;
}
.nav_left {
  width: 50%;
  background: #f1f1f1;
  display: inline-block;
  position: absolute;
  top: 0;
}
.nav_left li {
  font-size: 12px;
  color: #666;
  padding: 6% 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.bacg {
  background: white;
}
.nav_right {
  width: 50%;
  background: white;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
}
.nav_right li {
  font-size: 12px;
  padding: 5% 3%;
  box-sizing: border-box;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
}
/* 排序 */
.nav_two {
  width: 100%;
  background: white;
  box-sizing: border-box;
  font-size: 14px;
}
.nav_two li {
  box-sizing: border-box;
  width: 100%;
  padding: 3% 3%;
  margin-left: 3%;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
}
.sortcolor {
  color: rgb(16, 16, 175);
}
/* 第三列 */
.cont {
  width: 100%;
  background: white;
  box-sizing: border-box;
  font-size: 14px;
  padding: 3%;
}
.cont div {
  display: inline-block;
}
.chose1 {
  border: 1px solid grey;
  padding: 2%;
  width: 25%;
  /* box-sizing: border-box; */
  /* text-align: center; */
}
.chosed {
  margin: 1%;
}
.givestyle {
  color: blue;
}
.shopstyle {
  color: blue;
}
/* 店铺展示 */
.shop_list {
  width: 100%;
  background: white;
  position: relative;
  top: 87px;
}
.show_wrap {
  height: 44px;
  margin-top: 20px;
  background-color: white;
  line-height: 44px;
}
.showtitle_txt {
  height: 16px;
  font-size: 16px;
  margin-left: 3%;
  color: #666;
}
.showtitle_img {
  height: 20px;
  line-height: 20px;
  color: #666;
}
.store_wrap {
  height: 118px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  overflow: hidden;
}
.store {
  margin: 20px 3%;
  height: 80px;
  /* background-color: yellowgreen; */
  width: 94%;
}
.store_left {
  height: 72px;
  width: 18%;
  float: left;
  /* background-color: gray; */
}
.store_left img {
  height: 72px;
}
.store_right {
  height: 80px;
  width: 80%;
  float: right;
  /* background-color: aqua; */
}
.store_info {
  height: 80px;
  width: 50%;
  float: left;
  /* background: purple; */
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.store_details {
  height: 80px;
  width: 50%;
  float: right;
  /* background-color: aqua; */
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.store_info p {
  /* height: 10px; */
  width: 100%;
  /* background-color: green; */
  text-align: left;
  position: relative;
}
/* .store_info p:nth-child(1) {
          height: 18px;
          line-height: 18px;
          font-size: 17px;
          font-weight: 700;
        } */
.brand {
  height: 18px;
  line-height: 18px;
  font-size: 14px;
  font-weight: 700;
  padding: 0 3px;
  color: #333;
  background-color: #ffd930;
  border-radius: 3px;
}
.effect {
  height: 18px;
  line-height: 18px;
  font-size: 17px;
  font-weight: 700;
}
.store_info p:nth-child(2) {
  height: 16px;
  line-height: 16px;
}
/* 评分样式设置 */
.revise_star {
  transform-origin: left;
  display: inline-block;
  transform: scale(0.7);
  position: absolute;
  left: 0;
}
.sales {
  height: 16px;
  font-size: 8px;
  position: absolute;
  right: 0;
}
/* .store_info p:nth-child(3) {
          height: 16px;
          line-height: 16px;
        } */
.fee {
  height: 16px;
  line-height: 16px;
  color: #666;
  font-size: 12px;
}
.store_details p {
  height: 10px;
  width: 100%;
  /* background-color: orchid; */
  text-align: right;
}
.store_details p:nth-child(1) {
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: #999;
}
.store_details p:nth-child(2) {
  height: 16px;
  line-height: 16px;
}
.dispatch {
  /* height: 16px;
          line-height: 16px; */
  font-size: 8px;
  color: #fff;
  background-color: #3190e8;
  border: 1px solid #3190e8;
  border-radius: 3px;
}
.ontime {
  height: 16px;
  line-height: 16px;
  font-size: 8px;
  color: #3190e8;
  border: 1px solid #3190e8;
  border-radius: 3px;
}
.store_details p:nth-child(3) {
  height: 16px;
  line-height: 16px;
}
.distance {
  font-size: 12px;
  color: #999;
}
.time {
  font-size: 12px;
  color: #3190e8;
}
</style>
