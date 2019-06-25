<template>
  <div class="service-cinfirm">
    <div class="order-complete panel">

      <div class="state" v-if="cancel_time > datetime && pay_time == 0">
        <div class="van-col van-col--3">
          <img src="http://offer.net199.com/dingdong/xcx/ui-order1.png">
        </div>
        <div class="van-col van-col--21">待支付订单</div>
      </div>

      <!-- <div class="state" v-if="cancel_time < datetime && pay_time == 0"> -->
        <!-- <div class="van-col van-col--3"> -->
          <!-- <img src="http://offer.net199.com/dingdong/xcx/ui-order5.png"> -->
        <!-- </div> -->
        <!-- <div class="van-col van-col--21">已取消订单</div> -->
      <!-- </div> -->

      <div class="state" v-if="pay_time > 0 && receipt_time == 0">
        <div class="van-col van-col--3">
          <img src="http://offer.net199.com/dingdong/xcx/ui-order2.png">
        </div>
        <div class="van-col van-col--21">已支付订单</div>
      </div>

      <div class="state" v-if="receipt_time > 0 && complete_time > datetime">
        <div class="van-col van-col--3">
          <img src="http://offer.net199.com/dingdong/xcx/ui-order3.png">
        </div>
        <div class="van-col van-col--21">待评价订单</div>
      </div>

      <div class="state" v-if="receipt_time > 0 && complete_time < datetime">
        <div class="van-col van-col--3">
          <img src="http://offer.net199.com/dingdong/xcx/ui-order4.png">
        </div>
        <div class="van-col van-col--21">已完成订单</div>
      </div>

      <div class="gray-border"></div>

      <div class="address set">
        <img class="stripes" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
        <div class="row">
          <div class="col span2">
            <a href="">
              <img src="http://offer.net199.com/dingdong/xcx/dw.png">
            </a>
          </div>
          <div class="col span22">
            <p class="col span14">收货人：{{receiver}}</p>
            <p class="col span10">{{telephone}}</p>
            <p class="col span24 info">地址：{{address}}</p>
          </div>
        </div>
        <img class="stripes bot" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
      </div>
      <div class="gray-border"></div>
      <!-- 服务时间 -->
      <div>
        <div class="van-cell van-hairline">
          <div class="van-cell__title">
            <span>服务时间</span>
          </div>
          <div class="van-cell__value">
            <span>{{service_time}}</span>
          </div>
        </div>
      </div>
      <div class="gray-border"></div>

      <div class="order-list">
        <div class="row" v-for="(item,index) in orders_goods" :key="index">
          <div class="col span20">
            <div class="col span7">
              <img :src="item.goods_cover">
            </div>
            <div class="col span16">
              <p>{{item.goods_name}}</p>
              <p class="price">￥{{item.goods_price}}</p>
              <p class="time">{{item.specification}}</p>
            </div>
          </div>
          <div class="col span4">X{{item.count}}</div>
        </div>
      </div>
      <div class="gray-border"></div>
      <div class="coup">
        <div class="van-cell van-hairline">
          <div class="van-cell__title">
            <span>实付款</span>
          </div>
          <div class="van-cell__value">
            <router-link to="">
              <span>￥{{goods_price}}</span>
            </router-link>

          </div>
        </div>

        <div class="van-cell van-hairlinea">
          <div class="van-cell__title">
            <span>备注</span>
          </div>
          <div class="van-cell__value">
            <span>{{note}}</span>
          </div>
        </div>
      </div>
      <div class="gray-border"></div>

      <div class="time">
        <div class="van-cell van-hairline">
            <span>下单时间：{{create_time}}</span>
        </div>
        <!-- <div class="van-cell van-hairline" v-if="cancel_time < datetime && pay_time == 0">
            <span>取消时间：{{cancel_time}}</span>
        </div> -->
        <div class="van-cell van-hairline" v-if="pay_time != 0">
           <span>支付时间：{{pay_time1}}</span>
        </div>
        <div class="van-cell van-hairline" v-if="receipt_time != 0">
            <span>确认完成时间：{{receipt_time1}}</span>
        </div>
        <div class="van-cell van-hairline" v-if="complete_time != 0 && complete_time < datetime">
            <span>评价时间：{{complete_time1}}</span>
        </div>
      </div>


      <div class="van-submit-bar">

        <div class="van-submit-bar__bar" v-if="cancel_time > datetime && pay_time == 0">
          <button class="van-button van-button--normal" @click="cancel">
            <span class="van-button__text">
              取消订单
            </span>
          </button>
          <button class="van-button van-button--danger" @click="goPay">
            <span class="van-button__text">
              去付款
            </span>
          </button>
        </div>

        <div class="van-submit-bar__bar" v-if="cancel_time < datetime && pay_time == 0">
          <button class="van-button van-button--delect" @click="deleteOrder">
            <span class="van-button__text">
              删除订单
            </span>
          </button>
        </div>

        <div class="van-submit-bar__bar" v-if="pay_time > 0 && receipt_time == 0">
           <button class="van-button van-button--danger" @click="goComplete">
            <span class="van-button__text">
              确认完成
            </span>
          </button>
        </div>

        <div class="van-submit-bar__bar" v-if="receipt_time > 0 && complete_time > datetime">
           <button class="van-button van-button--danger" @click="goEvaluate">
            <span class="van-button__text">
              去评价
            </span>
          </button>
        </div>

        <div class="van-submit-bar__bar" v-if="receipt_time > 0 && complete_time < datetime">
           <button class="van-button van-button--danger" @click="seeEvalua">
            <span class="van-button__text">
              查看评价
            </span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 必须导入 否则编译报错
