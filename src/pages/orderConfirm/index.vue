<template>
  <div class="service-cinfirm">
    <div class="order-complete panel">
      <div class="gray-border"></div>
        <!-- 有默认地址 -->
       <div class="address moren" @click="goAdress" v-if="hasDefaultAddress">
        <img class="stripes" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
          <div class="row r2">
            <div class="col span2 ico">
              <a href=""><img src="http://offer.net199.com/dingdong/xcx/dw.png"></a>
            </div>
            <div class="col span19">
             <div class="col span14">
               收货人：{{addr.name}}
             </div>
             <div class="col span10">
               {{addr.mobile}}
             </div>
             <div class="col span24">
               收货地址：{{addr.address}}
             </div>
            </div>
            <div class="col span3 ico">
              <i-icon type="enter" color="#a6a6a8" size="26" />
            </div>
          </div>
        <img class="stripes bot" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
      </div>

       <!-- 无默认地址 -->
      <div class="address set" @click="goAdress" v-if="!hasDefaultAddress">
        <img class="stripes" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
          <div class="row">
            <div class="col span2">
              <a href=""><img src="http://offer.net199.com/dingdong/xcx/dw.png"></a>
            </div>
            <div class="col span19">
              <a href="">请设置服务地址</a>
            </div>
            <div class="col span3">
              <i-icon type="enter" color="#a6a6a8" size="26" />
            </div>
          </div>
        <img class="stripes bot" src="http://offer.net199.com/dingdong/xcx/dz.9db6c80.jpg">
      </div>
      <div class="gray-border"></div>
      <!-- 服务时间 -->
      <div v-if="is_service===1">
        <div class="van-cell van-hairline">
            <div class="van-cell__title">
              <span>服务时间</span>
            </div>
            <div class="van-cell__value">
              <!-- <span>请选择服务时间</span> -->
              <picker class="weui-btn" mode="date" :value="date" start="1999-01-01" end="2099-01-01" @change="DateChange">
                <text type="default">{{date}}</text>
              </picker>
              <picker class="weui-btn" mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
                <text type="default">{{time}}</text>
              </picker>
            </div>
          </div>
      </div>
      <div class="cell" @click="chooseCoupon">
        <div class="col span22" >
          <div class="col span8">
            <span>优惠券</span>
          </div>
          <div class="col span15">
             <span v-if="hasCoupon">￥{{coupon.money}}</span>
            <span v-else>请选择</span>
          </div>
        </div>
        <div class="col span3" >
          <i-icon type="enter" slot="icon" size="22" color="#666" />
        </div>
      </div>
      <div class="gray-border"></div>

      <div class="order-list" v-for="item in ordergood" :key="item.id">
        <div class="row" >
          <div class="col span20" >
            <div class="col span7" >
              <!-- <img src="@/assets/images/demo/fw6.jpg"> -->
              <img :src="item.image">
            </div>
            <div class="col span16">
              <p>{{item.name}}</p>
              <p class="price">￥{{item.price}}</p>
              <p class="time">{{ordergoodS1}} {{ordergoodS2}}</p>
            </div>
          </div>
          <div class="col span4" >X{{item.number}}</div>
        </div>
      </div>
      <div class="gray-border"></div>
      <div class="coup">
        <!-- <div class="van-cell van-hairline">
          <div class="van-cell__title">
            <span>代金券</span>
          </div>
          <div class="van-cell__value">
            <router-link to="">
              <span>不可用</span>
            </router-link>

          </div>
        </div>
        <div class="van-cell van-hairline">
          <div class="van-cell__title">
            <span>红包</span>
          </div>
          <div class="van-cell__value">
            <router-link to="">
              <span>不可用</span>
            </router-link>

          </div>
        </div> -->
        <div class="van-cell van-hairlinea">
          <div class="van-cell__title">
            <span>备注</span>
          </div>
        </div>
        <div class="textarea">
          <textarea placeholder="请输入备注信息" :value="remark" v-model="remark" class="van-field__control"></textarea>
        </div>

      </div>
      <div class="gray-border"></div>

      <div class="van-submit-bar">
        <div class="van-submit-bar__bar">
          <div class="van-submit-bar__price">
            <span>合计：</span>
            <span class="van-submit-bar__price-integer">¥{{totalPrice}}</span>
            <span class="van-submit-bar__price-decimal"></span>
          </div>
            <button class="van-button van-button--danger van-button--normal" @click="goPay">
              <span class="van-button__text">
                提交订单
              </span>
            </button>
        </div>
      </div>
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
      name: '测试商品',
      price: '88.00',
      s1: '8g',
      selectedNum: '1',
      hasDefaultAddress: false,
      ordergood: '',
      addr: '',
      goodPrice: '',
      totalPrice: 0,
      date: '请选择日期',
      time: '请选择时间',
      service_time: '',
      remark: '',
      is_service: 1,
      ordergoodS1: '',
      ordergoodS2: '',
      coupon: [],
      hasCoupon: false,
      couponMoney: 0
    }
  },
  mounted() {
    if (this.$root.$mp.query.is_service) {
      this.is_service = parseInt(this.$root.$mp.query.is_service)
    } else {
      this.is_service === 1
    }
  },
  onShow() {
    this.initData()
  },
  created() {},
  methods: {
    initData() {
      this.totalPrice = 0
      var _this = this
      // 若是从地址列表页选择地址后进入订单确认页面，则使用用户在地址列表页选择的地址
      if (this.$root.$mp.query.adress_id) {
        _this.hasDefaultAddress = true
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b71409dbe570',
            {
              version: 'v3.0',
              app_id: '86793718',
              access_token: wx.getStorageSync('token'),
              address_id: parseInt(this.$root.$mp.query.adress_id)
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              _this.addr = response.data.data[0]
              console.log('地址列表进入：' + _this.addr)
            } else {
              wx.showToast({
                title: response.data.msg,
                icon: 'none',
                duration: 1500,
                mask: false
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
        // 否则查询用户是否有设置默认地址，有则显示默认地址
      } else {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b77b72cbd1d4',
            {
              version: 'v3.0',
              app_id: '86793718',
              access_token: wx.getStorageSync('token')
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              // 有默认地址
              if (response.data.data.length === 1) {
                _this.hasDefaultAddress = true
                _this.addr = response.data.data[0]
                console.log('默认地址：' + _this.addr)
              }
            } else {
              wx.showToast({
                title: response.data.msg,
                icon: 'none',
                duration: 1500,
                mask: false
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }

      // 获取优惠券价格
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b920b5c37a42',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            coupon_id: parseInt(_this.$root.$mp.query.couponId)
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            _this.hasCoupon = true
            _this.coupon = response.data.data
            _this.couponMoney = response.data.data.money
            console.log(_this.coupon)
          } else {
            _this.hasCoupon = false
          }
        })
        .catch(function(error) {
          console.log(error)
        })

      // 获取缓存数据
      var ensureOrderData = JSON.parse(wx.getStorageSync('ensureOrderData')) // 将获取到的字符串类型转换成对象类型
      _this.ordergood = ensureOrderData
      console.log(ensureOrderData)
      ensureOrderData.forEach(ele => {
        if (_this.$root.$mp.query.couponId) {
          var total =
            ele.price * ele.number - _this.$root.$mp.query.coupon_money
          console.log(_this.couponMoney)
          console.log(total)
          if (total < 0 || total === null || total === NaN) {
            _this.totalPrice = 0
            console.log(_this.totalPrice)
          } else {
            _this.totalPrice = total
          }
        } else {
          _this.totalPrice = _this.totalPrice + ele.price * ele.number
        }
        // ps：这里没有用+=是因为他把每次得到的totalPrice都放进缓存里了
      })
      // 选择的类型
      _this.ordergoodS1 = _this.ordergood.selectedSkuCombS1
      _this.ordergoodS2 = _this.ordergood.selectedSkuCombS2
      _this.ordergoodS3 = _this.ordergood.selectedSkuCombS3
      if (_this.ordergoodS1 === 0) {
        _this.ordergoodS1 = ''
      } else if (_this.ordergoodS2 === 0) {
        _this.ordergoodS2 = ''
      } else if (_this.ordergoodS3 === 0) {
        _this.ordergoodS3 = ''
      }
      wx.setStorageSync('totalPrice', _this.totalPrice)
    },
    goAdress() {
      wx.navigateTo({
        url: '/pages/adress/index?from=order_confirm'
      })
    },
    chooseCoupon() {
      wx.navigateTo({
        url: '/pages/chooseCoupon/index?from=order_confirm'
      })
    },
    goPay() {
      if (this.hasDefaultAddress === false) {
        wx.showToast({
          title: '请选择收货地址',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else {
        if (this.is_service != 0) {
          var _this = this
          // 服务时间转化成时间戳
          _this.service_time = _this.date + ' ' + _this.time
          var timestamp2 = Date.parse(new Date(_this.service_time))
          timestamp2 = timestamp2 / 1000
          console.log(_this.service_time + '的时间戳为：' + timestamp2)

          var ensureOrderData = wx.getStorageSync('ensureOrderData')
          console.log(ensureOrderData)
          // return false
          var goodId = ensureOrderData.goods_id
          fly
            .post(
              'https://xiaochengxu.net199.com/public/index.php/api/5b6459110bd61',
              {
                access_token: wx.getStorageSync('token'),
                goods_data: ensureOrderData,
                version: 'v3.0',
                address_id: _this.addr.id,
                app_id: 86793718,
                service_time: timestamp2,
                remark: _this.remark,
                is_service: _this.is_service,
                coupon_id: _this.coupon.id
              }
            )
            .then(function(response) {
              console.log(response.data.data.order_id)
              if (response.data.code === 1) {
                var orderId = response.data.data.order_id
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: false, // 显示透明蒙层，防止触摸穿透,
                  success: res => {}
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/payment/index?order_id=' + orderId
                  })
                }, 600)
              } else if (response.data.code === -1) {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: false // 显示透明蒙层，防止触摸穿透,
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          var _this = this
          var ensureOrderData = wx.getStorageSync('ensureOrderData')
          console.log(ensureOrderData)
          // return false
          var goodId = ensureOrderData.goods_id
          fly
            .post(
              'https://xiaochengxu.net199.com/public/index.php/api/5b6459110bd61',
              {
                access_token: wx.getStorageSync('token'),
                goods_data: ensureOrderData,
                version: 'v3.0',
                address_id: _this.addr.id,
                app_id: 86793718,
                remark: _this.remark,
                is_service: 0
              }
            )
            .then(function(response) {
              console.log(response.data.data.order_id)
              if (response.data.code === 1) {
                var orderId = response.data.data.order_id
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: false, // 显示透明蒙层，防止触摸穿透,
                  success: res => {}
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/payment/index?order_id=' + orderId
                  })
                }, 600)
              } else if (response.data.code === -1) {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: false // 显示透明蒙层，防止触摸穿透,
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      }
    },
    DateChange(e) {
      this.date = e.mp.detail.value
      console.log(this.date)
    },
    TimeChange(e) {
      this.time = e.mp.detail.value
      console.log(this.time)
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
  height: 1.57rem;
  background: #fff;
  position: relative;
}
.service-cinfirm .address .row {
  overflow: hidden;
  padding: 0px 15px;
}
.service-cinfirm .address .r2 {
  overflow: hidden;
  padding: 7px 15px;
}
.service-cinfirm .address img {
  width: 0.35rem;
  height: 0.35rem;
  margin-top: 7rpx;
}
.service-cinfirm .address img.stripes {
  width: 100%;
  margin: 0;
  vertical-align: top;
  height: 0.1rem;
}
.service-cinfirm .address img.bot {
  width: 100%;
  margin: 0;
  vertical-align: bottom;
  height: 0.1rem;
  position: absolute;
  bottom: 0;
}
.col {
  box-sizing: border-box;
  float: left;
}
.span2 {
  width: 8%;
}
.span3 {
  width: 12%;
  text-align: right;
}
.span10 {
  width: 41%;
  text-align: right;
  font-size: 14px;
}
.span14 {
  width: 58%;
  font-size: 14px;
}
.span19 {
  width: 79%;
  font-size: 14px;
}
.span24 {
  width: 100%;
  margin-top: 5px;
  font-size: 14px;
}
.service-cinfirm .van-cell {
  font-size: 0.28rem;
  padding: 0.25rem 0.35rem;
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
  border-bottom: 1px solid #ebebeb;
}
.service-cinfirm .van-cell .van-cell__title {
  width: 27%;
}
.van-cell__title span {
  color: #2b2a2a;
}
.service-cinfirm .van-cell .van-cell__value {
  width: 73%;
  color: #32b287;
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
  width: 1.6rem;
  height: 1.2rem;
  vertical-align: bottom;
}
.span20 {
  width: 83%;
}
.span4 {
  width: 16.67%;
  margin-top: 0.77rem;
  color: #333;
  font-size: 0.336rem;
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
  line-height: 0.32rem;
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
  border: solid 1px #32b287;
  color: #fff;
}
.van-submit-bar .van-button {
  width: 110px;
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
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
}
.ico {
  margin-top: 0.15rem;
}
.moren {
  line-height: 1;
  position: relative;
}
.weui-btn {
  display: inline-block;
  margin-top: 0;
  margin-right: 7px;
}
.cell {
  padding: 0.15rem 0.35rem;
  overflow: hidden;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 0.28rem;
}
.cell .span22 {
  width: 90%;
}
.cell .span8 {
  width: 33%;
}
.cell .span15 {
  text-align: right;
  color: #32b287;
  width: 62.5%;
}
.cell .span3 {
  width: 9%;
  color: #333;
  font-size: 0.336rem;
  text-align: right;
}
</style>
