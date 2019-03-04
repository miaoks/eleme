export default {
    //登陆信息
    login(state, res) {
        console.log(res, "aaa")
        state.res = res;
    },
    // 城市搜索
    updated_guess_city(state, guess_city) {
        // console.log(state,guess_city)
        this.state.guess_city_infor = guess_city;
        // console.log(this.state.guess_city_infor)
    },
    history(state, v) {
        this.state.history.unshift(v)
    },
    clear() {
        this.state.history = [];
    },
    gouto(state, add) {
        console.log(add)
        if (add == 'shophome') {
            this.state.order = false;
            this.state.search = false;
            this.state.profile = false;
            this.state.shophome = true;
            console.log("外卖")

        } else if (add == 'search') {
            this.state.shophome = false;
            this.state.order = false;
            this.state.profile = false;
            this.state.search = true;
        } else if (add == 'order') {
            this.state.shophome = false;
            this.state.search = false;
            this.state.profile = false;
            this.state.order = true;
        } else if (add == 'profile') {
            this.state.shophome = false;
            this.state.order = false;
            this.state.search = false;
            this.state.profile = true;
            console.log("我的")
        }
    },
    // 商品状态修改
revise(state,value){
this.state.food_request=value;
},
// 商铺信息
    updaterestaruant_data(state,v) {
        this.state.restaruant_data=v;
    }
}