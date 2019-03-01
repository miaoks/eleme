<template>
  <div class="goods">
    <!-- 选规格弹框 -->
    <div class="spec_wrap" v-if="buyer_hide">
      <div class="specification_choose">
        <div class="ask_wrap">
          <span>{{spec_name}}</span>
          <span @click="buyer_hidden_one()">x</span>
        </div>
        <div class="spec">
          <p>规格</p>
          <p>
            <span
              v-for="(spec_foo,index_foo) in basket_hidden_data.specfoods"
              :key="index_foo"
              @click.stop="change_spec_color(index_foo)"
              :class="{'change1':index_data==index_foo}"
              class="change2"
            >{{spec_foo.specs_name}}</span>
          </p>
        </div>
        <div class="add_buyer">
          <span>￥{{spec_price}}</span>
          <span @click="buyer_hidden()">加入购物车</span>
        </div>
      </div>
    </div>
    <!-- 跳转内容 -->
    <div class="content_wrap">
      <!-- 路由左半边 -->
      <div class="content_left">
        <div class="content_warpper">
          <ul
            v-for="(value,index) in foods_list"
            :key="index"
            :class="{'change':index==current}"
            @click="change_color($event,index)"
          >
            <li class="goods_list">
              <span class="goods_content">{{value.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 路由右半边 -->
      <div class="content_right">
        <div class="content_right_wrap">
          <div class="scroll_set">
            <div v-for="(food,i) in foods_list" :key="i" class="top_wrap">
              <div>
                <!-- 导航条 -->
                <div class="title_content">
                  <span class="title_txt">{{food.name}}</span>
                  <span class="sign">{{food.description}}</span>
                  <span class="ellipsis">...</span>
                </div>
                <!-- 内容展示 -->
                <ul class="goods_show" v-for="(detail,inde) in food.foods" :key="inde" @click="to_goodsDetail(detail)">
                  <li>
                    <div class="intro_wrap">
                      <div class="pic_wrap">
                        <img :src="'//elm.cangdu.org/img/'+detail.image_path" style="width:54px">
                      </div>
                      <div class="description_wrap">
                        <p class="description_head">{{detail.name}}</p>
                        <p class="description_content">{{detail.description}}</p>
                        <p
                          class="description_sales"
                        >月售{{detail.month_sales}}份 好评率{{detail.satisfy_rate}}%</p>
                        <p class="goods_activity">
                          <span
                            :style="setColor(detail.activity)"
                          >{{detail.activity&&detail.activity.image_text}}</span>
                        </p>
                      </div>
                    </div>
                    <div class="price_wrap">
                      <span class="price_start">￥{{detail.specfoods[0].price}}起</span>
                      <span v-if="detail.specfoods[0].specs.length!=0" class="spec_choose_wrap">
                        <span style="display:none">
                          <i class="el-icon-remove-outline add_choice_first"></i>
                          <span class="add_count_first">0</span>
                        </span>
                        <span class="add_choose" @click="to_hidden($event,i,inde)">选规格</span>
                      </span>
                      <span class="add_but" v-else>
                        <span style="display:none">
                          <i
                            class="el-icon-remove-outline add_choice_second"
                            @click="delete_order_count($event,i,inde)"
                          ></i>
                          <span class="add_count_second">0</span>
                        </span>
                        <i
                          class="el-icon-circle-plus add_mark"
                          @click.stop="add_order_count($event,i,inde)"
                        ></i>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 购物车 -->
      <!-- 隐藏部分 -->
      <div class="basket_list_wrap" v-if="list_show">
        <ul class="basket_list_hidden">
          <li class="basket_list_title">
            <span>购物车</span>
            <i class="el-icon-delete"></i>
            <span>清空</span>
          </li>
          <li class="list_show" v-for="(value,ind) in chart_data.cart.groups[0]" :key="ind">
            <p class="list_name">
              <span class="list_name_choice">{{value.name}}</span>
              <span class="list_name_specs" v-if="value.specs.length>0">{{value.specs[0]}}</span>
            </p>
            <p class="list_price">￥{{value.price}}</p>
            <p class="list_quantity">
              <i class="el-icon-remove-outline" @click="add_list()"></i>
              <span>{{value.quantity}}</span>
              <i class="el-icon-circle-plus-outline" @click="delete_list()"></i>
            </p>
          </li>
        </ul>
      </div>
      <!-- 显示部分 -->
      <div class="buyer">
        <div class="display_wrap">
          <div class="buyer_sign">
            <div class="laung" v-if="total_order_quantity">{{total_order_quantity}}</div>
            <i class="el-icon-success ele_sign clear" @click="to_hidden_list()"></i>
          </div>
          <div class="buyer_fee">
            <div ref="total">￥{{total}}</div>
            <div ref="fee">配送费￥5</div>
          </div>
          <div class="total_cost" ref="deliver">还差20起送</div>
          <div class="pay_for_order" style="display:none" ref="count">结算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数量
      // 后台产品信息
      foods_list: this.$store.state.food_request,
      //   color:false
      current: 0,
      //设置样式
      change_spec_data: true,
      //设置购物车点击
      buyer_hide: false,
      basket_hidden_data: {},
      spec_name: "",
      spec_price: "",
      //改变购物车隐藏页面颜色
      index_data: 0,
      // 购物车增加数量1
      add_data_first: "",
      // 添加购物车
      rest_id: " ",
      //购物车获取的数据
      chart_data: {},
      total_amount: 0.0,
      //购物车传参
      arr: [],
      //添加数量2下标去重
      arr_index: [],
      //存选规格下表
      hiden_index: [],
      //选规格下标去重
      hiden_arr: [],
      //总金额
      total: 0,
      //总订单数
      total_order_quantity: 0,
      //购物车列表展示
      list_show: false,
      // 清空购物车时需传进的状态
      // 减少数量2
      event1: "",
      index1: "",
      index2: "",
      // 增加数量2下标
      event2: "",
      index3: "",
      index4: ""
    };
  },
  created() {
    // console.log(this.$route.params.food_list,111,this.$route.params.detail);
    // console.log(this.$route.params.food_list,11111);
    console.log(this.$store.state.food_request)
  },
  methods: {
    // 商品详情
    to_goodsDetail(detail){
      this.$router.push({name:"goodsDetail", params:{goods_data:detail}})
    },
    //购物车清空

    // add_list() {},
    // //减少数量2
    // delete_list() {
    //   delete_order_count();
    // },
    //   隐藏购物车列表
    to_hidden_list() {
      if (this.chart_data.cart.groups[0].length > 0) {
        this.list_show = !this.list_show;
      }
    },
    setColor(obj) {
      if (obj != null) {
        return {
          border: "1px solid #" + obj.image_text_color,
          color: "#" + obj.icon_color
        };
      } else {
        return { borderColor: "#fff", color: "#000" };
      }
    },
    // 改变左边背景颜色
    change_color(event, index) {
      this.current = index;
      var c = document.getElementsByClassName("top_wrap")[index];
      var d = document.getElementsByClassName("title_content")[index];
      console.log(c.offsetTop);
      c.parentNode.style.top = -c.offsetTop + "px";
    },
    change_spec_color(i) {
      this.index_data = i;
      this.spec_name = this.basket_hidden_data.specfoods[this.index_data].name;
      this.spec_price = this.basket_hidden_data.specfoods[
        this.index_data
      ].price;
    },
    to_hidden(eve, i, inde) {
      // 存隐藏下标
      this.hiden_index = "1" + i + "." + inde;
      // 获取餐馆id
      this.rest_id = this.foods_list[i].restaurant_id;
      // 更改订单数量
      this.add_data_first = eve.target.previousElementSibling;
      this.buyer_hide = !this.buyer_hide;
      this.basket_hidden_data = this.foods_list[i].foods[inde];
      this.spec_name = this.basket_hidden_data.specfoods[0].name;
      this.spec_price = this.basket_hidden_data.specfoods[0].price;
    },
    buyer_hidden_one() {
      this.buyer_hide = !this.buyer_hide;
    },
    buyer_hidden() {
      this.index_data = 0;
      this.buyer_hide = !this.buyer_hide;
      // 增加数量1
      if (this.add_data_first != null) {
        this.add_data_first.style.display = "inline-block";
        let c = this.add_data_first.lastElementChild.innerHTML * 1;
        // console.log(c);
        this.add_data_first.lastElementChild.innerHTML = c += 1;
        //
        // console.log(this.current, "dddd");
        let p = this.hiden_index + "." + this.index_data;
        console.log(p, "dddd");
        let k = this.hiden_arr.indexOf(p);
        if (k == -1) {
          console.log(123123);
          // 获取餐馆详细信息
          let foodArr = this.basket_hidden_data.specfoods[this.index_data];
          let res_detail = {
            attrs: [],
            extra: {},
            id: foodArr.food_id,
            name: foodArr.name,
            packing_fee: foodArr.packing_fee,
            price: foodArr.price,
            quantity: 1,
            sku_id: foodArr.sku_id,
            specs: foodArr.specs_name,
            stock: foodArr.stock
          };
          this.arr.push(res_detail);
          //调用加入购物车请求
          this.add_chart();
          this.hiden_arr.push(p);
        } else {
          this.arr[k].quantity += 1;
        }
      }
    },
    // 增加数量2
    add_order_count(eve, i, inde) {
      //结算及起送费切换
      this.$refs.deliver.style.display = "none";
      this.$refs.count.style.display = "block";
      //获取餐馆id
      this.rest_id = this.foods_list[i].restaurant_id;
      // 更改订单数量
      let a = eve.target.previousElementSibling;
      if (a != null) {
        eve.target.previousElementSibling.style.display = "inline-block";
        let c = a.lastElementChild.innerHTML * 1;
        a.lastElementChild.innerHTML = c += 1;
        // console.log(a.lastElementChild.innerHTML, "hkhkh");
        let f = i + "." + inde;
        let h = this.arr_index.indexOf(f);
        if (h == -1) {
          // 获取餐馆详细信息
          let foodArr = this.foods_list[i].foods[inde].specfoods[0];
          console.log(foodArr,"ccccc")
          let res_detail = {
            attrs: [],
            extra: {},
            id: foodArr.food_id,
            name: foodArr.name,
            packing_fee: foodArr.packing_fee,
            price: foodArr.price,
            quantity: a.lastElementChild.innerHTML * 1,
            sku_id: foodArr.sku_id,
            specs: foodArr.specs,
            stock: foodArr.stock
          };
          this.arr.push(res_detail);
          //调用加入购物车请求
          this.add_chart();
          this.arr_index.push(f);
          //   console.log(this.arr_index, 1111);
        } else {
          console.log(this.arr);
          this.add_chart();
          this.arr[h].quantity += 1;
        }
      }
    },
    // 减少数量2
    delete_order_count(eve, i, inde) {
      this.event1 = eve;
      this.index1 = i;
      this.index2 = inde;
      let d = eve.target.nextElementSibling.innerHTML * 1;
      let h = i + "." + inde;
      console.log(this.arr_index, "hhh");
      let g = this.arr_index.indexOf(h);
      if (d > 1) {
        //减少数量
        eve.target.nextElementSibling.innerHTML = d -= 1;
        // 购物车后台请求数量减少
        if (this.arr[g].quantity > 1) {
          this.arr[g].quantity -= 1;
          //调用加入购物车请求
          this.add_chart();
        }
      } else {
        // 数量填写
        // console.log(eve.target.nextElementSibling.innerHTML,"9999")
        // 显示数量为1时
        //购物车后台数量剩1时
        console.log(g, 1212);
        this.arr[g].quantity -= 1;
        //调用加入购物车请求
        console.log(this.arr[g].quantity);
        this.add_chart();
        // this.arr.splice(g, 1);
        // this.arr_index.splice(h);
        eve.target.parentElement.style.display = "none";
        eve.target.nextElementSibling.innerHTML = "0";
        if (this.arr.length == 0) {
          //结算及起送费切换
          console.log(7777);
          this.$refs.deliver.style.display = "block";
          this.$refs.count.style.display = "none";
        }
      }
    },
    //添加购物车
    add_chart() {
      //   加入购物车请求接口
      this.$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/carts/checkout",
        data: {
          restaurant_id: this.rest_id,
          geohash:
            this.$route.params.detail.longitude +
            "," +
            this.$route.params.detail.latitude,
          entities: [this.arr]
        }
      }).then(res => {
        // console.log(this.arr);
        // 总订单数
        this.total_order_quantity = 0;
        // 总金额
        this.total = 0;
        console.log(this.arr,1111,res.data);
        this.chart_data = res.data;
        // for (let i = 0; i < res.data.cart.groups[0].length; i++) {
        //   let q = res.data.cart.groups[0][i].quantity;
        //   let p = res.data.cart.groups[0][i].price;
        //   // 总金额
        //   let s = q * 1 * (p * 1);
        //   this.total = this.total * 1 + s;
        //   console.log(q, p, s, this.total);
        //   // 总订单数
        //   this.total_order_quantity = this.total_order_quantity + q;
        // }
      });
    }
  }
};
</script>

