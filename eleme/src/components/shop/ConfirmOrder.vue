<template>
  <div>
    <section v-if="!choseaddress">
      <Header :left_msg="left" middle_msg="确认订单"></Header>
      <div class="sureorder_wrap">
        <section
          class="sect"
          style="background:white;padding:6% 2%;"
          @click="choseaddress=!choseaddress"
        >
          <i class="el-icon-location" style="color:#3190E8;"></i>
          <span v-if="addressend==''">请添加一个收货地址</span>
          <div v-else style="display:inline-block;vertical-align:middle;">
            <span style="font-size:20px;">
              <b>{{addressend.name}}</b>
            </span>
            <span v-if="addressend.sex==1">先生</span>
            <span v-else>女士</span>
            <span>{{addressend.phone}}</span>
            <br>
            <span
              style="background-color: rgb(76, 217, 100);font-size:12px;border-radius:5px;"
            >{{addressend.tag}}</span>
            <span style="font-size:12px;">{{addressend.address_detail}}</span>
          </div>
          <i class="el-icon-arrow-right" style="position:absolute;right:10px;"></i>
          <div class="huabian"></div>
        </section>
        <section
          class="sect"
          style="border-left:5px solid #3190E8;top:20px;display:flex; justify-content: space-between;background:white;"
        >
          <span style="line-height:60px;">送达时间</span>
          <div style="display:inline-block;text-align:right;color:#3190E8;line-height:30px;">
            <p>尽快送达|预计{{}}</p>
            <span style="color:white;background:#3190E8;">{{'蜂鸟专送'}}</span>
          </div>
        </section>
        <section class="sect" style="top:30px;background:white;">
          <div
            style="display:flex; justify-content: space-between;line-height:40px;border-bottom:0.5px solid #aaa;"
          >
            <span>支付方式</span>
            <span style="color:#aaa;">
              {{'在线支付'}}
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div
            style="display:flex; justify-content: space-between;color:#333;line-height:40px;font-size:14px;"
          >
            <span>红包</span>
            <span>暂时只在饿了么 APP 中支持'</span>
          </div>
        </section>
        <section class="sect" style="top:40px;background:white;padding:0% 2%">
          <div style="padding:5% 0">
            <img src style="width:28px;">
            <span style="font-size:20px;">效果演示</span>
          </div>
          <!-- 循环商品列表 -->
          <div style="width:100%;padding:4% 0;border-top:1px solid #AAA;">
            <!-- 商品名称 -->
            <span style="width:60%;display:inline-block;">汉堡汉堡</span>
            <!-- 商品数量 -->
            <span style="width:20%;display:inline-block;color:#f60;">X&nbsp;{{'2002'}}</span>
            <!-- 商品单价 -->
            <span style="width:15%;display:inline-block;text-align:right;">￥{{'213'}}</span>
          </div>
          <!-- 餐盒 -->
          <div
            style="width:98%;padding:4% 0 4% 0;border-top:1px solid #AAA;justify-content: space-between;display:flex;"
          >
            <span>餐盒</span>
            <span>￥{{'234432'}}</span>
          </div>
          <!-- 配送费 -->
          <div
            style="width:98%;padding:4% 0 4% 0;border-top:1px solid #AAA;justify-content: space-between;display:flex;"
          >
            <span>配送费</span>
            <span>￥{{'234432'}}</span>
          </div>
          <!-- 订单 -->
          <div
            style="width:98%;padding:4% 0 4% 0;border-top:1px solid #AAA;justify-content: space-between;display:flex;"
          >
            <span>订单￥{{'123313'}}</span>
            <span style="color:#f60;">{{'待支付'}}</span>
          </div>
          <div style="width:98%;padding:4% 0 4% 0;border-top:1px solid #AAA;text-align:right;">
            <span style="color:#f60;">￥{{'123134'}}</span>
          </div>
        </section>
        <section class="sect" style="top:50px;background:white;margin-bottom:50px;">
          <!-- 订单备注 -->
          <div style="width:98%;padding:4% 0 4% 0;justify-content: space-between;display:flex;">
            <span>订单备注</span>
            <span style="color:#aaa;font-size:14px;">
              {{'口味偏好等'}}
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div
            style="width:98%;padding:4% 0 4% 0;border-top:1px solid #AAA;justify-content: space-between;display:flex;"
          >
            <span>发票抬头</span>
            <span style="color:#aaa;">
              {{'待支付'}}
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </section>
      </div>
      <div class="surefoot">
        <div style="width:70%;background:#3C3C3C;color:white;">待支付${{'121312'}}</div>
        <div style="width:30%;background:#56D176;color:white;">确认下单</div>
      </div>
    </section>
    <section v-if="choseaddress&&!newaddress">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:fixed;color:white;font-size:30px;top:10px;left:10px;"
        @click="choseaddress=!choseaddress"
      ></i>
      <Header middle_msg="选择地址"></Header>
      <ul style="position:absolute;top:52px;padding:2%;width:96%;">
        <li class="addressLi" v-for="(v,i) in addresslist" :key="i" @click="clickchosed(i,v)">
          <div>
            <i v-show="chosedid==i" class="el-icon-success" :class="{'chosedcolor':chosedid==i}"></i>
          </div>
          <div>
            <span style="font-size:20px;">
              <b>{{v.name}}</b>
            </span>
            <span v-if="v.sex==1">先生</span>
            <span v-else>女士</span>
            <span>{{v.phone}}</span>
            <br>
            <span
              style="background-color: rgb(76, 217, 100);font-size:12px;border-radius:5px;"
            >{{v.tag}}</span>
            <span style="font-size:12px;">{{v.address_detail}}</span>
          </div>
        </li>
        <div style="width:100%;height:60px;"></div>
      </ul>
      <div
        style="color:#3190e8;position:fixed;bottom:0;text-align:center;width:100%;font-size:20px;background:white;padding:5% 0;"
        @click="newaddress=!newaddress"
      >
        <i class="el-icon-circle-plus-outline"></i>新增地址
      </div>
    </section>
    <section v-if="newaddress&&!searchadd">
      <i
        class="el-icon-arrow-left"
        style="z-index:111;position:fixed;color:white;font-size:30px;top:10px;left:10px;"
        @click="newaddress=!newaddress"
      ></i>
      <Header middle_msg="新增地址"></Header>
      <div class="new_add">
        <div class="new_add_div">
          <span>联系人</span>
          <input v-model="myname" type="text" placeholder="你的名字">
        </div>
        <div
          class="new_add_div"
          style="padding:15px 0;text-align:center;border-bottom:1px solid rgb(217, 216, 219)"
        >
          <label @click="sex=!sex,mysex=1">
            <i class="el-icon-circle-check" :class="{'sexcolor':sex}"></i>
            <b>先生</b>
          </label>
          <label @click="sex=!sex,mysex=0">
            <i class="el-icon-circle-check" :class="{'sexcolor':!sex}"></i>
            <b>女士</b>
          </label>
        </div>
        <div class="new_add_div">
          <span>联系电话</span>
          <input v-model="myphone" type="text" placeholder="你的手机号" style="width:50%;">
          <i class="el-icon-plus" style="color:#0D95EB;font-weight:1000;"></i>
        </div>
        <div class="new_add_div">
          <span></span>
          <input v-model="myphone2" type="text" placeholder="备选电话" style="width:50%;">
        </div>
        <hr style="color:rgb(217, 216, 219);margin:0;height:0.05px;">
        <div class="new_add_div">
          <span>送餐地址</span>
          <input v-model="myaddress" type="text" style="width:60%;" @click="searchadd=!searchadd">
        </div>
        <div class="new_add_div">
          <span></span>
          <input v-model="myaddress2" type="text" style="width:60%;" placeholder="详细地址(如门牌号等)">
        </div>
        <hr style="color:rgb(217, 216, 219);margin:0;height:0.05px;">
        <div class="new_add_div">
          <span>标签</span>
          <input v-model="mytag" type="text" style="width:60%;" placeholder="无/家/学校/公司">
        </div>

        <button
          style="margin:5%;width:90%;color:white;background:#4CD964;height:8%;font-size:18px;border:none;outline:none;border-radius:5px;" @click="sureaddaddress()"
        >确定</button>
      </div>
    </section>
    <!-- 搜索地址 -->
    <section v-if="searchadd">
      <div class="searchadd" v-show="searchadd">
        <i
          class="el-icon-arrow-left"
          style="z-index:100;position:fixed;color:white;font-size:30px;top:10px;left:10px;z-index:111;"
          @click="searchadd=!searchadd"
        ></i>
        <Header style="z-index:1000;" :left_msg="0" middle_msg="搜索地址"></Header>
        <div style="position:relative;top:60px;">
          <input
            v-model="inpvalue"
            type="text"
            style="background:#F2F2F2;width:65%;margin:1% 3%;height:35px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;"
          >
          <button
            style="width:25%;height:35px;outline:none;border:none;color:white;background:#3199E8;border-radius:5px;"
            @click="searchad()"
          >确认</button>
          <div
            style="width:94%;padding:3%;font-size:14px;color: #ff883f;background: #fff6e4;"
          >为了满足商家的送餐要求，建议您从列表中选择地址</div>
        </div>
        <div style="position:relative;top:160px;text-align:center;" v-if="addressname==''">
          <p style="color: #969696;margin-bottom:10px;">找不到地址？</p>
          <p style="color: #969696;margin-bottom:10px;">请尝试输入小区、写字楼或学校名</p>
          <p style="color: #969696;margin-bottom:10px;">详细地址（如门牌号）可稍后输入哦。</p>
        </div>
        <ul v-if="addressname!=''" style="position:relative;top:70px;background:#F2F2F2;">
          <li
            v-for="(va,ind) in addressname"
            :key="ind"
            style="border-bottom:1px solid gray;width:94%;padding:3%;"
            @click="getaddress(va.name,va.geohash)"
          >
            <p style="color: #969696;margin-bottom:10px;">{{va.name}}</p>
            <p style="color: #969696;">{{va.address}}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../common/Header";
