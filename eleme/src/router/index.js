import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchCity from '@/components/SearchCity'
import Search from '@/components/search/Search'
import Login from '@/components/Login'
import ResetPassword from '@/components/ResetPassword'
import Profile from '@/components/my/Profile'
import Shophome from '@/components/shop/Shophome'
import StoreDetail from '@/components/shop/StoreDetail'
import StoreInformation from '@/components/shop/StoreInformation'
import CompanyDetail from '@/components/shop/CompanyDetail'
import Goods from '@/components/shop/Goods'
import Rate from '@/components/shop/Rate'
import GoodsDetail from '@/components/shop/GoodsDetail'
import ConfirmOrder from '@/components/shop/ConfirmOrder'
import SearchResturant from '@/components/shop/SearchResturant'
import Makeorder from '@/components/shop/Makeorder'
// 新增
import Money from '@/components/my/son/Money'
import Balance_m from "@/components/my/son/Balance_m";
import Userinfor from "@/components/my/son/userinfor/Userinfor";
import Discounts from "@/components/my/son/discounts";
import Lntegral from "@/components/my/son/Lntegral";
import Clubcard from "@/components/my/son/Clubcard";
import Service from "@/components/my/son/Service";
import Order_con from "@/components/order/Order_con";
// ///订单页面
import Order from '@/components/order/Order';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/searchCity',
      name: 'searchCity',
      component: SearchCity
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/shophome',
      name: 'shophome',
      component: Shophome
    },
    {
      path: '/storeDetail',
      name: 'storeDetail',
      component: StoreDetail,
      // redirect:{name:'goods'},
      children:[
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'rate',
          name: 'rate',
          component: Rate
        }
      ]
    },
    {
      path: '/storeInformation',
      name: 'storeInformation',
      component: StoreInformation
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      component: CompanyDetail
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/searchResturant',
      name: 'searchResturant',
      component: SearchResturant
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
        ////////////////////我的
        // 我子组件
        {
          path: '/money',
          name: 'money',
          component: Money,
        }, {
          path: '/balance',
          name: 'balance',
          component: Balance_m,
        }, {
          path: '/userinfor',
          name: 'userinfor',
          component: Userinfor,
        }, {
          path: '/discounts',
          name: 'discounts',
          component: Discounts,
        },
        // 我的积分
        {
          path: '/lntegral',
          name: 'lntegral',
          component: Lntegral,
        },
        // 我的会员
        {
          path: '/clubcard',
          name: 'clubcard',
          component: Clubcard,
        },
        // 服务中心
        {
          path: '/service',
          name: 'service',
          component: Service,
        },
        // /////////////////////订单
        {
          path: '/order',
          name: 'order',
          component: Order,
        },
        // 去订单详情

        {
          path: '/order_con',
          name: 'order_con',
          component: Order_con,
        }, 
        {
          path: '/makeorder',
          name: 'makeorder',
          component: Makeorder,
        },
  ]
})
