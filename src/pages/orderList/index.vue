<template>
  <div class="orderList">
   <div class="tab">
      <div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title">{{item.name}}</div>
          </div>
        </block>
      </div>
      <div>
        <!-- 全部 -->
        <div :hidden="activeIndex != 0">
          <div class="allOrder">
            <div class="no-data" v-if="isEmpty">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 您还没有相关的订单 </p>
            </div>
            <ul>
              <li class="list-item" v-for="(item, index) in orderList" :key="index">
                <div class="list-top">
                  <div class="span20 col">订单号：{{item.order_sn}}</div>
                  <div class="span4 col" v-if="item.cancel_time > datetime && item.pay_time == 0">待支付</div>
                  <!-- <div class="span4 col" v-if="item.cancel_time < datetime && item.pay_time == 0">已取消</div> -->
                  <div class="span4 col" v-if="item.pay_time > 0 && item.receipt_time == 0">已支付</div>
                  <div class="span4 col" v-if="item.receipt_time > 0 && item.complete_time > datetime">待评价</div>
                  <div class="span4 col" v-if="item.receipt_time > 0 && item.complete_time < datetime">已完成</div>
                </div>
                <div class="list-content" v-for="(goods, index2) in item.orderGoodsList" :key="index2">
                  <a @click="toInfo(goods.order_id)">
                  <img :src="goods.goods_cover" alt="">
                  <div class="right-body">
                    <p class="name">{{goods.goods_name}}</p>
                    <p class="price">
                      <span>￥{{goods.goods_price}}</span>
                    </p>
                    <p class="spec">
                      <span>{{goods.specification}}</span>
                      <span class="right">x{{goods.count}}</span>
                    </p>
                  </div>
                  </a>
                </div>
                <div class="button" v-if="item.cancel_time > datetime && item.pay_time == 0">
                  <!-- <button class="cancel" @click="cancel(item.id,index)">取消订单</button> -->
                  <button class="goPay" @click="goPay(item.id)">去付款</button>
                </div>
                <!-- <div class="button" v-if="item.cancel_time < datetime && item.pay_time == 0">
                  <button class="refund" @click="deleteOrder(item.id,index)">删除订单</button>
                </div> -->
                <div class="button" v-if="item.pay_time > 0 && item.receipt_time == 0">
                  <button class="goPay" @click="goComplete(item.id,index)">确认完成</button>
                </div>
                <div class="button" v-if="item.receipt_time > 0 && item.complete_time > datetime">
                  <button class="goPay" @click="goEvaluate(item.id,item.is_service)">去评价</button>
                </div>
                <div class="button" v-if="item.receipt_time > 0 && item.complete_time < datetime">
                  <button class="goPay" @click="seeEvalua(item.orderGoodsList[0].goods_id,item.id)">查看评价</button>
                </div>
                <div class="gray-border"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 全部结束 -->
        <!-- 待支付 -->
        <div :hidden="activeIndex != 1">
          <div class="waitOrder">
            <div class="no-data" v-if="isEmpty">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 您还没有相关的订单 </p>
            </div>
            <ul>
              <li class="list-item" v-for="(item, index) in orderList" :key="index">
                <div class="list-top">
                  <div class="span20 col">订单号：{{item.order_sn}}</div>
                  <div class="span4 col">待支付</div>
                </div>
                <div class="list-content" v-for="(goods, index2) in item.orderGoodsList" :key="index2">
                  <a @click="toInfo(goods.order_id)">
                  <img :src="goods.goods_cover" alt="">
                  <div class="right-body">
                    <p class="name">{{goods.goods_name}}</p>
                    <p class="price">
                      <span>￥{{goods.goods_price}}</span>
                    </p>
                    <p class="spec">
                      <span>{{goods.specification}}</span>
                      <span class="right">x{{goods.count}}</span>
                    </p>
                  </div>
                  </a>
                </div>
                <div class="button">
                  <!-- <button class="cancel" @click="cancel(item.id,index)">取消订单</button> -->
                  <button class="goPay" @click="goPay(item.id)">去付款</button>
                </div>
                <div class="gray-border"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 待支付结束 -->
        <!-- 已支付 -->
        <div :hidden="activeIndex != 2">
          <div class="paidOrder">
            <div class="no-data" v-if="isEmpty">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 您还没有相关的订单 </p>
            </div>
            <ul>
              <li class="list-item" v-for="(item, index) in orderList" :key="index">
                <div class="list-top">
                  <div class="span20 col">订单号：{{item.order_sn}}</div>
                  <div class="span4 col">已支付</div>
                </div>
                <div class="list-content" v-for="(goods, index2) in item.orderGoodsList" :key="index2">
                  <a @click="toInfo(goods.order_id)">
                  <img :src="goods.goods_cover" alt="">
                  <div class="right-body">
                    <p class="name">{{goods.goods_name}}</p>
                    <p class="price">
                      <span>￥{{goods.goods_price}}</span>
                    </p>
                    <p class="spec">
                      <span>{{goods.specification}}</span>
                      <span class="right">x{{goods.count}}</span>
                    </p>
                  </div>
                  </a>
                </div>
                <div class="button">
                  <button class="goPay" @click="goComplete(item.id,index)">确认完成</button>
                </div>
                <div class="gray-border"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 已支付结束 -->
        <!-- 待评价 -->
        <div :hidden="activeIndex != 3">
          <div class="paidOrder">
            <div class="no-data" v-if="isEmpty">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 您还没有相关的订单 </p>
            </div>
            <ul>
              <li class="list-item" v-for="(item, index) in orderList" :key="index">
                <div class="list-top">
                  <div class="span20 col">订单号：{{item.order_sn}}</div>
                  <div class="span4 col">待评价</div>
                </div>
                <div class="list-content" v-for="(goods, index2) in item.orderGoodsList" :key="index2">
                  <a @click="toInfo(goods.order_id)">
                  <img :src="goods.goods_cover" alt="">
                  <div class="right-body">
                    <p class="name">{{goods.goods_name}}</p>
                    <p class="price">
                      <span>￥{{goods.goods_price}}</span>
                    </p>
                    <p class="spec">
                      <span>{{goods.specification}}</span>
                      <span class="right">x{{goods.count}}</span>
                    </p>
                  </div>
                  </a>
                </div>
                <div class="button">
                  <button class="goPay" @click="goEvaluate(item.id,item.is_service)">去评价</button>
                </div>
                <div class="gray-border"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 待评价结束 -->
        <!-- 已完成 -->
        <div :hidden="activeIndex != 4">
          <div class="paidOrder">
            <div class="no-data" v-if="isEmpty">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 您还没有相关的订单 </p>
            </div>
            <ul>
              <li class="list-item" v-for="(item, index) in orderList" :key="index">
                <div class="list-top">
                  <div class="span20 col">订单号：{{item.order_sn}}</div>
                  <div class="span4 col">已完成</div>
                </div>
                <div class="list-content" v-for="(goods, index2) in item.orderGoodsList" :key="index2">
                  <a @click="toInfo(goods.order_id)">
                  <img :src="goods.goods_cover" alt="">
                  <div class="right-body">
                    <p class="name">{{goods.goods_name}}</p>
                    <p class="price">
                      <span>￥{{goods.goods_price}}</span>
                    </p>
                    <p class="spec">
                      <span>{{goods.specification}}</span>
                      <span class="right">x{{goods.count}}</span>
                    </p>
                  </div>
                  </a>
                </div>
                <div class="button">
                  <button class="goPay" @click="seeEvalua(item.orderGoodsList[0].goods_id,item.id)">查看评价</button>
                </div>
                <div class="gray-border"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 已完成结束 -->
      </div>
    </div>
  </div>
