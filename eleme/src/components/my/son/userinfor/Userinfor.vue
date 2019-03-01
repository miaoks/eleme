<template>
    <article style="postion:absolute;right:0;left:0;">
        <div class="user_infor" v-show="!upusername&&!addadress&&!upuserpass">
            <Header :left_msg="left" :middle_msg="middle" :right_msg="right"></Header>
            <div class="infor_div">
                <section class=" sec1" @click="$refs.file_inp.click()">
                    <div class="popout" v-if="dis" style="transform:scale(1);transition: all 10s;">
                        <input type="button" value="上传失败" @click.stop="display()">
                    </div>
                    <input type="file" name="" ref="file_inp" @change="changeImage($event)" multiple style="display:none;">
                    <h3>头像</h3>
                    <span>
                            <img src="//elm.cangdu.org/img/default.jpg" alt="">
                            <i class="el-icon-arrow-right"></i>
                            </span>
                </section>
                <section @click="username()">
                    <h3>用户名</h3>
                    <i class="el-icon-arrow-right"></i>
                </section>
                <!-- //////////////////////////////////////// -->
                <section @click="newaddress()">
                    <h3>收货地址</h3>
                    <i class="el-icon-arrow-right"></i>
                </section>
                <div style="padding:10px 0;margin-left:10px;color: #666;font-size:14px;">账号绑定</div>
                <section @click.stop="phone=!phone">
                    <div v-if="phone" style="position:fixed;width:60%;background:gray;padding-bottom:60%;margin:-20% 20% 0;">
                        <p style="text-algin:center;font-size:50px;position:absolute;">请在手机APP上设置</p>
                        <button @click.stop="phone=!phone" style="position:absolute;bottom:0;color:white;background:red;width:100%;height:50px;z-index:100;font-size:30px;">确定</button>
                    </div>
                    <h3><i class="el-icon-phone-outline" style="background:#10AFFF;margin-right:10px;"></i>手机</h3>
                    <i class="el-icon-arrow-right"></i>
                </section>
                <div style="padding:10px 0;margin-left:10px;color: #666;font-size:14px;">安全设置</div>
                <section @click="upuserpass=!upuserpass,getCode()">
                    <h3>登录密码</h3>
                    <span><span style="font-size:20px;color:#666;">修改</span><i class="el-icon-arrow-right"></i></span>
                </section>
                <button class="user_btn" @click="unlogin=!unlogin">退出登录</button>
            </div>
        </div>
        <!-- 更改用户名 -->
        <div class="upusernaem" v-show="upusername" style="position:relative;width:100;top:0;bottom:0;background:#F2F2F2;">
            <i class="el-icon-arrow-left" style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;" @click="username"></i>
            <Header left_msg="left" middle_msg="修改用户名" :right_msg="right"></Header>
            <input id="newname" type="text" style="margin:3%;width:94%;margin-top:66px;height:50px;outline:none;font-size:22px;background:#F2F2F2;border:1px solid rgb(175, 175, 175);" placeholder="输入用户名" v-model="newusername" @input="inpupdate()">
            <p id="newp" style="color: #666; margin:1% 3%;width:94%;">用户名只能修改一次(5-24)字符之间</p>
            <button style="width:94%;margin:3%;height:50px;background:#3199E8;border:none;outline:none;color: #fff;font-size:20px;" :disabled="newusername.length>5&&newusername.length<24?false:true" @click="updateusername()">确认修改</button>
        </div>
        <!-- 添加收货地址 -->
        <div class="addadress" v-show="addadress&&!adressinfor" style="display:relative">
            <i class="el-icon-arrow-left" style="z-index:111;position:fixed;color:white;font-size:30px;top:10px;left:10px;" @click="newaddress"></i>
            <span v-if="!editOrover" @click="editOrover=!editOrover" style="z-index:111;position:fixed;color:white;right:10px;top:15px;">编辑</span>
            <span v-else @click="editOrover=!editOrover" style="z-index:111;position:fixed;color:white;right:10px;top:15px;">完成</span>
            <Header left_msg="left" middle_msg="编辑地址" :right_msg="right"></Header>
            <div style="height:62px;"></div>
            <ul>
                <li v-for="(v,i) in addadressarr.data" :key="i" style="background:#FFF8CA;list-style:none;border:1px solid #F2F2F2;border-left:0;border-right:0;height:50px;padding-top:10px;padding-bottom:10px;position:relative;">
                    <span style="margin:15px;font-size:20px;">{{v.name}}</span><br style="height:15px;line-height:25px;"><span style="margin:15px;font-size:20px;line-height:25px;">{{v.address}}</span>
                    <i v-if="editOrover" class="el-icon-close" style="position:absolute;right:10px;top:25px;" @click="deladdress(v)"></i>
                </li>
            </ul>
            <div style="width:94%;padding:0 3%;height:50px;background:white;border:1px solid #F2F2F2;border-left:0;border-right:0;font-size:20px;line-height:50px;" @click="adressinfor=!adressinfor">新增地址<i style="float:right;line-height:50px;" class="el-icon-arrow-right"></i></div>
        </div>
        <div class="adressinfor" v-show="adressinfor&&!adressguess">
            <i class="el-icon-arrow-left" style="z-index:100;position:absolute;color:white;font-size:30px;top:10px;left:10px;z-index:111;" @click="adressinfor=!adressinfor"></i>
            <Header left_msg="left" middle_msg="新增地址" :right_msg="right"></Header>
            <section style="width:100%;position:relative;top:60px;">
                <input v-model="newname" type="text" style="background:#F2F2F2;width:94%;margin:1% 3%;height:30px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;" placeholder="请填写姓名">
                <input type="text" style="background:#F2F2F2;width:94%;margin:1% 3%;height:30px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;" placeholder="小区/写字楼/学校等;" @click="adressguess=!adressguess" v-model="sureaddress">
                <input v-model="detailsaddress" type="text" style="background:#F2F2F2;width:94%;margin:1% 3%;height:30px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;" placeholder="请填写详细送餐地址">
                <input v-model="newphone" type="text" style="background:#F2F2F2;width:94%;margin:1% 3%;height:30px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;" placeholder="请填写能够联系到您的手机号">
                <input v-model="readyphone" type="text" style="background:#F2F2F2;width:94%;margin:1% 3%;height:30px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;" placeholder="备用联系电话（选填）">
            </section>
            <input type="button" style="background:#4CD964;width:94%;margin:3%;height:40px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;position:relative;top:50px;color:white;" value="新增地址" @click="sureaddaddress()">
        </div>
        <!-- 搜索地址 -->
        <div class="adressguess" v-show="adressguess">
            <i class="el-icon-arrow-left" style="z-index:100;position:fixed;color:white;font-size:30px;top:10px;left:10px;z-index:111;" @click="adressguess=!adressguess"></i>
            <Header style="z-index:1000;" :left_msg="0" middle_msg="搜索地址" :right_msg="right"></Header>
            <div style="position:relative;top:60px;">
                <input v-model="inpvalue" type="text" style="background:#F2F2F2;width:65%;margin:1% 3%;height:35px;border:1px solid gray;outline:none;border-radius:5px;font-size:14px;">
                <button style="width:25%;height:35px;outline:none;border:none;color:white;background:#3199E8;border-radius:5px;" @click="searchad()">确认</button>
                <div style="width:94%;padding:3%;font-size:14px;color: #ff883f;background: #fff6e4;">为了满足商家的送餐要求，建议您从列表中选择地址</div>
            </div>
            <div style="position:relative;top:160px;text-align:center;" v-if="addressname==''">
                <p style="color: #969696;margin-bottom:10px;">找不到地址？</p>
                <p style="color: #969696;margin-bottom:10px;">请尝试输入小区、写字楼或学校名</p>
                <p style="color: #969696;margin-bottom:10px;">详细地址（如门牌号）可稍后输入哦。</p>
            </div>
            <ul v-if="addressname!=''" style="position:relative;top:70px;background:#F2F2F2;">
                <li v-for="(va,ind) in addressname" :key="ind" style="border-bottom:1px solid gray;width:94%;padding:3%;" @click="getaddress(va.name,va.geohash)">
                    <p style="color: #969696;margin-bottom:10px;">{{va.name}}</p>
                    <p style="color: #969696;">{{va.address}}</p>
                </li>
            </ul>
        </div>
        <!-- 修改密码 -->
        <div class="updatepass" v-if="upuserpass">
            <i class="el-icon-arrow-left" style="z-index:111;position:absolute;color:white;font-size:30px;top:10px;left:10px;" @click="upuserpass=!upuserpass"></i>
            <Header :left_msg="0" middle_msg="重置密码" :right_msg="right"></Header>
            <input v-model="myname" type="text" placeholder="账号" style="margin-top:60px;padding:3%;font-size:20px;border-bottom:1px solid gray;border-top:1px solid gray;width:94%;outline:none;"><br>
            <input v-model="myoldpass" type="text" placeholder="旧密码" style="padding:3%;font-size:20px;border-bottom:1px solid gray;width:94%;outline:none;"><br>
            <input v-model="mynewpass" type="text" placeholder="请输入新密码" style="padding:3%;font-size:20px;border-bottom:1px solid gray;width:94%;outline:none;"><br>
            <input v-model="mynewpasss" type="text" placeholder="请确认新密码" style="padding:3%;font-size:20px;border-bottom:1px solid gray;width:94%;outline:none;"><br>
            <input v-model="mycode" type="text" placeholder="验证码" style="padding:3%;font-size:20px;width:60%;outline:none;">
            <span style="display:inline-block;padding-top:10px; width:30%;" @click=" getCode()">
                        <img :src="codeImg" style="width:50%;">
                        <div style="height:40px;width:50px;display:inline-block;width:40%;">
                            <span style="font-size:30%;">看不清</span><br>
            <span style="color:#3190E8;font-size:30%;">换一张</span>
        </div>
        </span>
        <hr style="margin-top:0px;">
        <input type="button" placeholder="验证码" style="margin:3%;font-size:20px;width:94%;outline:none;height:50px;background:#4CD964;color:white;border-radius:4px;" value="确认修改" @click="revisepassword()">
        <div v-if="newpassword" style="position:fixed;width:60%;background:gray;padding-bottom:60%;margin:-50% 20% 0;border-radius:5px;">
            <p style="text-algin:center;font-size:200%;position:absolute;">{{resmsg}}</p>
            <button @click.stop="newpassword=!newpassword" style="position:absolute;bottom:0;color:white;background:#4CD964;width:100%;height:50px;z-index:100;font-size:30px;">确定</button>
        </div>
        </div>
        <div v-if="unlogin" style="margin:20% 3% 0;width:94%;padding-bottom:80%;background:#F2F2F2;position:fixed;">
            <p style="position:absolute;left:0;right:0;text-align:center;top:40%;font-size:200%">是否退出登录</p>
            <button style="position:absolute;width:30%;height:40px;left:18%;bottom:0;border-radius:5px;border:0;outline:none;" @click="unlogin=!unlogin">在等等</button>
            <button style="position:absolute;width:30%;height:40px;right:18%;bottom:0;background:#DD6B55;border-radius:5px;border:0;outline:none;" @click="goover()">退出登录</button>
        </div>
    </article>