<style scoped>
/* 购物车列表隐藏部分 */
.basket_list_wrap {
  position: fixed;
  /* width: 60%;
    left: 20%;
    top: 120px; */
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 53px;
  background-color: rgba(3, 3, 3, 0.2);
}
.basket_list_hidden {
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0;
  background-color: white;
}
.basket_list_title {
  width: 100%;
  background-color: #f5f5f5;
  height: 40px;
  line-height: 40px;
}
.basket_list_title span:nth-child(1) {
  margin-left: 10px;
  width: 80%;
  display: inline-block;
}
.clear {
  display: inline-block;
  margin-right: 10px;
}
.list_show {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
}
.list_name {
  width: 60%;
}
.list_name_choice {
  display: block;
  height: 30px;
  line-height: 30px;
}
.list_name_specs {
  display: block;
  height: 10px;
  line-height: 10px;
  font-size: 10px;
}
.list_price {
  width: 20%;
  text-align: center;
  /* background-color: gray; */
}
.list_quantity {
  text-align: center;
  width: 20%;
  /* background-color: gold; */
}
/* 购物车订单数量 */
.laung {
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: red;
  color: white;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: 40%;
}
/* 购物车数量样式 */
.el-icon-remove-outline:before {
  color: #3190e8;
}
.add_choice_first {
  margin-right: 3px;
}
.add_choice_second {
  margin-right: 4px;
}
.add_count_first {
  margin-right: 3px;
  font-size: 14px;
  color: #666;
}
.add_count_second {
  margin-right: 3px;
  font-size: 14px;
  color: #666;
}
/* 规格弹框 */
.spec_wrap {
  position: fixed;
  /* width: 60%;
    left: 20%;
    top: 120px; */
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(3, 3, 3, 0.2);
  /* background-color: rgba(24, 9, 9, 0.5); */
}
.specification_choose {
  background-color: white;
  margin-left: 20%;
  width: 60%;
  margin-top: 120px;
  height: 180px;
  display: flex;
  flex-direction: column;
}
.ask_wrap {
  height: 40px;
  width: 100%;
  /* background-color: red; */
  line-height: 40px;
  position: relative;
  color: #535356;
}
.ask_wrap span:nth-child(1) {
  position: absolute;
  left: 40%;
  font-size: 13px;
}
.ask_wrap span:nth-child(2) {
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  width: 2%;
  position: absolute;
  font-size: 20px;
  right: 8%;
}
.spec {
  height: 80px;
  width: 94%;
  /* background-color: #f60; */
  margin: 10px 3%;
}
.spec p:nth-child(1) {
  height: 20px;
  line-height: 20px;
  color: #7d7d81;
  font-size: 12px;
}
.spec p:nth-child(2) {
  height: 60px;
  line-height: 60px;
  font-size: 12px;
}
.spec span {
  border-radius: 5px;
  padding: 3px;
  margin-right: 3%;
  padding: 6px;
}