</template>

<script>
// 必须导入 否则编译报错
import _ from 'lodash'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

export default {
  components: {},

  data() {
    return {
      tabs: [
        {
          name: '全部',
          type: '1',
          checked: true
        },
        {
          name: '待支付',
          type: '2',
          checked: true
        },
        {
          name: '已支付',
          type: '3',
          checked: true
        },
        {
          name: '待评价',
          type: '4',
          checked: true
        },
        {
          name: '已完成',
          type: '5',
          checked: true
        }
      ],
      activeIndex: 0,
      orderList: [],
      datetime: '',
      isEmpty: false
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'navbar_slider_0'
      }
      if (this.activeIndex == 1) {
        return 'navbar_slider_1'
      }
      if (this.activeIndex == 2) {
        return 'navbar_slider_2'
      }
      if (this.activeIndex == 3) {
        return 'navbar_slider_3'
      }
      if (this.activeIndex == 4) {
        return 'navbar_slider_4'
      }
    }
  },
  onShow() {
    this.initData()
    this.activeIndex = parseInt(this.$root.$mp.query.activeIndex)
  },
  mounted() {},
  created() {},
  methods: {
    initData() {
      var _this = this
      var date = Math.round(new Date().getTime() / 1000).toString()
      _this.datetime = date
      this.activeIndex = parseInt(this.$root.$mp.query.activeIndex)
      if (this.activeIndex == 0) {
        var order_status = 'all'
      } else if (this.activeIndex == 1) {
        var order_status = 'wait_pay'
      } else if (this.activeIndex == 2) {
        var order_status = 'already_pay'
      } else if (this.activeIndex == 3) {
        var order_status = 'wait_evaluate'
      } else if (this.activeIndex == 4) {
        var order_status = 'already_finish'
      } else {
        var order_status = 'all'
      }
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6b9edaf2e12',
          {
            // id: 1
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            order_status: order_status
          }
        )
        .then(function(response) {
          // 返回请求数据
          _this.orderList = response.data.data
          console.log(_this.orderList)
          if (response.data.data.length == 0) {
            _this.isEmpty = true
          } else if (response.data.data.length != 0) {
            _this.isEmpty = false
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toInfo(option) {
      wx.navigateTo({
        url: '/pages/orderDetail/index?id=' + option
      })
    },
    // tab选项卡切换
    tabClick(e) {
      var _this = this
      this.activeIndex = e.currentTarget.id
      if (this.activeIndex == 0) {
        var order_status = 'all'
      } else if (this.activeIndex == 1) {
        var order_status = 'wait_pay'
      } else if (this.activeIndex == 2) {
        var order_status = 'already_pay'
      } else if (this.activeIndex == 3) {
        var order_status = 'wait_evaluate'
      } else if (this.activeIndex == 4) {
        var order_status = 'already_finish'
      }
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6b9edaf2e12',
          {
            // id: 1
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            order_status: order_status
          }
        )
        .then(function(response) {
          _this.orderList = response.data.data
          if (response.data.data.length == 0) {
            _this.isEmpty = true
          } else if (response.data.data.length != 0) {
            _this.isEmpty = false
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toReview() {
      wx.redirectTo({
        url: '/pages/review/index'
      })
    },
    cancel(id, index) {
      var _this = this
      wx.showModal({
        title: '取消该订单',
        content: '请确定是否取消该订单？',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#32b287',
        success: function(res) {
          if (res.confirm) {
            fly
              .post(
                'https://xiaochengxu.net199.com/public/index.php/api/5b6be5b42a373',
                {
                  version: 'v3.0',
                  app_id: '86793718',
                  access_token: wx.getStorageSync('token'),
                  order_id: id
                }
              )
              .then(function(response) {
                wx.showToast({
                  title: response.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: false
                })
                if (response.data.code === -1) {
                  wx.navigateTo({
                    url: '/pages/orderList/index'
                  })
                } else if (response.data.code === 1) {
                  _this.orderList.splice(index, 1)
                }
                console.log(response.data.data)
              })
              .catch(function(error) {
                console.log(error)
              })
          } else {
            console.log('用户点击否')
          }
        }
      })
    },
    goPay(id) {
      wx.navigateTo({
        url: '/pages/payment/index?order_id=' + id
      })
    },
    deleteOrder(id, index) {
      var _this = this
      wx.showModal({
        title: '删除该订单',
        content: '请确定是否删除该订单？',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#32b287',
        success: function(res) {
          if (res.confirm) {
            fly
              .post(
                'https://xiaochengxu.net199.com/public/index.php/api/5b72322580474',
                {
                  version: 'v3.0',
                  app_id: '86793718',
                  access_token: wx.getStorageSync('token'),
                  order_id: id
                }
              )
              .then(function(response) {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: true, // 显示透明蒙层，防止触摸穿透,
                  success: res => {}
                })
                if (response.data.code === -1) {
                  wx.navigateTo({
                    url: '/pages/orderList/index'
                  })
                } else if (response.data.code === 1) {
                  _this.orderList.splice(index, 1)
                }
                console.log(response.data.data)
              })
              .catch(function(error) {
                console.log(error)
              })
          } else {
            console.log('用户点击否')
          }
        }
      })
    },
    goComplete(id, index) {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b722558df3a2',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            order_id: id
          }
        )
        .then(function(response) {
          wx.showToast({
            title: response.data.msg, // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
          if (response.data.code === -1) {
            wx.redirectTo({ url: '/pages/orderList/index' })
          } else if (response.data.code === 1) {
            _this.orderList.splice(index, 1)
            wx.redirectTo({ url: '/pages/orderList/index?activeIndex=3' })
          }
          console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goEvaluate(id, is_service) {
      wx.navigateTo({
        url: '/pages/review/index?order_id=' + id + '&is_service=' + is_service
      })
    },
    seeEvalua(goodid, id) {
      wx.navigateTo({
        url: '/pages/reviewDetail/index?order_id=' + id
      })
    }
  }
}
</script>

<style>
/* 选项卡切换 */
.orderList .no-data {
  text-align: center;
  padding: 1rem 0.5rem 0.5rem;
}
.orderList .no-data img {
  width: 360rpx;
  height: 360rpx;
}
.orderList .no-data p {
  margin: 0.4rem 0;
  font-size: 0.32rem;
  color: #a4a4a6;
}
.navbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: #fff;
}
.navbar_item {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 0 0 25px 0;
  text-align: center;
  font-size: 0;
}
.navbar_item_on {
  color: #32b287;
  border-bottom: 2px solid #32b287 !important;
}
.navbar_title {
  font-weight: 500;
  display: inline-block;
  font-size: 15px;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  line-height: 1;
}
.navbar_slider {
  position: absolute;
  content: ' ';
  left: 0;
  bottom: 0;
  width: 6em;
  height: 3px;
  background-color: white;
  -webkit-transition: -webkit-transform 0.1s;
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}
.navbar_slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.navbar_slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.navbar_slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
}
.navbar_slider_3 {
  left: 29rpx;
  transform: translateX(750rpx);
}
.navbar_slider_4 {
  left: 29rpx;
  transform: translateX(1000rpx);
}
.allOrder ul {
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  background-color: #fff;
}
.list-item {
  font-size: 0.32rem;
  padding: 0;
  margin: 0 0 0.14rem;
  line-height: 0.5rem;
  width: 100%;
  display: inline-block;
  overflow: hidden;
  float: left;
}
.list-item:last-child .gray-border {
  height: 0;
}
.list-item .list-top {
  border-bottom: 0.014rem solid #ebebeb;
  line-height: 0.95rem;
  padding: 0 0.35rem;
  overflow: hidden;
}
.list-item .list-top .col {
  box-sizing: border-box;
  float: left;
  font-size: 0.32rem;
}
.span20 {
  width: 83.33%;
}
.span4 {
  color: #32b287;
  text-align: right;
  width: 16.67%;
}
.list-item .list-content {
  display: inline-block;
  padding: 0.2rem 0.3rem;
  width: 100%;
  border-bottom: 0.014rem solid #ebebeb;
}
.list-item .list-content a img {
  width: 1.6rem;
  height: 1.6rem;
  float: left;
  max-width: 1.8rem;
}
.list-item .list-content .right-body {
  overflow: hidden;
  width: 66%;
  float: left;
  padding-left: 0.28rem;
}
.list-item .list-content .right-body p {
  font-size: 0.28rem;
  margin: 0 0 0.14rem;
  line-height: 0.4rem;
}
.list-item .list-content .right-body p.name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #333;
}
.list-item .list-content .right-body p.price {
  color: #32b287;
}
.list-item .list-content .right-body p.spec {
  color: #a4a4a6;
}
.list-item .list-content .right-body p.spec .right {
  position: absolute;
  right: 0.56rem;
  color: #333;
  font-size: 0.26rem;
}
.list-item .button {
  display: inline-block;
  padding: 0.12rem 0;
  text-align: right;
  width: 100%;
}
.list-item .button button {
  font-size: 0.26rem;
  line-height: 0.52rem;
  height: 0.56rem;
  padding: 0;
  width: 1.5rem;
  border-radius: 0.35rem;
  display: inline-block;
}
.list-item .button .cancel {
  border: 0.028rem solid #32b287;
  color: #32b287;
  background-color: #fff;
}
.list-item .button .goPay {
  background-color: #32b287;
  border: 1px solid #32b287;
  color: #fff;
  border-radius: 50px;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.list-item .button .refund {
  background-color: #fd7881;
  border: 1px solid #fd7881;
  color: #fff;
  border-radius: 50px;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.list-item .button .Completed {
  background-color: #32b287;
  border: 1px solid #32b287;
  color: #fff;
  border-radius: 50px;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
</style>