</template>

<script>
    import Header from "@/components/common/Header"
    export default {
        data() {
            return {
                unlogin:false,
                upuserpass: false,
                phone: false,
                editOrover: false,
                left: "el-icon-arrow-left",
                middle: "账户信息",
                right: false,
                balance: '0.00',
                dis: false,
                upusername: false,
                newusername: "",
                addadress: false,
                // 收货地址列表
                addadressarr: "",
                adressinfor: false,
                adressguess: false,
                // 搜索地址
                inpvalue: "",
                addressname: "",
                // 确定地址
                sureaddress: "",
                detailsaddress: "",
                newname: "",
                newphone: "",
                readyphone: "",
                geohash: "",
                // 验证码
                codeImg: "",
                // 修改密码
                myname: "",
                myoldpass: "",
                mynewpass: "",
                mynewpasss: "",
                mycode: "",
                newpassword: false,
                resmsg: ""
            }
        },
        components: {
            Header,
        },
        methods: {
            // 退出登录
            goover(){
                this.$http({
                    method:"get",
                    url:"https://elm.cangdu.org/v2/signout"
                }).then((res)=>{
                    this.$router.push({name:'login'});
                    this.$store.state.res="";
                })
            },
            // 确认修该密码
            revisepassword() {
                this.resmsg = "";
                this.$http({
                    method: "post",
                    url: "https://elm.cangdu.org/v2/changepassword",
                    withCredentials: true, // 默认false
                    data: {
                        username: this.myname,
                        oldpassWord: this.myoldpass,
                        newpassword: this.mynewpass,
                        confirmpassword: this.mynewpasss,
                        captcha_code: this.mycode,
                    }
                }).then((res) => {
                    console.log(this.myname, this.myoldpass, this.mynewpass, this.mynewpasss, this.mycode)
                    console.log(res.data.message, res.data)
                    if (!!res.data.message) {
                        this.newpassword = !this.newpassword;
                        this.resmsg = res.data.message;
                        this.getCode();
                    } else {
                        this.newpassword = !this.newpassword;
                        this.resmsg = res.data.success;
                        this.getCode();
                    }
                })
            },
            // 请求验证码
            getCode() {
                this.$http({
                    method: "POST",
                    url: "https://elm.cangdu.org/v1/captchas",
                    withCredentials: true // 默认false
                }).then(res => {
                    // console.log(res);
                    if (res.data.status == 200) {}
                    this.codeImg = res.data.code;
                    //   console.log(res)
                    // this.$router.push({name:"my",query:res.data,params:{pID:res.data.id}});
                });
            },
            // 删除收货地址
            deladdress(aa) {
                // console.log(aa.id,aa.user_id,aa)
                this.$http({
                    method: "DELETE",
                    url: "https://elm.cangdu.org/v1/users/" + aa.user_id + "/addresses/" + aa.id,
                }).then((res) => {
                    console.log(res)
                    this.alladdress();
                })
            },
            // 请求添加地址
            sureaddaddress() {
                // console.log(this.addressname)
                this.$http({
                    method: "post",
                    url: "https://elm.cangdu.org/v1/users/" + this.$store.state.res.data.user_id + "/addresses",
                    data: {
                        address: this.sureaddress,
                        address_detail: this.detailsaddress,
                        geohash: this.geohash,
                        name: this.newname,
                        phone: this.newphone,
                        tag: "中南海",
                        sex: 1,
                        phone_bk: this.readyphone,
                        tag_type: 2,
                    }
                }).then((res) => {
                    this.alladdress();
                    this.adressinfor = !this.adressinfor;
                })
            },
            // 获取地址
            getaddress(v, v2) {
                this.sureaddress = v;
                this.adressguess = !this.adressguess;
                this.geohash = v2;
            },
            // 搜索地址
            searchad() {
                console.log(this.$store.state.guess_city_infor.id)
                this.$http({
                    method: "get",
                    url: "https://elm.cangdu.org/v1/pois",
                    params: {
                        city_id: this.$store.state.guess_city_infor.id,
                        keyword: this.inpvalue,
                    }
                }).then((res) => {
                    console.log(res, 22222222)
                    this.addressname = res.data;
                })
            },
            // 添加收货地址
            newaddress() {
                this.addadress = !this.addadress;
            },
            // 获取收货地址列表
            alladdress() {
                this.$http({
                    method: "get",
                    url: "https://elm.cangdu.org/v1/users/" + this.$store.state.res.data.user_id + "/addresses"
                }).then((res) => {
                    this.addadressarr = res;
                })
            },
            inpupdate() {
                let tf = this.newusername.length > 5 && this.newusername.length < 24 ? false : true
                if (tf) {
                    document.getElementById("newname").style.border = "1px solid red"
                    document.getElementById("newp").style.color = "red"
                } else {
                    document.getElementById("newname").style.border = "1px solid rgb(175, 175, 175)";
                    document.getElementById("newp").style.color = "#666"
                }
            },
            updateusername() {
                alert("没有找到修改用户名的接口")
            },
            changeImage(e) {
                console.log(e.target.files[0])
                console.log(window.FileReader)
                this.display()
            },
            display() {
                this.dis = !this.dis;
            },
            username() {
                this.upusername = !this.upusername
            }
        },
        created() {
            this.alladdress();
        }
    }
