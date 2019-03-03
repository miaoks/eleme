<template>
  <div>
    <i class="el-icon-arrow-left" style="z-index:1000;position:fixed;top:10px;left:10px;color:white;font-size:30px;" @click="got01()"></i>
    <Header :middle_msg="middle" :right_msg="right"></Header>
    <div class="img_wrap">
      <img :src="'//elm.cangdu.org/img/'+goods_data.image_path">
    </div>
    <div class="content_wrap">
      <div class="description">{{goods_data.description}}</div>
      <div class="name">{{goods_data.name}}</div>
      <div class="rating_score">
        <span>评分</span>
        <el-rate
          class="rating_star"
          v-model="value5"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </div>
      <div class="sales_amount">
        <span>月售</span>
        <span>{{goods_data.month_sales}}单</span>
        <span style="color:#f60;">售价￥{{goods_data.specfoods[0].price}}起</span>
      </div>
      <div class="discuss_count">
        <span>评论数</span>
        <span>{{goods_data.rating_count}}</span>
        <span>好评率</span>
        <span>{{goods_data.satisfy_rate}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      middle: this.$route.params.goods_data.name,
      right: false,
      goods_data: this.$route.params.goods_data,
      value5: 3.7
    };
  },
  created() {
    console.log(this.$route.params, 1111);
    let v = this.$route.params.goods_data.tips;
    let c = v.indexOf("月");
    console.log(c, 555);
  },
  components: {
    Header
  },
  methods:{
    got01(){
      this.$router.push({name:"storeDetail"})
      console.log("!!!!")
    },
  }
};
</script>

<style scoped>
.img_wrap {
  position: relative;
  z-index: 1000;
  top: 52px;
  width: 100%;
}
.img_wrap img {
  width: 100%;
}
.content_wrap {
  box-sizing: border-box;
  padding-top: 50px;
  /* margin-top: 20px; */
  width: 100%;
  position: absolute;
  top: 377px;
  /* height: 73px; */
  padding-left: 3%;
  /* background-color: pink; */
}
.description {
  height: 10px;
  line-height: 10px;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}
.name {
  height: 10px;
  line-height: 10px;
  font-size: 18px;
  margin-bottom: 20px;
}
.rating_star {
  margin-left: 1%;
  display: inline-block;
  color: #666;
}
.rating_score {
  height: 10px;
  line-height: 10px;
  color: #666;
  margin-bottom: 20px;
}
.sales_amount {
  height: 10px;
  line-height: 10px;
  color: #666;
  margin-bottom: 20px;
}
.discuss_count {
  height: 10px;
  line-height: 10px;
  color: #666;
  margin-bottom: 20px;
}
</style>