import _ from 'lodash'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
import { formatTime } from '@/utils/index'

export default {
  components: {},
  data() {
    return {
      orders_goods: [],
      receiver: '',
      telephone: '',
      address: '',
      note: '',
      create_time: '',
      cancel_time: '',
      pay_time: '',
      pay_time1: '',
      complete_time: '',
      complete_time1: '',
      receipt_time: '',
      receipt_time1: '',
      datetime: '',
      refundReason: '',
      id: '',
      goods_price: '',
      service_time: 0
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var _this = this
      var date = Math.round(new Date().getTime() / 1000).toString()
      _this.datetime = date
      // var tree = []
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6bbcf2ca157',
          {
            version: 'v3.0',
            app_id: '86793718',
            order_id: parseInt(this.$root.$mp.query.id),
            access_token: wx.getStorageSync('token')
          }
        )
        .then(function(response) {
          var orderInfo = response.data.data.orderDetail
          _this.receiver = orderInfo.receiver
          _this.telephone = orderInfo.telephone
          _this.address = orderInfo.address
          _this.service_time = orderInfo.service_time
          _this.note = orderInfo.note
          _this.create_time = orderInfo.create_time
          _this.cancel_time = orderInfo.cancel_time
          _this.pay_time = orderInfo.pay_time
          _this.complete_time = orderInfo.complete_time
          _this.receipt_time = orderInfo.receipt_time
          _this.goods_price = orderInfo.goods_price
          var orderList = response.data.data
          _this.orders_goods = orderList.orderGoods
          console.log(orderInfo)
          console.log(orderInfo.note)
          console.log(_this.service_time)
          var stime = orderInfo.service_time
          var ptime = orderInfo.pay_time
          var retime = orderInfo.receipt_time
          var cotime = orderInfo.complete_time
          var newDate = new Date()
          var newDate1 = new Date()
          var newDate2 = new Date()
          var newDate3 = new Date()
          newDate.setTime(stime * 1000)
          newDate1.setTime(ptime * 1000)
          newDate2.setTime(retime * 1000)
          newDate3.setTime(cotime * 1000)
          var serviceTime = formatTime(newDate)
          var payTime = formatTime(newDate1)
          var receiptTime = formatTime(newDate2)
          var completetTime = formatTime(newDate3)
          _this.service_time = serviceTime
          _this.pay_time1 = payTime
          _this.receipt_time1 = receiptTime
          _this.complete_time1 = completetTime
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goAdress() {
      wx.redirectTo({
        url: '/pages/adress/index'
      })
    },
    cancel(id) {
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
                  order_id: parseInt(_this.$root.$mp.query.id)
                }
              )
              .then(function(response) {
                wx.showToast({
                  title: response.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: false
                })
                if (response.data.code === 1) {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/orderList/index?activeIndex=0'
                    })
                  }, 600)
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
    goPay() {
      var id = parseInt(this.$root.$mp.query.id)
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
                  order_id: parseInt(_this.$root.$mp.query.id)
                }
              )
              .then(function(response) {
                wx.showToast({
                  title: response.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: false
                })
                if (response.data.code === 1) {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/orderList/index?activeIndex=0'
                    })
                  }, 600)
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
            order_id: parseInt(_this.$root.$mp.query.id)
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            wx.showToast({
              title: response.data.msg,
              icon: 'success',
              duration: 1500,
              mask: false
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/orderList/index?activeIndex=3'
              })
            }, 600)
          }
          console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goEvaluate() {
      var id = parseInt(this.$root.$mp.query.id)
      wx.navigateTo({
        url: '/pages/review/index?order_id=' + id
      })
    },
    seeEvalua(goodid) {
      var id = parseInt(this.$root.$mp.query.id)
      wx.navigateTo({
        url: '/pages/reviewDetail/index?order_id=' + id
      })
    }
  }
}
</script>

<style scoped>
.service-cinfirm {
  background: #fff;
}

.gray-border {
  height: 0.25rem;
  background: #f8f8f8;
  clear: both;
}

.service-cinfirm .address {
  padding: 0;
  font-size: 0.336rem;
  color: #333;
  clear: both;
  background: #fff;
  height: 1.8rem;
}

