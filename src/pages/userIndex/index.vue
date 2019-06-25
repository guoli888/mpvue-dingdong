<template>
  <div class="mine">
    <div class="user_index">
      <!-- 头部 -->
      <div class="ui_top">
        <div class="ui_nav">
          <div class="ui_set">
            <div>
              <a href="/pages/setting/index"><img src="/static/images/ui-top.png" /></a>
            </div>
          </div>
        </div>
        <div class="user_info" v-show="!info">
            <div class="ui_photo">
              <img :src="imageUrl"/>
            </div>
            <div class="ui_name">
             <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">立即登录</button>
              <span v-show="showmobile"> {{mobile}}</span>
            </div>
        </div>
        <div class="user_info" v-show="info">
            <div class="ui_photo">
              <!-- <img src="../../assets/images/index.png" /> -->
              <!-- <img :src="imageUrl"/> -->
              <div class="avatar">
              <open-data class="thumb" type="userAvatarUrl"></open-data>
              </div>
            </div>
            <div class="ui_name">
              <open-data class="nackname" lang="zh_CN" type="userNickName"></open-data>
              <span v-show="showmobile"> {{mobile}}</span>
            </div>
        </div>
      </div>
      <!-- 优惠卷 -->
      <div class="ui-coupon">
        <ul class="coupon-list">
            <li class="coup-li yue">
              <a href="/pages/recharge/index">
              {{userIndexInfo.money}}
              <span>元</span>
              <p>会员余额</p>
              </a>
            </li>
            <li class="coup-li yhq">
              <a href="/pages/coupon/index">
              {{userIndexInfo.couponCount}}
              <span>张</span>
              <p>优惠券</p>
              </a>
            </li>
        </ul>
      </div>
      <div class="gray-border"></div>
      <!-- 订单详情 -->
      <div class="ui_order">
        <div class="cell">
          <div class="col span9" >
            <span>项目订单</span>
          </div>
          <div class="col span11" >
             <a href="/pages/orderList/index?activeIndex=0">
            <span>查看更多订单</span>
             </a>
          </div>
          <div class="col span4" >
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
        <ul class="order-list">
          <li class="order-li">
            <a href="/pages/orderList/index?activeIndex=1">
            <img src="/static/images/ui-order1.png" />
            <p>待支付</p>
            </a>
          </li>
          <li  class="order-li">
            <a href="/pages/orderList/index?activeIndex=2">
            <img src="/static/images/ui-order2.png" />
            <p>已支付</p>
            </a>
          </li>
          <li  class="order-li">
            <a href="/pages/orderList/index?activeIndex=3">
            <img src="/static/images/ui-order3.png" />
            <p>待评价</p>
            </a>
          </li>
          <li  class="order-li">
            <a href="/pages/orderList/index?activeIndex=4">
            <img src="/static/images/ui-order4.png" />
            <p>已完成</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="gray-border"></div>
       <!-- 收货地址管理 -->
      <div class="user_module">
        <div class="cell" @click="toAdress">
          <div class="col span4">
            <i-icon type="coordinates" size="25" slot="icon" color="#333" />
          </div>
          <div class="col span16">
            <span>服务地址</span>
          </div>
          <div class="col span4" @click="toAdress">
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
        <div class="cell" @click="toKefu">
           <button open-type="contact"  class="kefu"></button>
          <div class="col span4">
            <i-icon type="message" slot="icon" size="25" color="#333" />
          </div>
          <div class="col span16">
            <span>在线客服</span>
          </div>
          <div class="col span4">
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
        <div class="cell" @click="toRecruit">
          <div class="col span4">
            <i-icon type="group" slot="icon" size="25" color="#333" />
          </div>
          <div class="col span16">
            <span>保洁/技师报名</span>
          </div>
          <div class="col span4">
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
          <div class="gray-border"></div>
        <div class="cell" @click="toAbout">
          <div class="col span4">
            <i-icon type="prompt" slot="icon" size="25" color="#333" />
          </div>
          <div class="col span16">
            <span>关于我们</span>
          </div>
          <div class="col span4">
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
         <div class="cell" @click="toFeed">
          <div class="col span4">
            <i-icon type="editor" slot="icon" size="25" color="#333" />
          </div>
          <div class="col span16">
            <span>意见反馈</span>
          </div>
          <div class="col span4">
            <i-icon type="enter" slot="icon" size="22" color="#abaabb" />
          </div>
        </div>
      </div>
      <!-- 绑定手机号弹窗 -->
      <div class="mask" v-if="bindMobile"></div>
      <div class="popup" v-if="bindMobile">
        <div class="popup-head">绑定手机号</div>
        <div class="popup-content">
          <div class="inputBox">
            <span>手机号:</span>
            <input type="number" placeholder="请输入绑定手机号" :value="phone" v-model="phone">
          </div>
          <div class="saleBox">
            <input type="text" placeholder="请输入验证码" :value="sale" v-model="sale">
            <button v-show="sendshow" @click="getCode">获取验证码</button>
            <button class="time" v-show="timeshow">重新发送{{time}}S</button>
          </div>
          <div class="button">
            <button @click="bindPhone">立即绑定</button>
          </div>
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
      userInfo: '',
      name: '',
      showmobile: true,
      mobile: '叮咚家政，让您生活更轻松！',
      imageUrl: '/static/images/index.png',
      info: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      access_token: '',
      userIndexInfo: [],
      encryptedData: '',
      iv: '',
      bindMobile: false,
      phone: '',
      sale: '',
      union_id: '',
      time: 60,
      sendshow: true,
      timeshow: false
    }
  },
  created() {
    // this.bindGetUserInfo()
  },
  onShow() {
    this.getInfo(wx.getStorageSync('token'))
    if (!wx.getStorageInfoSync('token')) {
      this.info = false
    }
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    bindGetUserInfo: function(e) {
      var _this = this
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          // console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 获取code，服务器通过code访问微信接口，将响应值openid和session_key保存到后台中
            wx.login({
              success: function(res) {
                if (res.code) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    withCredentials: true,
                    success: function(res2) {
                      _this.userInfo = JSON.stringify(res2.userInfo)
                      _this.info = true
                      // 请求服务器登录接口
                      fly
                        .post(
                          'https://xiaochengxu.net199.com/public/index.php/api/5b84f81d1d531',
                          {
                            version: 'v3.0',
                            app_id: '86793718',
                            code: res.code,
                            user_info: _this.userInfo,
                            encryptedData: res2.encryptedData,
                            iv: res2.iv
                          }
                        )
                        .then(function(response) {
                          console.log(response)
                          if (response.data.code === 1) {
                            _this.access_token = response.data.data.access_token
                            _this.union_id = response.data.data.union_id
                            console.log(response.data.data.access_token)
                            // _this.getInfo()
                            // 判断用户是否留有手机号
                            if (response.data.data.mobile === '') {
                              wx.showToast({
                                title: '请先绑定手机号', //提示的内容,
                                icon: 'none', //图标,
                                duration: 2000, //延迟时间,
                                mask: false //显示透明蒙层，防止触摸穿透,
                              })
                              setTimeout(() => {
                                _this.bindMobile = true
                              }, 2000)
                            } else {
                              wx.setStorageSync('token', _this.access_token)
                              _this.getInfo(_this.access_token)
                            }
                          }
                        })
                        .catch(function(error) {
                          console.log(error)
                        })
                    }
                  })
                } else {
                  console.log('登录失败！缺少code参数')
                }
              },
              // 未授权，直接进入fail回调
              fail: function(error) {
                console.log('用户未授权!')
              }
            })
          }
        }
      })
    },
    bindPhone() {
      var _this = this
      if (_this.phone.length === 0) {
        // mui.toast('请输入手机号')
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else if (_this.sale.length === 0) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      }
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b987987dde35',
          {
            version: 'v3.0',
            app_id: '86793718',
            union_id: _this.union_id,
            mobile: _this.phone,
            vercode: _this.sale,
            bind_from: 'applet'
          }
        )
        .then(function(response) {
          console.log(response)
          wx.showToast({
            title: response.data.msg, //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: false //显示透明蒙层，防止触摸穿透,
          })
          if (response.data.code === 1) {
            _this.bindMobile = false
            wx.setStorageSync('token', _this.access_token)
            _this.getInfo(_this.access_token)
          }
          // console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取短信验证码
    getCode() {
      var _this = this
      if (_this.phone.length === 0) {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      } else {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b71477741ebb',
            {
              version: 'v3.0',
              mobile: _this.phone,
              type: 3
            }
          )
          .then(function(response) {
            wx.showToast({
              title: response.data.msg, //提示的内容,
              icon: 'none', //图标,
              duration: 2000, //延迟时间,
              mask: true //显示透明蒙层，防止触摸穿透,
            })
            if (response.data.code === 1) {
              // 发送短信倒计时
              _this.sendshow = false
              _this.timeshow = true
              // 设置定时器
              var subtractTime = setInterval(() => {
                _this.time--
                if (_this.time <= 0) {
                  clearInterval(subtractTime)
                  _this.sendshow = true
                  _this.timeshow = false
                  _this.time = 60
                }
              }, 1000)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    // 获取用户信息
    getInfo(token) {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b91ec58c2a0f',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: token
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.userIndexInfo = response.data.data
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toAdress() {
      wx.navigateTo({ url: '/pages/adress/index' })
    },
    toRecruit() {
      wx.navigateTo({
        url: '/pages/recruit/index'
      })
    },
    toFeed() {
      wx.navigateTo({
        url: '/pages/feedBack/index'
      })
    },
    toAbout() {
      wx.navigateTo({
        url: '/pages/about/index'
      })
    }
  }
}
</script>

<style scoped>
ul li {
  float: left;
}
.user_index {
  background: #fff;
  margin-bottom: 1.18rem;
  overflow: hidden;
}
.ui_top {
  background-image: url('http://offer.net199.com/dingdong/xcx/bj.40ed913.png');
  background-size: 100% 100%;
  height: 2.54rem;
}
.user_index .ui_top .ui_set {
  height: 0.4rem;
  text-align: right;
  width: 95%;
  margin: 0 auto;
  padding-top: 0.25rem;
}
.user_index .ui_top .ui_set img {
  width: 0.48rem;
  height: 0.48rem;
}
.user_info {
  padding: 0.3rem;
  padding-top: 0;
}
.user_info .ui_photo {
  width: 21%;
  float: left;
}
.user_info .ui_photo img {
  width: 67px;
  height: 67px;
  border-radius: 50%;
}
.user_info .ui_name {
  width: 68%;
  float: left;
  color: #fff;
  padding: 0.15rem;
  font-size: 0.32rem;
}
.user_info .ui_name button {
  background: none;
  width: 50%;
  display: inline-block;
  color: #fff;
  border: none;
  height: 22px;
  line-height: 22px;
  font-size: 16px;
  text-align: left;
  padding: 0;
}
.user_info .ui_name span {
  display: block;
  font-size: 0.28rem;
}
.user_info .ui_ico {
  float: left;
  width: 5%;
  margin-top: 0.4rem;
}
.user_info .ui_photo .avatar {
  width: 1.34rem;
  height: 1.34rem;
  border-radius: 50%;
  overflow: hidden;
}
.ui-coupon {
  margin: 0.25rem 0;
}
.ui-coupon .coupon-list {
  padding: 0.15rem 0;
  margin-left: 0.25rem;
  overflow: hidden;
}
.ui-coupon .coupon-list .coup-li {
  float: left;
  margin: 0 15px;
  width: 40%;
  text-align: center;
  padding: 0.26rem 0;
  line-height: 1.4;
  height: 100rpx;
}
.ui-coupon .coupon-list .coup-li a {
  color: #32b287;
  font-size: 0.4rem;
}
.ui-coupon .coupon-list .coup-li span,
.ui-coupon .coupon-list .coup-li p {
  color: #739589;
  font-size: 0.28rem;
}
.yue {
  background-image: url('http://offer.net199.com/dingdong/xcx/yh_item1.png');
  background-size: 100% 100%;
}
.hbao {
  background-image: url('http://offer.net199.com/dingdong/xcx/yh_item2.png');
  background-size: 100% 100%;
}
.yhq {
  background-image: url('http://offer.net199.com/dingdong/xcx/yh_item3.png');
  background-size: 100% 100%;
}
.gray-border {
  height: 0.28rem;
  background: #f8f8f8;
  clear: both;
}
.ui_order {
  margin-top: 10px;
}
.ui_order .order-list {
  border-top: 1px solid #ebebeb;
  padding: 0.1rem 0 0.3rem;
  overflow: hidden;
}
.ui_order .order-list .order-li {
  width: 25%;
  text-align: center;
  color: #739589;
  font-size: 0.3rem;
  line-height: 1.2;
  padding: 0.36rem 0;
}
.ui_order .order-list .order-li img {
  width: 0.55rem;
  height: 0.55rem;
}
.cell {
  padding: 0.15rem 0.3rem;
  overflow: hidden;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 0.32rem;
  position: relative;
}
.cell .col {
  float: left;
}
.span4 {
  width: 8%;
  text-align: left;
}
.span16 {
  width: 84%;
  font-size: 0.3rem;
}
.span9 {
  width: 42%;
}
.span11 {
  width: 50%;
  text-align: right;
  font-size: 0.28rem;
  color: #a4a4a6;
}
.kefu {
  position: absolute;
  background: none;
  height: 100%;
  width: 100%;
}
/* 弹窗 */
.mask {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.7;
  opacity: 0.5;
  filter: alpha(opacity=70);
}
.popup {
  position: fixed;
  top: 2.5rem;
  left: 0.58rem;
  width: 6.4rem;
  height: 5.3rem;
  background: #fff;
  z-index: 1002;
}
.popup .popup-head {
  text-align: center;
  color: #fff;
  background: #32b287;
  height: 1rem;
  line-height: 1rem;
}
.popup .popup-content {
  height: 3.2rem;
  padding: 0.3rem;
}
.popup .popup-content .inputBox span {
  float: left;
  color: #333;
  font-size: 0.32rem;
  margin-right: 0.35rem;
}
.popup .popup-content .inputBox {
  height: 0.9rem;
  line-height: 1.2rem;
  padding: 0.15rem;
  border-bottom: 1px solid #ebebeb;
}
.popup .popup-content .saleBox {
  height: 0.56rem;
  line-height: 1.2rem;
  padding: 0.15rem;
  border-bottom: 1px solid #ebebeb;
  font-size: 0.32rem;
  margin-top: 0.3rem;
}
.popup .popup-content .inputBox input {
  width: 75%;
  float: left;
  font-size: 0.32rem;
  display: block;
  margin-top: 0.32rem;
}
.popup .popup-content .saleBox input {
  width: 60%;
  float: left;
  display: block;
  font-size: 0.32rem;
}
.popup .popup-content .saleBox button {
  float: left;
  width: 1.8rem;
  background: #32b287;
  color: #fff;
  font-size: 0.28rem;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0;
}
.popup .popup-content .saleBox button.time {
  float: left;
  width: 1.8rem;
  background: #fafafa;
  color: #999;
  font-size: 0.28rem;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0;
}
.popup .popup-content .button button {
  margin: 0 auto;
  width: 100%;
  background: #32b287;
  color: #fff;
  font-size: 0.32rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0;
  margin-top: 0.4rem;
}
</style>
