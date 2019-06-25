<template>
  <div class="payment">
<!--内容-->
<!-- 商品提交订单 -->
  <div class="integral">
    <div class="span24">支付金额</div>
    <div class="money span24">￥{{price}}</div>
    <div class="order span24">订单编号：{{orderNumber}}</div>
    <div class="footer_button span24">
      <!-- <button type="primary" @click="doPointsPay">支付宝支付</button> -->
      <button type="primary" class="integral_button" @click="doWechatPay()">微信支付</button>
      <button type="primary" @click="doBalance">余额支付</button>

    </div>
  </div>
</div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
import md5 from 'js-md5'
export default {
  components: {},

  data () {
    return {
      price: 0,
      orderNumber: ''
    }
  },
  mounted () {
    this.initData()
  },
  created () {},
  methods: {
    initData () {
      var orderId = this.$root.$mp.query.order_id
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6bbcf2ca157',
        {
          access_token: wx.getStorageSync('token'),
          order_id: orderId,
          version: 'v3.0',
          app_id: 86793718
        }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            // console.log(response.data.msg)
            _this.orderNumber = response.data.data.orderDetail.order_sn
            _this.price = response.data.data.orderDetail.order_price
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    doWechatPay () {
      var orderId = parseInt(this.$root.$mp.query.order_id)
      var _this = this
      wx.request({
        url:
          'https://xiaochengxu.net199.com/public/index.php/api/5b8cd736bfb10',
        method: 'get', // 仅为示例，并非真实的接口地址
        data: {
          version: 'v3.0',
          app_id: 86793718,
          access_token: wx.getStorageSync('token'),
          pay_method: 'Weixin',
          order_id: orderId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (response) {
          console.log(response)
          var data = JSON.parse(response.data)
          var appId = data.appId
          var timeStamp = data.timeStamp
          var pkg = data.package
          var nonceStr = data.nonceStr
          var paySign = data.paySign

          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: pkg,
            signType: 'MD5',
            paySign: paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功', // 提示的内容,
                icon: 'success', // 图标,
                duration: 2000, // 延迟时间,
                mask: true // 显示透明蒙层，防止触摸穿透,
              })
              wx.setStorageSync('price', _this.price)
              wx.setStorageSync('orderNumber', _this.orderNumber)
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/paymentSuccess/index'
                })
              }, 600)
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 1500,
                mask: false
              })
              wx.setStorageSync('price', _this.price)
              wx.setStorageSync('orderNumber', _this.orderNumber)
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/paymentFailure/index'
                })
              }, 600)
            },
            complete: function (res) {}
          })
        }
      })
    },
    doBalance () {
      var orderId = parseInt(this.$root.$mp.query.order_id)
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b92215995388',
        {
          access_token: wx.getStorageSync('token'),
          order_id: orderId,
          version: 'v3.0',
          app_id: 86793718
        }
        )
        .then(function (response) {
          console.log(response.data)
          wx.showToast({
            title: response.data.msg,
            icon: 'none',
            duration: 1500,
            mask: false
          })
          if (response.data.code === 1) {
            wx.setStorageSync('price', _this.price)
            wx.setStorageSync('orderNumber', _this.orderNumber)
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/paymentSuccess/index'
              })
            }, 600)
          } else {
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 1500,
              mask: false
            })
            wx.setStorageSync('price', _this.price)
            wx.setStorageSync('orderNumber', _this.orderNumber)
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/paymentFailure/index'
              })
            }, 600)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.payment {
  display: inline-block;
  width: 100%;
}
.integral {
  font-size: 0.32rem;
  margin-top: 0.35rem;
  background: #fff;
  padding: 0.4rem 0;
}
.integral .span24 {
  text-align: center;
  color: #a4a4a6;
  margin-bottom: 0.42rem;
}
.integral .order {
  font-size: 0.32rem;
  color: #a4a4a6;
}
.integral .money {
  font-size: 0.504rem;
  color: #000;
}
.integral .footer_button {
  margin-top: 0.9rem;
}
.integral .span24 button {
  margin-top: 0.45rem;
  height: 0.95rem;
  width: 5.8rem;
  background-color: #32b287;
  border: 1px solid #32b287;
  font-size: 0.32rem;
  line-height: 0.95rem;
}
</style>