import Footer from "../common/Footer";
export default {
  data() {
    return {
      left: "el-icon-arrow-left",
      choseaddress: false,
      addresslist: "",
      chosedid: "",
      addressend: "",
      newaddress: false,
      sex: true,
      searchadd: false,
      // 搜索地址
      inpvalue: "",
      addressname: "",
      // 新增地址信息
      myname: "",
      mysex: "",
      myphone: "",
      myphone2: "",
      myaddress: "",
      myaddress2: "",
      geohash: "",
      mytag: ""
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
    this.gotaddresslist()
  },
  methods: {
    gotaddresslist() {
      if (this.$store.state.res != "") {
        // 请求地址列表
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/v1/users/" +
            this.$store.state.res.data.user_id +
            "/addresses"
        }).then(res => {
          this.addresslist = res.data;
          console.log(res.data);
        });
      }
    },
    clickchosed(i, v) {
      this.chosedid = i;
      this.addressend = v;
      this.choseaddress = false;
    },
    // 搜索地址
    searchad() {
      console.log(this.$store.state.guess_city_infor.id);
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/pois",
        params: {
          city_id: this.$store.state.guess_city_infor.id,
          keyword: this.inpvalue
        }
      }).then(res => {
        console.log(res, 22222222);
        this.addressname = res.data;
      });
    },
    // 获取地址
    getaddress(v, v2) {
      console.log("地址信息");
      this.searchadd = !this.searchadd;
      this.myaddress = v;
      this.geohash = v2;
    },
    // 请求添加地址
    sureaddaddress() {
      // console.log(this.addressname)
      this.$http({
        method: "post",
        url:
          "https://elm.cangdu.org/v1/users/" +
          this.$store.state.res.data.user_id +
          "/addresses",
        data: {
          address: this.myaddress,
          address_detail: this.myaddress2,
          geohash: this.geohash,
          name: this.myname,
          phone: this.myphone,
          tag: this.mytag,
          sex: this.mysex,
          phone_bk: this.myphone2,
          tag_type: 2
        }
      }).then(res => {
        this.gotaddresslist()
        // this.adressinfor = !this.adressinfor;
        this.newaddress=!this.newaddress;
      
      });
    }
    // 确认下单
  }
};
</script>

