<template>
  <div class="recharge">
    <div class="head">
      <div class="row">
        <div class="col span3">
          <i-icon type="coupons_fill" color="#32b287" size='26' />
        </div>
        <div class="col span21"><span>充值金额</span> </div>
      </div>
    </div>
    <div class="gray-border"></div>
    <div class="center">
      <div class="row">
        <div class="col span3">
         <span>￥</span>
        </div>
        <div class="col span21">
          <input type="number" placeholder="请输入充值金额" :value="price" v-model="price">
        </div>

      </div>
    </div>
    <div class="gray-border"></div>
    <div class="bottom">
      <div class="row">
        <div class="col span10">
         <span>当前余额:</span>
         <span>￥{{balance}}</span>
        </div>
        <div class="col span14">
          <a href="/pages/rechargeRecord/index">充值记录</a>
        </div>
      </div>
      <button type="primary" class="integral_button" @click="doWechatPay()">微信充值</button>
    </div>
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
export default {
  components: {},
  data() {
    return {
      price: '',
      balance: ''
    }
  },
  onShow() {
    this._inidata()
  },
  created() {},
  methods: {
    _inidata() {
      // 请求基本信息接口获取用户余额
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b91ec58c2a0f',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token')
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            _this.balance = response.data.data.money
          } else {
            _this.balance = '--'
          }
        })
        .catch(function(error) {
          console.log(error)
          _this.balance = '--'
        })
    },
    doWechatPay() {
      var _this = this
      if (_this.price === '0' || _this.price === '') {
        wx.showToast({
          title: '请输入充值金额',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else if (_this.price < 0) {
        wx.showToast({
          title: '请输入大于0的金额',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b9a2ef662bc9',
            {
              version: 'v3.0',
              app_id: '86793718',
              access_token: wx.getStorageSync('token'),
              recharge_money: _this.price / 100
            }
          )
          .then(function(response) {
            if (response.statusText === 'request:ok') {
              // var data = JSON.parse(response.data)
              var appId = response.data.appId
              var timeStamp = response.data.timeStamp
              var pkg = response.data.package
              var nonceStr = response.data.nonceStr
              var paySign = response.data.paySign

              wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: pkg,
                signType: 'MD5',
                paySign: paySign,
                success: function(res) {
                  wx.showToast({
                    title: res.errMsg, // 提示的内容,
                    icon: 'success', // 图标,
                    duration: 2000, // 延迟时间,
                    mask: true // 显示透明蒙层，防止触摸穿透,
                  })
                  wx.setStorageSync('price', _this.price)
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/rechargeSuccess/index'
                    })
                  }, 600)
                },
                fail: function(res) {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 1500,
                    mask: false
                  })
                  wx.setStorageSync('price', _this.price)
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/rechargeFailure/index'
                    })
                  }, 600)
                  console.log(res)
                },
                complete: function(res) {}
              })
            } else {
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
/* 头部 */
.head {
  border-top: 1px solid #ebebeb;
}
.head .row {
  overflow: hidden;
  padding: 0.3rem 0.15rem;
}
.head .col {
  float: left;
}
.head .span3 {
  width: 8%;
}
.head .span21 {
  width: 85%;
  font-size: 0.32rem;
}
.head .span21 span {
  display: inline-block;
  margin-top: 5px;
  margin-left: 3px;
}
.gray-border {
  height: 0.28rem;
  background: #f8f8f8;
  clear: both;
}
/* 中间 */
.center .row {
  overflow: hidden;
  padding: 0.3rem 0.15rem;
}
.center .col {
  float: left;
}
.center .span3 {
  width: 8%;
}
.center .span3 span {
  height: 45px;
  line-height: 45px;
}
.center .span21 {
  width: 85%;
  font-size: 0.32rem;
}
.center .span21 span {
  display: inline-block;
  margin-top: 5px;
  margin-left: 3px;
}
.center .span21 input {
  width: 95%;
  height: 20px;
  padding: 8px 10px;
  -webkit-user-select: text;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  outline: none;
  background-color: #fff;
  -webkit-appearance: none;
}
/* 底部 */
.bottom .row {
  overflow: hidden;
  padding: 0.5rem 0.15rem;
}
.bottom .col {
  float: left;
}
.bottom .span10 {
  width: 45%;
  height: 20px;
}
.bottom .span10 span {
  font-size: 0.32rem;
  display: inline-block;
}
.bottom .span14 {
  text-align: right;
  color: #32b287;
  width: 53%;
  font-size: 0.32rem;
}

.bottom button {
  margin-top: 0.45rem;
  height: 0.95rem;
  width: 5.8rem;
  background-color: #32b287;
  border: 1px solid #32b287;
  font-size: 0.32rem;
  line-height: 0.95rem;
}
</style>