.service-cinfirm .address .row {
  overflow: hidden;
  margin-bottom: 15px;
  padding: 0 15px;
}

.address .row p {
  color: #333;
  font-size: 0.26rem;
}

.service-cinfirm .address img {
  width: 0.35rem;
  height: 0.35rem;
  margin-top: 0.3rem;
}

.service-cinfirm .address img.stripes {
  width: 100%;
  margin: 0;
  vertical-align: top;
  height: 0.1rem;
}

.col {
  box-sizing: border-box;
  float: left;
}

.span2 {
  width: 8%;
}

.span22 {
  width: 92%;
}

.span19 {
  width: 79%;
}

.span10 {
  width: 41.66667%;
  text-align: right;
}

.span14 {
  width: 58.33333%;
}

.span3 {
  width: 12%;
  text-align: right;
}

.span24 {
  margin-top: 0.1rem;
  font-size: 0.26rem;
  color: #666;
  padding: 0;
  height: auto;
  width: 100%;
}

.service-cinfirm .van-cell {
  font-size: 0.28rem;
  padding: 0.25rem 0.3rem;
  line-height: 0.5rem;
}

.van-cell {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  line-height: 24px;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
}

.service-cinfirm .van-cell .van-cell__title {
  width: 27%;
}

.van-cell__title span {
  color: #2b2a2a;
}

.service-cinfirm .van-cell .van-cell__value {
  width: 73%;
  color: #333;
  text-align: right;
}

.service-cinfirm .order-list {
  margin: 0 0.35rem;
}

.service-cinfirm .order-list .row {
  padding: 0.2rem 0;
  overflow: hidden;
}

.service-cinfirm .order-list .span7 img {
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: bottom;
}

.span20 {
  width: 83%;
}

.span4 {
  width: 16.67%;
  margin-top: 1rem;
  color: #333;
  font-size: 0.28rem;
  text-align: right;
}

.span7 {
  width: 29.17%;
}

.span16 {
  width: 66.66%;
}

.service-cinfirm .order-list .span16 p {
  font-size: 0.28rem;
  margin: 0 0 0.1rem;
  line-height: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.07rem;
  vertical-align: top;
  color: #8f8f94;
}

.service-cinfirm .order-list .span16 p.price {
  color: #32b287;
}

.service-cinfirm .coup .van-cell {
  border-bottom: 0.014rem solid #ebebeb;
}

.service-cinfirm .van-hairlinea {
  border-bottom: none !important;
}

.service-cinfirm .textarea {
  padding: 0 0.3rem;
  margin-bottom: 0.3rem;
}

.service-cinfirm .textarea textarea {
  background: #f9f9f9;
  font-size: 0.26rem;
  width: auto;
  height: 1.2rem;
  padding: 0.25rem;
}

/* 底部提交 */

.van-submit-bar {
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  position: fixed;
  -webkit-user-select: none;
  user-select: none;
}

.service-cinfirm .van-submit-bar__bar {
  border-top: 1px solid #ebebeb;
}

.van-submit-bar__bar {
  height: 50px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  font-size: 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background-color: #fff;
}

.service-cinfirm .van-submit-bar__price {
  color: #000;
}

.service-cinfirm .van-submit-bar__price {
  text-align: left;
  margin-left: 0.35rem;
}

.van-submit-bar__price {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: right;
  color: #666;
  padding-right: 12px;
}

.van-submit-bar__price span {
  display: inline-block;
}

.service-cinfirm .van-submit-bar__price-integer {
  color: #000;
  font-size: 0.28rem;
}

.service-cinfirm .van-submit-bar__price-decimal {
  color: #000;
  font-size: 0.28rem;
}

.service-cinfirm .van-button--danger {
  background-color: #32b287;
  color: #fff;
  border: none;
}
.service-cinfirm .van-button--normal {
  background-color: #fff;
  color: #333;
  border: none;
}
.service-cinfirm .van-button--delect {
  background-color: #fd7881;
  color: #fff;
  border: none;
}
.van-submit-bar .van-button {
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-size: 16px;
}

.van-button {
  position: relative;
  padding: 0;
  display: inline-block;
  height: 44px;
  line-height: 44px;
  border-radius: 0;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  border: none;
}

.state {
  color: #333;
  font-size: 0.3rem;
  padding: 0 0.3rem;
  border-top: 1px solid #ebebeb;
}

.state .van-col {
  line-height: normal;
  padding: 0.2rem 0;
}

.state .van-col--3 {
  width: 12.5%;
}

.state .van-col {
  box-sizing: border-box;
  float: left;
}

.state .van-col--21 {
  line-height: 0.5rem;
  width: 87.5%;
}

.state .van-col img {
  height: 0.5rem;
  vertical-align: bottom;
  width: 0.5rem;
}
.time {
  margin-top: 0.15rem;
  margin-bottom: 1.25rem;
}
.time .van-cell {
  padding: 0.2rem 0.3rem 0;
}
</style>
