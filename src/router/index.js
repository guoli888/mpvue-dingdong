module.exports = [{
    // 页面路径
    path: '/pages/index/index',
    // 这部分走页面的json文件
    config: {
      // 页面标题
      navigationBarTitleText: '首页',
      // 页面中引用的组件  全局
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-input': '../../static/iview/input/index',
        'i-card': '../../static/iview/card/index',
        'i-steps': '../../static/iview/steps/index',
        'i-step': '../../static/iview/step/index',
        'i-button': '../../static/iview/button/index'
      }
    }
  },
  {
    path: '/pages/login/index',
    config: {
      navigationBarTitleText: '登录',
      usingComponents: {
        'i-toast': '../../static/iview/toast/index',
        'i-input': '../../static/iview/input/index'
      }
    }
  },
  {
    path: '/pages/switchCity/index',
    config: {
      navigationBarTitleText: '切换城市',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-button': '../../static/iview/button/index',
        "i-index": "../../static/iview/index/index",
        "i-index-item": "../../static/iview/index-item/index"
      }
    }
  },
  {
    path: '/pages/search/index',
    config: {
      navigationBarTitleText: '搜索',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index'
      }
    }
  },
  {
    path: '/pages/shop/index',
    config: {
      navigationBarTitleText: '商城',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index'
      }
    }
  },
  {
    path: '/pages/cart/index',
    config: {
      navigationBarTitleText: '购物车',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        "i-checkbox-group": "../../static/iview/checkbox-group/index",
        'i-checkbox': '../../static/iview/checkbox/index'
      }
    }
  },
  {
    path: '/pages/userIndex/index',
    config: {
      navigationBarTitleText: '我的',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-icon': '../../static/iview/icon/index',
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index'
      }
    }
  },
  {
    path: '/pages/category/index',
    config: {
      navigationBarTitleText: '商家列表',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index',
        'i-rate': '../../static/iview/rate/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/storeInfo/index',
    config: {
      navigationBarTitleText: '店铺详情',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-tabs': '../../static/iview/tabs/index',
        'i-tab': '../../static/iview/tab/index',
        'i-rate': '../../static/iview/rate/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/goodsInfo/index',
    config: {
      navigationBarTitleText: '商品信息',
      usingComponents: {
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/orderConfirm/index',
    config: {
      navigationBarTitleText: '确认订单',
      usingComponents: {
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/orderDetail/index',
    config: {
      navigationBarTitleText: '订单详情',
      usingComponents: {
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/adress/index',
    config: {
      navigationBarTitleText: '地址管理',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-checkbox': '../../static/iview/checkbox/index',
        'i-cell': '../../static/iview/cell/index',
        "i-radio-group": "../../static/iview/radio-group/index",
        "i-radio": "../../static/iview/radio/index"
      }
    }
  },
  {
    path: '/pages/orderList/index',
    config: {
      navigationBarTitleText: '订单列表',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
      }
    }
  },
  {
    path: '/pages/payment/index',
    config: {
      navigationBarTitleText: '支付订单',
      usingComponents: {}
    }
  },
  {
    path: '/pages/paymentFailure/index',
    config: {
      navigationBarTitleText: '支付失败',
      usingComponents: {}
    }
  },
  {
    path: '/pages/paymentSuccess/index',
    config: {
      navigationBarTitleText: '支付成功',
      usingComponents: {}
    }
  },
  {
    path: '/pages/userInfo/index',
    config: {
      navigationBarTitleText: '用户信息',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-avatar': '../../static/iview/avatar/index'
      }
    }
  },
  {
    path: '/pages/adressEdit/index',
    config: {
      navigationBarTitleText: '编辑地址',
      usingComponents: {
        'i-checkbox': '/static/iview/checkbox/index'

      }
    }
  },
  {
    path: '/pages/about/index',
    config: {
      navigationBarTitleText: '关于我们',
      usingComponents: {}
    }
  },
  {
    path: '/pages/setting/index',
    config: {
      navigationBarTitleText: '设置',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/review/index',
    config: {
      navigationBarTitleText: '评价',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-rate': '../../static/iview/rate/index',
        "wux-upload": "../../static/wux-weapp/upload/index"
      }
    }
  },
  {
    path: '/pages/reviewList/index',
    config: {
      navigationBarTitleText: '查看评价',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-rate': '../../static/iview/rate/index',
        "wux-upload": "../../static/wux-weapp/upload/index"
      }
    }
  },
  {
    path: '/pages/reviewDetail/index',
    config: {
      navigationBarTitleText: '评价详情',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-rate': '../../static/iview/rate/index',
        "wux-upload": "../../static/wux-weapp/upload/index"
      }
    }
  },
  {
    path: '/pages/recruit/index',
    config: {
      navigationBarTitleText: '招聘信息',
      usingComponents: {
        'i-row': '../../static/iview/row/index',
        'i-col': '../../static/iview/col/index',
        'i-cell-group': '../../static/iview/cell-group/index',
        'i-cell': '../../static/iview/cell/index',
        'i-rate': '../../static/iview/rate/index',
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/recruitment/index',
    config: {
      navigationBarTitleText: '招聘详情',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/recruitApply/index',
    config: {
      navigationBarTitleText: '我要报名',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/goodsRecuit/index',
    config: {
      navigationBarTitleText: '服务评价',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
        'i-rate': '../../static/iview/rate/index',
      }
    }
  },
  {
    path: '/pages/coupon/index',
    config: {
      navigationBarTitleText: '优惠券',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
      }
    }
  }, {
    path: '/pages/getCoupon/index',
    config: {
      navigationBarTitleText: '领取优惠券',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index',
      }
    }
  },
  {
    path: '/pages/feedBack/index',
    config: {
      navigationBarTitleText: '意见反馈',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/chooseCoupon/index',
    config: {
      navigationBarTitleText: '选择优惠券',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/recharge/index',
    config: {
      navigationBarTitleText: '余额充值',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/rechargeRecord/index',
    config: {
      navigationBarTitleText: '充值记录',
      usingComponents: {
        'i-icon': '../../static/iview/icon/index'
      }
    }
  },
  {
    path: '/pages/rechargeFailure/index',
    config: {
      navigationBarTitleText: '充值失败',
      usingComponents: {}
    }
  },
  {
    path: '/pages/rechargeSuccess/index',
    config: {
      navigationBarTitleText: '充值成功',
      usingComponents: {}
    }
  }
]