</script>

<style>
    .user_infor {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background: #F2F2F2F2;
    }
    .infor_div {
        position: relative;
        top: 62px;
    }
    .infor_div section {
        box-sizing: border-box;
        background: #FFFFFF;
        border-left: 10px solid #FFFFFF;
        border-right: 10px solid #FFFFFF;
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-top: 1px solid #DDDDDD;
        border-bottom: 1px solid #DDDDDD;
        height: 50px;
        padding: 14px 0;
    }
    .infor_div section i {
        color: rgb(224, 223, 223);
        font-weight: 1000;
    }
    .infor_div section h3 {
        color: #333;
        font-weight: 500;
    }
    .sec1 {
        padding: 0!important;
        height: 90px!important;
    }
    .sec1 img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 20px 0;
        vertical-align: middle;
    }
    .sec1 h3 {
        line-height: 90px;
        color: #333;
        font-weight: 500;
    }
    .user_btn {
        margin-top: 34px;
        height: 34px;
        width: 96%;
        border-radius: 5px;
        background-color: #D8584A;
        text-align: center;
        border: none;
        outline: none;
        color: white;
        margin-left: 2%;
        margin-bottom: 2%;
    }
    .popout {
        width: 60%;
        padding-bottom: 60%;
        border-radius: 5px;
        position: absolute;
        left: 20%;
        margin-top: 20%;
        background: yellowgreen;
        /* border: 10px solid blue; */
        transform: scale(0);
    }
    .popout input {
        background: red;
        color: white;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20%;
    }
</style>
