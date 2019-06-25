import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import '../static/weui/weui.css'

var Fly = require('flyio/dist/npm/wx')

var fly = new Fly()

Vue.prototype.$http = fly

Vue.config.productionTip = false

import IboxPlugin from '@/plugins/ibox'
Vue.use(IboxPlugin)

const app = new Vue({
  store,
  ...App
})

app.$mount()

export default {
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '叮咚在家',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      debug: true
    },
    'tabBar': {
      'backgroundColor': '#fff',
      'selectedColor': '#32b287',
      'color': '#929292',
      'borderStyle': '1px solid #ebebeb',
      'list': [{
          'pagePath': 'pages/index/index',
          'iconPath': 'static/images/home.png',
          'selectedIconPath': 'static/images/seletedHome.png',
          'text': '首页'
        },
        {
          'pagePath': 'pages/shop/index',
          'iconPath': 'static/images/shop.png',
          'selectedIconPath': 'static/images/seletedShop.png',
          'text': '商城'
        },
        {
          'pagePath': 'pages/cart/index',
          'iconPath': 'static/images/cart.png',
          'selectedIconPath': 'static/images/seletedCart.png',
          'text': '购物车'
        },
        {
          'pagePath': 'pages/userIndex/index',
          'iconPath': 'static/images/my.png',
          'selectedIconPath': 'static/images/seletedMy.png',
          'text': '我的'
        }
      ]
    }
  }
}
