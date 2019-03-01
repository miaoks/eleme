import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// 固定写法
Vue.use(Vuex)
// 创建全局存储器,管理状态
const store = new Vuex.Store({
    // 类似data,是个共享的状态!
    state,
    // 类似于computer,依赖于state
    getters,
    // 类似methods,让组件调用修改状态
    //问题: 任何在回调函数中进行的状态的改变都是不可追踪的
    //不能在mutations中有异步操作,mutation都是同步事物
    mutations,
    // 可以处理异步操作
    actions
  })
  
// console.log("vuex", Vuex);
export default store;