<template>
  <div class="store">
    <!-- 显示页面 -->
    <div class="store_detail_wrap" v-if="page">
      <!-- 背景图片设置 tips-->
      <img :src="'//elm.cangdu.org/img/'+store_data.image_path" alt class="background_pic">
      <!-- 导航条 -->
      <div class="store_detail_nav" @click="back()">
        <!-- 左边返回按钮 -->
        <i class="el-icon-arrow-left left_back"></i>
        <section class="description_header">
          <!-- 右边返回按钮 -->
          <i class="el-icon-arrow-right right_back"></i>
          <!-- 设置背景图片 :style="'background:url(//elm.cangdu.org/img/'+store_data.image_path+');-->
          <div class="storeInformation">
            <!-- <router-link to="storeInformation"> -->
            <!-- 导航左边图片 -->
            <div class="img_wrap">
              <img :src="'//elm.cangdu.org/img/'+store_data.image_path" @click.stop="tostoreInfo()">
            </div>
            <!-- 导航条右边文字 -->
            <section class="right_text" @click.stop="tostoreInfo()">
              <p class="effect">{{store_data.name}}</p>
              <p class="seller">商家配送/分钟送达/{{store_data.piecewise_agent_fee.tips}}</p>
              <p class="seller">公告:{{store_data.promotion_info}}</p>
            </section>
            <div
              @click.stop="to_fetch_hiden()"
              class="discount"
              v-if="store_data.activities.length!=0"
            >
              <p>
                <span
                  class="del"
                  :style="'background-color:#'+store_data.activities[0].icon_color"
                >{{store_data.activities[0].icon_name}}</span>
                {{store_data.activities[0].description}}
              </p>
              <p style="color:white" @click.stop="to_fetch_hiden()">
                {{store_data.activities.length}}个活动
                <i class="el-icon-arrow-right activity"></i>
              </p>
            </div>
            <!-- </router-link> -->
          </div>
        </section>
      </div>
      <!-- 路由跳转部分 -->
      <!-- 标题 -->
      <section class="change_show_type">
        <!-- 商品 -->
        <div class="goods_wrap">
        <router-link :to="{name:'goods',params:{food_list:food_request,detail:this.store_data}}" active-class="_active"><span class="goods">商品</span></router-link>
        </div>
        <!-- 评价 -->
        <div class="rate_wrap">
          <router-link :to="{name:'rate',params:{rate_data:this.store_data}}" active-class="_active"><span class="rate">评价</span></router-link>         
        </div>
      </section>
      <!-- 跳转内容出口 -->
      <router-view></router-view>
    </div>
    <!-- 隐藏页面 -->
    <div class="hide_wrap" v-else>
      <h1 class="store_name">呵呵呵</h1>
      <p class="discount_wra">
        <span class="discount_info">优惠信息</span>
      </p>
      <ul>
        <li class="special_own" v-for="value in store_data.activities" :key="value.id">
          <span class="new" :style="'background-color:#'+value.icon_color">{{value.icon_name}}</span>
          {{value.name}}
        </li>
      </ul>
      <p class="discount_wra">
        <span class="discount_info set2">商家公告</span>
      </p>
      <p class="welcome">{{store_data.promotion_info}}</p>
      <i class="el-icon-circle-close-outline" @click.stop="to_fetch_hiden()"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // localStorage.restaruant_data=this.category
      store_data: this.$route.params.store_data||this.$store.state.restaruant_data,
      page: true,
      food_request:[],
      skyblue:false
    };
  },
  created() {
    console.log(this.$store.state,11111)
    console.log(document.getElementsByClassName("goods_wrap")[0],'0000')
    this.getRestaurant();
    // this.getDetails();
    // console.log(this.$route.params.store_data,0000000);
    // console.log("cccbbb", this.store_data.activities[0].icon_color
  },
  methods: {
    back() {
      this.$router.push({name:"shophome"})
    },
    // 点击隐藏
    to_fetch_hiden() {
      this.page = !this.page;
    },
    // 获取餐馆详情
    // getDetails() {
    //   this.$http({
    //     type: "GET",
    //     url: "https://elm.cangdu.org/shopping/restaurant/1",
    //     params: {
    //       shopid: this.store_data.id
    //     }
    //   }).then(res => {
    //     console.log(res.data,"hhhh");
    //   });
    // },
    // 跳转到餐馆信息里
    tostoreInfo() {
      console.log("111");
      this.$router.push({
        name: "storeInformation",
        params: { detail: this.store_data }
      });
    },
    //获取餐馆分类信息
    getRestaurant() {
      this.$http({
        type: "GET",
        url: "https://elm.cangdu.org/shopping/v2/menu",
        params: {
          restaurant_id: this.store_data.id
        }
      }).then(res => {
        this.food_request=res.data;
        this.$store.commit('revise',res.data)
        console.log(res.data,1111111,this.store_data.id);
         this.$router.push({name:"goods",params:{food_list:this.food_request,detail:this.store_data}})
      });
    }
  }
};
</script>

