<template>
    <div>
        <Header :left_msg="left" middle_msg="订单详情"></Header>
        <div class="or_con">
            <div style="width:100%;text-align:center;padding:10px 0;background:white;">
                <img style="width:70px;border-radius:50%;" :src="'//elm.cangdu.org/img/'+res.restaurant_image_url" >
                <p style="margin-top:10px;font-size:20px;"><b>{{res.status_bar.title}}</b></p>
                <div style="border:1px solid #3E90E8;color:#3E90E8;display:inline-block;padding:7px;border-radius:5px;font-size:12px;margin-top:15px;">再来一单</div>
            </div>
            <div  style="width:100%;text-align:left;padding:10px 0;background:white;margin-top:10px;position:relative;">
                <img style="width:35px;vertical-align:middle;" :src="'//elm.cangdu.org/img/'+res.restaurant_image_url">
                <span style="width:100%;position:relative;">{{res.restaurant_name}} </span>
                <i class="el-icon-arrow-right" style="position:absolute;right:10px;line-height:40px;"></i>
            </div>
            <div style="width:100%;text-align:left;background:white;position:relative;border-top:1px solid #F2F2F2;">
                <div v-for="(value,index) in res.basket.group[0]" :key="index" style="width:94%;border-bottom:1px solid #F2F2F2;padding:2%;display:flex; justify-content: space-between;">
                    <span>{{value.name}}</span>
                    <span><span style="color:grey;">Ｘ{{value.quantity}}</span>&nbsp;&nbsp;&nbsp;<span>￥{{value.price}}</span></span>
                </div>
            </div>
            <div style="width:95%;text-align:left;background:white;position:relative;border-top:1px solid #F2F2F2;display:flex; justify-content: space-between;padding:3% 3% 3% 2%;">
                <span>{{res.basket.deliver_fee.name}}</span>
                <span>{{res.basket.deliver_fee.price}}</span>
            </div>
            <div style="width:94%;text-align:right;background:white;position:relative;border-top:1px solid #F2F2F2;padding:3%;">
                <span style="color:red;">实付{{res.total_amount.toFixed(2)}}</span>
            </div>
            <!-- 配送信息 -->
            <div style="width:96%;text-align:left;padding:10px 2%;background:white;margin-top:10px;position:relative;">
                <p>配送信息</p>
            </div>
            <div style="width:96%;text-align:left;padding:10px 2%;background:white;position:relative;">
                <p>送达时间：尽快送达</p>
                <hr>
                <p>送货地址：待选择</p>
                <hr>
                <p>配送方式：蜂鸟专送(找不到口)</p>
            </div>
            <div style="width:96%;text-align:left;padding:10px 2%;background:white;margin-top:10px;position:relative;">
                <p>订单信息</p>
            </div>
            <div style="width:96%;text-align:left;padding:10px 2%;background:white;position:relative;">
                <p>订单号：{{res.id}}</p>
                <hr>
                <p>支付方式：在线支付(找不到路径)</p>
                <hr>
                <p>下单事件：{{res.formatted_created_at}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../common/Header";
export default {
    data(){
        return{
            left:"el-icon-arrow-left",
            res:this.$route.params.o
        }
    },
    components:{
        Header,
    },
    created(){
        console.log(this.$route.params.o)
    }
}
</script>

<style>
.or_con {
    position: absolute;
    top:52px;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #F2F2F2;
   
}
</style>