.change1 {
  color: #3190e8 !important;
  border: 0.5px solid #3190e8 !important;
}
.change2 {
  border: 0.5px solid #e7e4e4;
  color: #535356;
}
.add_buyer {
  height: 40px;
  /* background-color: pink; */
  line-height: 40px;
}
.add_buyer span:nth-child(1) {
  width: 53%;
  display: inline-block;
  text-align: left;
  padding-left: 3%;
  color: orangered;
  font-weight: 700;
}
.add_buyer span:nth-child(2) {
  height: 30px;
  line-height: 30px;
  width: 37%;
  display: inline-block;
  text-align: center;
  color: white;
  font-size: 12px;
  border: 1px solid #3190e8;
  background-color: #3190e8;
  border-radius: 5px;
  box-sizing: border-box;
}
/* 购物车样式设置 */
.buyer {
  position: fixed;
  width: 100%;
  height: 53px;
  left: 0;
  right: 0;
  background-color: rgba(63, 60, 60, 0.9);
  bottom: 0;
}
.display_wrap {
  display: flex;
  width: 100%;
}
.buyer_sign {
  position: relative;
  height: 53px;
  line-height: 53px;
  width: 20%;
  margin-left: 3%;
  color: white;
}
.ele_sign {
  /* background-color: #333; */
  font-size: 50px;
  border-radius: 50%;
}
.buyer_fee {
  width: 50%;
  color: white;
}
.buyer_fee div:nth-child(1) {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 700;
}
.buyer_fee div:nth-child(2) {
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 400;
  padding-left: 2%;
}
.total_cost {
  color: white;
  font-weight: 700;
  font-size: 20px;
  width: 30%;
  line-height: 53px;
  height: 53px;
  text-align: center;
  background-color: #535356;
}
.pay_for_order {
  color: white;
  font-weight: 700;
  font-size: 20px;
  width: 30%;
  line-height: 53px;
  height: 53px;
  text-align: center;
  background-color: #4cd964;
}
/* 路由跳转部分样式设置 */
/* 总设置 */
.goods {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-top: -1.61rem;
  padding-top: 1.61rem;
  overflow: hidden;
}
.content_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
}
.content_warpper {
  width: 105%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
/*左半边设置  */

.content_left {
  width: 25%;
  overflow: hidden;
  height: 100%;
}
.goods_list {
  height: 68px;
  line-height: 68px;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
  font-weight: 400;
  border-left: 0.15rem solid #f5f5f5;
}
/* 动态绑定class */
.change {
  border-left: 0.15rem solid #3190e8;
  background-color: white;
  box-sizing: border-box;
  font-weight: 700;
}
.change_top {
  top: 0;
}
.goods_content {
  display: inline-block;
  height: 68px;
  line-height: 68px;
  font-size: 14px;
}
/* 右半边设置 */
.content_right_wrap {
  width: 103%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  /* position: relative; */
}
/* .top_wrap {
  position: relative;
} */
.scroll_set {
  position: relative;
}

.content_right {
  width: 75%;
  overflow: hidden;
  height: 100%;
}
.title_content {
  width: 100%;
  height: 52px;
  color: #333;
  background-color: #f5f5f5;
  line-height: 52px;
  position: relative;
}
.title_txt {
  height: 22px;
  padding: 5px 0;
  color: #666;
  font-size: 18px;
  font-weight: 700;
  margin: 0 5px;
}
.sign {
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #999;
}
.ellipsis {
  position: absolute;
  right: 10px;
}
.goods_show {
  background-color: white;
  overflow: hidden;
  padding: 20px 3%;
}
.intro_wrap {
  /* background-color: #999; */
  display: flex;
}
.pic_wrap {
  height: 52px;
  width: 20%;
  padding-right: 1%;
}
.description_wrap {
  width: 79%;
}
.description_head {
  height: 22px;
  line-height: 22px;
  font-size: 14px;
  font-weight: 700;
}
.description_content {
  padding-top: 5px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  color: #999;
}
.description_sales {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #333;
}
.goods_activity {
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: rgb(241, 136, 79);
}
.goods_activity span {
  height: 12px;
  line-height: 12px;
  font-size: 10px;
  border-width: 1px;
  border-radius: 9px;
}
.price_wrap {
  height: 22px;
  overflow: hidden;
  /* background-color: pink; */
}
.price_start {
  height: 22px;
  line-height: 22px;
  display: inline-block;
  width: 49%;
  text-align: left;
  color: #f60;
  font-size: 16px;
}
.add_but {
  height: 22px;
  line-height: 22px;
  display: inline-block;
  width: 49%;
  text-align: right;
}
.add_mark {
  width: 14%;
  text-align: right;
  font-size: 20px;
  color: white;
}
.spec_choose_wrap {
  height: 22px;
  line-height: 22px;
  width: 49%;
  display: inline-block;
  text-align: right;
}
.add_choose {
  width: 20%;
  font-size: 12px;
  text-align: right;
  color: white;
  padding: 2px;
  /* box-sizing: border-box; */
  background-color: #3190e8;
  border-radius: 5px;
}
.el-icon-circle-plus:before {
  color: #3190e8;
}
</style>
