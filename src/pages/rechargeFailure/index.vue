<template>
  <div class="paymentFailure">
<!--内容-->
  <div class="result">
      <div class="icon_fail span24">
        <img src="http://offer.net199.com/dingdong/xcx/fail.53bf932.png">
        <div class="span24" >支付失败</div>
      </div>


    <div class="title">
      <i-row>
        <div class="span24">支付金额</div>
      </i-row>
      <i-row>
        <div class="money span24">
          <span>￥</span>{{price}}</div>
      </i-row>

      <i-row>
        <div class="footer_button span24">
          <button type="primary" @click="goHome">返回首页</button>
          <!-- <button type="default" @click="goOrderList" class="bgwhite">查看订单</button> -->
        </div>
      </i-row>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      price: '',
      orderNumber: ''
    }
  },
  mounted() {
    this.price = wx.getStorageSync('price')
    this.orderNumber = wx.getStorageSync('orderNumber')
  },
  created() {},
  methods: {
    goHome() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    goOrderList() {
      wx.redirectTo({
        url: '/pages/orderList/index?activeIndex=0'
      })
    }
  }
}
</script>

<style>
.result {
  font-size: 0.34rem;
}
.result .icon_success {
  height: 2.814rem;
  background-color: #32b287;
  color: #fff;
}
.result .icon_success .span24 {
  text-align: center;
  color: #a4a4a6;
  margin-bottom: 0.168rem;
}
.result .icon_success img {
  height: 1.176rem;
  margin-top: 0.504rem;
  width: auto;
}
.result .icon_fail {
  height: 2.7rem;
  background-color: #fd7881;
  color: #fff;
}
.result .icon_fail .span24 {
  text-align: center;
  color: #fff;
  margin-bottom: 0.168rem;
}
.result .icon_fail img {
  height: 0.95rem;
  margin-top: 0.504rem;
  width: 1rem;
}
.result .title {
  margin-top: 0.6rem;
}
.result .span24 {
  text-align: center;
  color: #a4a4a6;
}
.result .order {
  font-size: 0.336rem;
  color: #a4a4a6;
}
.result .money span {
  font-size: 0.4rem;
  color: #000;
}
.result .money {
  font-size: 0.64rem;
  color: #000;
}
.result .span24 button {
  font-size: 0.32rem;
  margin-top: 0.45rem;
  height: 0.9rem;
  line-height: 0.9rem;
  width: 5.8rem;
  background-color: #32b287;
  border: 1px solid #32b287;
}
.result .span24 button.bgwhite {
  margin-top: 0.4rem;
  height: 0.9rem;
  width: 5.8rem;
  color: #32b287;
  background-color: #fff;
  border: 1px solid #32b287;
}
.result .footer_button {
  margin-top: 0.9rem;
}
</style>
