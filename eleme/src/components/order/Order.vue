<template>
  <div>
    <Header :left_msg="left" middle_msg="订单列表"></Header>
    <ul class="order_con">
       <li class="li" v-for="(v,i) in order_list" :key="i" @click="to_order_con(v)">
           <img :src="'//elm.cangdu.org/img/'+v.restaurant_image_url" style="width:63px;vartical-align:top">
           <div class="condiv">
               <p style="width:100%;position:relative;">{{v.restaurant_name}} <i class="el-icon-arrow-right"></i><span style="position:absolute;right:10px;">{{v.status_bar.title}}</span></p>
               <p style="margin:10px 0;">{{v.formatted_created_at}}</p>
           </div>
           <div class="condiv" style="position:relative;width:100%;height:37px;">
               <div style="width:288px;border-bottom:1px solid #F2F2F2;padding:10px;position:absolute;right:0;box-sizing: border-box;">
                   {{v.basket.group[0][0].name}} <span v-if="v.basket.group[0].length>1">等{{v.basket.group[0].length}}件商品</span>
                   <span style="position:absolute;right:0">{{v.total_amount.toFixed(2)}}</span>
               </div>
           </div>
           <div style="width:100;padding:5px;box-sizing:border-box;text-align:right;">
               <div style="border:1px solid #3E90E8;color:#3E90E8;display:inline-block;padding:3px;border-radius:5px;font-size:12px;" v-if="v.status_bar.title=='支付超时'">再来一单</div>
               <div v-else style="border:1px solid #f20;color:#F20;display:inline-block;padding:3px;border-radius:5px;font-size:12px;">
                去支付(还剩<span>{{parseInt((900-v.time_pass)/60)}}</span>分<span>{{(900-v.time_pass)%60}}</span>秒)
               </div>
           </div>
       </li>
    </ul>
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
      order_list:""
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
      this.get_order();
    //   this.updatetime();
  },
  methods: {
    // 去订单详情
    to_order_con(o){
        this.$router.push({name:'order_con',params:{o:o}})
    },
    get_order() {
      if (this.$store.state.res) {
        this.$http({
          method: "get",
          url:"https://elm.cangdu.org/bos/v2/users/"+this.$store.state.res.data.user_id+"/orders?limit=10&offset=0"
        }).then(res => {
        //   console.log(res.data);
          this.order_list=res.data;
        });
      }
    },
    updatetime(){
        var that=this;
        setInterval(() => {
            that.get_order();
            // that.updatetime();
        }, 1000);
    }
  }
};
</script>

<style>
.order_con {
    position: absolute;
    top:52px;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #F2F2F2;
}
.li {
    background: white;
    padding: 2%;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.order_con img{
vertical-align: top;
}
.condiv {
    display: inline-block;
    height: 63px;
    border-bottom:1px solid #F2F2F2;
    width: 288px;
}

</style>