<style scoped>
.store{
  height:100%;
}
/* 默认显示页面 */
/* 基础设置 */
.store_detail_wrap {
  /* background-color: #f5f5f5; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* opacity: 0.5; */
}
/* 返回按钮设置 */
.left_back {
  position: absolute;
  top: 3%;
  left: 1%;
  font-size: 24px;
  font-weight: bolder;
  color: white;
}
.right_back {
  position: absolute;
  top: 61px;
  right: 1%;
  font-size: 20px;
  margin-top: -11px;

  color: white;
}
/* 头部背景图片设置 */
.background_pic {
  position: absolute;
  width: 100%;
  z-index: -1;
  filter: blur(10px);
}
/* 导航条设置 */
.store_detail_nav {
  width: 100%;
}
/* 上 */
.description_header {
  width: 100%;
  overflow: hidden;
}
.storeInformation {
  overflow: hidden;
  width: 100%;
  padding: 10px 0 0 3%;
  /* overflow: hidden;opacity: 1; */
  background-color: rgba(124, 119, 119, 0.4);
}
.img_wrap {
  height: 80px;
  width: 17%;
  float: left;
  padding-bottom: 10px;
}
.img_wrap img {
  height: 78px;
}
.right_text {
  height: 80px;
  width: 79%;
  /* background-color: blueviolet; */
  float: right;
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  padding-bottom: 10px;
}
.right_text p {
  width: 100%;
}
.effect {
  height: 28px;
  line-height: 28px;
  font-size: 20px;
  color: white;
  text-align: left;
  font-weight: 700;
}
.seller {
  height: 18px;
  line-height: 18px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: white;
}
.discount {
  width: 97%;
  padding: 10px 0;
  font-size: 12px;
}
.activity {
  color: white;
  font-size: 18px;
}
.discount p:nth-child(1) {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  float: left;
  color: white;
  padding-bottom: 8px;
}
.del {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: white;
  border-radius: 3px;
  text-align: center;
  padding: 0 3px;
  margin-right: 3px;
}
.discount p:nth-child(2) {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  float: right;
  margin-right: 3%;
  padding-bottom: 8px;
}

/* 下 */
.change_show_type {
  width: 100%;
  height: 61px;
  border: none;
  color: #333;
  font-weight: 400;
  font-family: Microsoft Yahei;
  box-sizing: border-box;
  padding: 10px 0 20px 0;
  background-color: white;
  border-bottom: 1px solid lightgray;
}
.goods_wrap {
  height: 36px;
  line-height: 36px;
  text-align: center;
  width: 50%;
  float: left;
  color: #666;
}
.rate_wrap {
  height: 36px;
  line-height: 36px;
  text-align: center;
  width: 50%;
  float: right;
  background-color: white;
  
}
.goods_wrap span{
color: #666;
}
.rate_wrap span{
color: #666;
}
/* 路由激活设置 */
._active{
  padding-bottom: 4px;
  border-bottom: 3px solid #3190e8;
  color: #3190e8;
}

/* 二。隐藏页面 */
.new {
  padding: 0 3px;
  border-radius: 4px;
  margin-right: 4px;
}
.hide_wrap {
  background-color: #262626;
  padding: 20px 5%;
  color: white;
  overflow: hidden;
  position: absolute;
  top:0;
  bottom:0;
  width:100%;
  text-align: center;
}
.store_name {
  height: 28px;
  font-size: 20px;
  /* 假数据 */
  /* background-color: pink; */
  text-align: center;
  line-height: 28px;
  margin-bottom: 60px;
}
.discount_wra {
  text-align: center;
  /* background-color: gold; */
  margin: 25px 0;
}
.discount_info {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: 1px solid #555;
  border-radius: 15px;
  padding: 0 15px;
  font-size: 14px;
  /* background-color: greenyellow; */
}
.special_own {
  height: 17px;
  /* background-color: orangered; */
  margin-bottom: 5px;
  font-size: 14px;
}
.welcome {
  height: 18px;
  /* background-color: lightpink; */
  margin-top: 10px;
  font-size: 14px;
}
.el-icon-circle-close-outline {
  width: 100%;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin: 10px 0 20px;
  font-size: 60px;
  /* background-color: lightskyblue; */
  color: rgb(172, 160, 160);
}
.set2 {
  margin-top: 30px;
}

</style>