<style>
.sureorder_wrap {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  top: 52px;
}
.sect {
  width: 100%;
  padding: 2%;
  box-sizing: border-box;
  position: relative;
}
.huabian {
  background: url("../../assets/order.png");
  height: 5px;
  width: 102%;
  left: -2%;
  position: absolute;
  bottom: -5px;
}
.surefoot {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 0;
}
.surefoot div {
  display: inline-block;
  padding: 5%;
  box-sizing: border-box;
  font-size: 16px;
}
/* 选择地址 */
.addressLi {
  padding: 2%;
  width: 96%;
}
.addressLi div {
  display: inline-block;
}
.addressLi div:nth-child(1) {
  width: 6%;
}
.addressLi div:nth-child(2) {
  width: 90%;
  vertical-align: middle;
}
.addressLi span {
  line-height: 30px;
  color: #333;
}
.chosedcolor {
  /* background: rgb(76, 217, 100); */
  color: rgb(76, 217, 100);
}

/* 新增地址 */
.new_add {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  top: 52px;
}
.new_add_div {
  box-sizing: border-box;
  background: white;
}
.new_add_div span,
input {
  display: inline-block;
}
.new_add_div span {
  width: 30%;
  text-align: center;
}
.new_add_div input {
  width: 60%;
  font-size: 16px;
  border: none;
  outline: none;
  padding: 15px;
  border-bottom: 1px solid rgb(217, 216, 219);
}
.el-icon-circle-check {
  color: #ccc;
}
.sexcolor {
  color: #4cd964;
}
</style>
