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
      redirect:{name:'goods'},
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
    }
  ]
})
