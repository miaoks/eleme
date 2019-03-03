<template>
  <div>
    <div class="rate_wrap">
      <!-- 头部 -->
      <div class="header">
        <div class="header_left">
          <h1 class="left_one">{{rate_obj.overall}}</h1>
          <h3 class="left_two">综合评价</h3>
          <p class="left_three">高于周边商家{{this.rate_obj.compare}}</p>
        </div>
        <div class="header_right">
          <div class="right_one">
            <span>服务态度</span>
            <el-rate
              class="service"
              v-model="value1"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
          <div class="right_two">
            <span>菜品评价</span>
            <el-rate
              class="foods"
              v-model="value2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <span></span>
          </div>
          <div class="right_three">
            <span>送达时间</span>
            <span class="min">分钟</span>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <ul class="part2">
        <li
          class="satisfy_degree"
          :class="{'choice':ind_data==index}"
          v-for="(sat_degree,index) in data2"
          :key="index"
          @click="to_change(index)"
        >{{sat_degree.name}}({{sat_degree.count}})</li>
      </ul>
      <!-- 3 -->
      <ul class="rate_third">
        <li class="rate_detail" v-for="(value,index_sec) in data3" :key="index_sec">
          <div class="left_img_wrap">
            <!-- <span v-if="value.avatar==''" class="iconfont login" >&#xe65e;</span> -->
            <img v-if="value.avatar==''" src="//elm.cangdu.org/img/default.jpg">
            <img
              v-else
              src="https://fuss10.elemecdn.com/1/5f/6cf782b0c9cd5ca8daa7f76ab05aejpeg.jpeg"
              alt
            >
          </div>
          <div class="flex_middle">
            <p class="username_id">{{value.username}}</p>
            <div class="delivery_rate">
              <el-rate
                class="service content_star"
                v-model="value1"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span>{{value.time_spent_desc}}</span>
            </div>
            <ul class="flex_img">
              <li class="flex_li" v-for="(item, ind) in value.item_ratings" :key="ind">
                <img
                  src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg"
                  alt
                >
                <div class="flex_div" style="height:32px;">{{item.food_name}}</div>
              </li>
            </ul>
          </div>
          <div class="flex_right">{{value.rated_at}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate_data: this.$route.params.rate_data,
      data1: "",
      data2: "",
      data3: "",
      value1: 3.7,
      value2: 3.7,
      rate_obj: {
        compare: "",
        food: "",
        service: "",
        overall: ""
      },
      ind_data: ""
    };
  },
  created() {
    console.log(this.rate_data.id);
    this.to_get_rate();
    this.to_get_score();
    this.to_get_satisfy();
  },
  methods: {
    //
    to_change(index) {
      this.ind_data = index;
    },
    //   1
    to_get_score() {
      this.$http({
        method: "GET",
        url:
          "https://elm.cangdu.org/ugc/v2/restaurants/" +
          this.rate_data.id +
          "/ratings/scores",
        params: {
          restaurant_id: this.rate_data.id
        }
      }).then(res => {
        console.log(res.data, 111);
        this.data1 = res.data;
        this.rate_obj = {
          compare: parseFloat(res.data.compare_rating * 100).toFixed(1) + "%",
          food: parseFloat(res.data.food_score).toFixed(1),
          service: parseFloat(res.data.service_score).toFixed(1),
          overall: parseFloat(res.data.overall_score).toFixed(1)
        };
        this.value1 = this.rate_obj.service;
        this.value2 = this.rate_obj.food;
      });
    },
    // 2
    to_get_satisfy() {
      this.$http({
        method: "GET",
        url: "https://elm.cangdu.org/ugc/v2/restaurants/1/ratings/tags",
        params: {
          restaurant_id: this.rate_data.id
        }
      }).then(res => {
        this.data2 = res.data;
        console.log(res.data, 2222);
      });
    },
    //请求3
    to_get_rate() {
      this.$http({
        method: "GET",
        url:
          "https://elm.cangdu.org/ugc/v2/restaurants/" +
          this.rate_data.id +
          "/ratings",
        params: {
          restaurant_id: this.rate_data.id
        }
      }).then(res => {
        this.data3 = res.data;
        console.log(res.data, 333);
      });
    }
  }
};
</script>

<style>
.rate_detail {
  display: flex;
  margin-left: 10px;
  background-color: white;
  overflow: hidden;
  margin-bottom: 10px;
}
.left_img_wrap {
  margin: 5px 5px;
  padding-right: 1%;
  width: 4%;
  height: 35px;
  /* background-color: aquamarine; */
}
.left_img_wrap img {
  border-radius: 50%;
  margin: 3px;
  width: 80%;
}
.flex_middle {
  width: 35%;
  /* height: 500px; */
  /* background-color: green; */
  margin: 5px 0;
}
.username_id {
  font-size: 12px;
  height: 18px;
  color: #666;
  /* background-color: #f60; */
}
.content_star {
  display: inline;
}
.delivery_rate {
  height: 28px;
  line-height: 28px;
  /* background-color: antiquewhite; */
}

.delivery_rate span {
  color: #666;
  font-size: 10px;
}
.flex_img {
  display: flex;
}
.flex_img li {
  width: 30%;
  /* height: 84px; */
  margin-right: 2%;
  /* background-color: orangered; */
  margin-right: 10px;
  text-align: center;
}
.flex_li img {
  height: 84px;
}
.flex_li div {
  width: 50%;
  font-size: 14px;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.flex_right {
  width: 8%;
  height: 20px;
  margin: 5px 5px;
  font-size: 10px;
  color: #999;
  /* background-color: #f60; */
}
.rate_wrap {
  background-color: #f5f5f5;
  width: 200%;
  height: 100%;
}
.header {
  height: 123px;
  line-height: 123px;
  width: 200%;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  /* position: fixed; */
}
.header_left {
  width: 10%;
  margin: 20px 0;
  height: 83px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}
.left_one {
  height: 39px;
  line-height: 39px;
  color: #f60;
}
.left_two {
  height: 23px;
  line-height: 23px;
  color: #666;
  font-size: 18px;
}
.left_three {
  height: 14px;
  line-height: 14px;
  color: #999;
  font-size: 10px;
}
.header_right {
  width: 15%;
  margin: 20px 0;
  height: 83px;
  /* background-color: pink; */
  text-align: left;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.header_right div {
  height: 26px;
  line-height: 26px;
  color: #666;
}
.service {
  display: inline-block;
  padding-left: 5px;
}
.el-icon-star-on:before {
  font-size: 12px;
}
.el-rate__item {
  margin: 0;
  padding: 0;
  width: 12px;
}
.el-rate__text {
  margin-bottom: 2px;
  line-height: 14px;
  font-weight: 550;
  color: #f60;
}
.foods {
  padding-left: 5px;
  display: inline-block;
}
.min {
  height: 14px;
  line-height: 14px;
  color: #999;
  font-size: 10px;
}
.part2 {
  width: 48%;
  /* background-color: pink; */
  padding: 2% 10px;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.satisfy_degree {
  height: 37px;
  border-radius: 5px;
  margin-right: 8px;
  margin-bottom: 5px;
  padding: 0 5px;
  text-align: center;
  line-height: 37px;
  background-color: #ebf5ff;
  color: #6d7885;
}
.choice {
  background-color: #3190e8;
  color: white;
}
.rate_third {
  /* width: 50%; */
  height: 400px;
  /* background-color: white; */
  /* display: flex;    */
}
</style>
