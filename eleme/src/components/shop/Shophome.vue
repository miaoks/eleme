<template>
  <div class="shopwrap">
    <!-- 导航条 -->
    <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
    <div class="swiper">
      <!-- 轮播图 -->
      <swiper :options="swiperOption"  v-if="category_first.length>0">
        <swiper-slide>
          <ul>
            <li class="special" v-for="(value,index) in category_first" :key="index" @click="to_restaruant()">
              <div class="special_wrap">
                <img class="special_img" :src="'https://fuss10.elemecdn.com/'+value.image_url">
                <div class="special_txt">{{value.title}}</div>
              </div>
            </li>
          </ul>
        </swiper-slide>
        <swiper-slide >
          <ul>
            <li class="special" v-for="(value,index) in category_second" :key="index" @click="to_restaruant()">
              <div class="special_wrap">
                <img class="special_img" :src="'https://fuss10.elemecdn.com/'+value.image_url">
                <div class="special_txt">{{value.title}}</div>
              </div>
            </li>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
      <!-- 商品展示 -->
      <section>
        <p class="show_wrap">
          <i class="el-icon-printer showtitle_txt"></i>
          <span class="showtitle_img">附近商家</span>
        </p>
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
    </div>
    <!-- 脚注 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/footer";
export default {
  data() {
    return {
      left: "el-icon-search",
      middle: "",
      right: true,
      value5:3.7,
      //   swiper 数据引用
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      //商品分类数据
      category_first: [],
      category_second: [],
      category:[],
      //   //评分数据
      //   value5: 3.7,
      //商铺数据
      store_data: " "
      //   保存请求的位置
    };
  },
  created() {
    //   导航城市判断
    if (this.$route.params.msg == null) {
      console.log("aaaa")
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v1/cities",
        params: {
          type: "guess"
        }
      }).then(res => {
        this.middle = res.data.name;
        console.log( res.data.latitude)
        this.requeststore(
          res.data.latitude,
          res.data.longitude
        );
      });
    } else {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v2/pois/" + this.$route.params.msg.geohash
      }).then(res => {
        // console.log(res.data,"ffff")
        localStorage.lati=res.data.latitude;
        localStorage.longi=res.data.longitude;
        console.log(localStorage.lati,localStorage.longi,"ffff")
        this.middle = res.data.name;
        console.log(this.middle);
      });
      //  店铺请求调用
      this.requeststore(
        localStorage.lati,
        localStorage.longi
      );
      
    }
    // 店铺分类应用
    this.requestcategory();
  },
  methods: {
    // 跳转到餐馆分类
    to_restaruant(){
      this.$router.push({name:"searchResturant", params:{"restaruant_data":this.category}})
    },
    // 请求商品
    requestcategory() {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/v2/index_entry"
      }).then(res => {
        // console.log(res.data);
        this.category_first = res.data.slice(0, 8);
        this.category_second = res.data.slice(8, 16);
        this.category=res.data;
      });
    },
    // 请求商铺
    requeststore(lat, lon) {
      console.log(lat, lon)
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: lat,
          longitude: lon
        }
      }).then(res => {
        this.store_data = res.data;
        console.log(res.data,"9999")
      });
    },
    // 跳转店铺详情
    to_store_details(m) {
      console.log(m);
      this.$router.push({ name: "storeDetail", params: { store_data: m } });
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.shopwrap {
  background-color: #f5f5f5;
}
/* 轮播图引入样式设置 */
.swiper-pagination-bullet-custom {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}
/* swiper自己设置 */
/* swiper基础样式设置 */
.swiper {
  position: relative;
  top: 52px;
  overflow: hidden;
}
.swiper-container {
  padding-top: 5px;
  height: 216px;
  background-color: white;
  padding-bottom: 20px;
}
.special {
  width: 25%;
  height: 100px;
  float: left;
  /* border: 1px solid gray; */
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px 0;
}
.special_wrap {
  height: 80px;
  /* background-color: pink; */
  position: relative;
}
.special_img {
  width: 54%;
  height: 48px;
  position: absolute;
  /* background-color: green; */
  top: 0;
  left: 23%;
}
.special_txt {
  width: 54%;
  height: 20px;
  position: absolute;
  /* background-color: gray; */
  bottom: 0;
  left: 23%;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  color: #666;
  font-weight: 400;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  margin-bottom: 20px;
}
/* 店铺展示 */
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
