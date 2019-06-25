<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
          <div class="no-data" v-if="notUsed.length===0">
            <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
            <p> 暂无可用优惠券 </p>
          </div>
           <scroll-view scroll-y="true" style="height:500px">
            <div class="coupon-list">
              <ul>
                <li class="list-item" v-for="(item,index) in notUsed" :key="index">
                  <div class="coupon-box">
                    <div class="van-row">
                      <div class="van-col span7 greenBg">
                        <div class="clo-left">
                          <p class="price">￥
                           <strong>{{item.money}}</strong>
                            </p>
                          <button @click="toUse"> 去使用 </button>
                        </div>
                      </div>
                      <div class="van-col span17">
                        <div class="col-right">
                          <p class="greenColor">{{item.name}}</p>
                          <span class="redColor">满{{item.start_money}}可用</span>
                          <span>有效期：{{item.start_time}}~{{item.end_time}}</span>
                        </div>
                      </div>
                      <div class="line">
                        <img src="/static/images/line.png" alt="">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
           </scroll-view>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <div class="no-data" v-if="alreadyUsed.length===0">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 暂无已使用的优惠券 </p>
            </div>
            <scroll-view scroll-y="true" style="height:500px"  >
            <div class="coupon-list">
              <ul>
                <li class="list-item" v-for="(item,index) in alreadyUsed" :key="index">
                  <div class="coupon-box">
                    <div class="van-row">
                      <div class="van-col span7 grayBg">
                        <div class="clo-left">
                          <p class="price">￥
                           <strong>{{item.money}}</strong>
                            </p>
                          <button @click="toDelet(item.id)"> 删除 </button>
                        </div>
                      </div>
                      <div class="van-col span17">
                        <div class="col-right">
                          <p class="grayColor">{{item.name}}</p>
                          <span class="redColor">满{{item.start_money}}可用</span>
                          <span>有效期：{{item.start_time}}~{{item.end_time}}</span>
                        </div>
                      </div>
                      <div class="line">
                        <img src="/static/images/line2.png" alt="">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
           </scroll-view>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
            <div class="no-data" v-if="alreadyExpired.length===0">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
              <p> 暂无已过期的优惠券 </p>
            </div>
            <scroll-view scroll-y="true" style="height:500px"  >
            <div class="coupon-list">
              <ul>
                <li class="list-item" v-for="(item,index) in alreadyExpired" :key="index">
                  <div class="coupon-box">
                    <div class="van-row">
                      <div class="van-col span7 grayBg">
                        <div class="clo-left">
                          <p class="price">￥
                           <strong>{{item.money}}</strong>
                            </p>
                          <button> 已过期 </button>
                        </div>
                      </div>
                      <div class="van-col span17">
                        <div class="col-right">
                          <p class="grayColor">{{item.name}}</p>
                          <span class="redColor">满{{item.start_money}}可用</span>
                          <span>有效期：{{item.start_time}}~{{item.end_time}}</span>
                        </div>
                      </div>
                      <div class="line">
                        <img src="/static/images/line2.png" alt="">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
           </scroll-view>
          </div>
        </div>
      </div>
    </div>
    <div class="coupon">
      <button @click="toGetCoupon">领取更多优惠券</button>
    </div>
  </div>
</template>

<script>
import { formatTime2 } from '@/utils/index'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
export default {
  components: {},

  data() {
    return {
      tabs: ['未使用', '已使用', '已过期'],
      activeIndex: 0,
      fontSize: 30,
      notUsed: [],
      alreadyUsed: [],
      alreadyExpired: [],
      page: 1,
      refresh: false,
      loadmore: false
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
    }
  },
  onShow() {
    this.page = 1
    this._inidata()
  },
  created() {},
  methods: {
    tabClick(e) {
      // console.log(e)
      this.activeIndex = e.currentTarget.id
    },
    _inidata() {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f92368ced6',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            page: _this.page,
            coupon_type: 'not_used'
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.notUsed = response.data.data
            var dataArray = response.data.data
            for (var i = 0; i < dataArray.length; i++) {
              var startTime = dataArray[i].start_time
              var endTime = dataArray[i].end_time
              var newDate = new Date()
              var newDate2 = new Date()
              newDate.setTime(startTime * 1000)
              newDate2.setTime(endTime * 1000)
              var format1 = formatTime2(newDate)
              var format2 = formatTime2(newDate2)
              _this.notUsed[i].start_time = format1
              _this.notUsed[i].end_time = format2
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error)
        })

      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f92368ced6',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            page: _this.page,
            coupon_type: 'already_used'
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.alreadyUsed = response.data.data
            var dataArray = response.data.data
            for (var i = 0; i < dataArray.length; i++) {
              var startTime = dataArray[i].start_time
              var endTime = dataArray[i].end_time
              var newDate = new Date()
              var newDate2 = new Date()
              newDate.setTime(startTime * 1000)
              newDate2.setTime(endTime * 1000)
              var format1 = formatTime2(newDate)
              var format2 = formatTime2(newDate2)
              _this.alreadyUsed[i].start_time = format1
              _this.alreadyUsed[i].end_time = format2
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error)
        })

      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f92368ced6',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            page: _this.page,
            coupon_type: 'already_expired'
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.alreadyExpired = response.data.data
            var dataArray = response.data.data
            for (var i = 0; i < dataArray.length; i++) {
              var startTime = dataArray[i].start_time
              var endTime = dataArray[i].end_time
              var newDate = new Date()
              var newDate2 = new Date()
              newDate.setTime(startTime * 1000)
              newDate2.setTime(endTime * 1000)
              var format1 = formatTime2(newDate)
              var format2 = formatTime2(newDate2)
              _this.alreadyExpired[i].start_time = format1
              _this.alreadyExpired[i].end_time = format2
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toGetCoupon() {
      wx.navigateTo({ url: '/pages/getCoupon/index' })
    },
    toDelet(id) {
      wx.showModal({
        title: '提示', //提示的标题,
        content: '是否删除该优惠券？', //提示的内容,
        showCancel: true, //是否显示取消按钮,
        cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', //取消按钮的文字颜色,
        confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', //确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            fly
              .post(
                'https://xiaochengxu.net199.com/public/index.php/api/5b8f925884394',
                {
                  // 请求参数
                  version: 'v3.0',
                  app_id: '86793718',
                  access_token: wx.getStorageSync('token'),
                  page: this.page,
                  coupon_id: id
                }
              )
              .then(function(response) {
                console.log(response.data.data)
                if (response.data.code === 1) {
                  wx.showToast({
                    title: response.data.msg, //提示的内容,
                    icon: 'success', //图标,
                    duration: 2000, //延迟时间,
                    mask: false, //显示透明蒙层，防止触摸穿透,
                    success: res => {}
                  })
                  setTimeout(() => {
                    // 模拟请求数据，并渲染
                    this.page = 1
                    this._inidata()
                  }, 1000)
                } else {
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          } else if (res.cancel) {
            wx.showToast({
              title: '取消删除', //提示的内容,
              icon: 'none', //图标,
              duration: 2000, //延迟时间,
              mask: false, //显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
          }
        }
      })
    },
    toUse() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-navbar {
  border-top: 1px solid #ebebeb;
  border-bottom: none;
}
.weui-tab__content {
  padding-top: 60px;
  text-align: center;
}
.weui-navbar__slider_0 {
  background-color: #32b287;
  left: 18rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  background-color: #32b287;
  left: 16rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  background-color: #32b287;
  left: 15rpx;
  transform: translateX(500rpx);
}
.weui-navbar__item.weui-bar__item_on {
  color: #32b287;
}
.weui-tab__content {
  padding-top: 20rpx;
}
.coupon-list {
  margin-bottom: 25px;
}
.coupon-list .list-item .van-row {
  margin: 0.1rem 0.36rem 0.6rem;
  box-shadow: 0px 0px 5px #ebebeb;
  padding: 0;
  border: none;
  line-height: normal;
  overflow: hidden;
}
.van-col {
  box-sizing: border-box;
  float: left;
}
.greenBg {
  background: #32b287;
  border-color: #32b287;
}
.greenColor {
  color: #32b287;
}
.grayBg {
  background: #c8c8c8;
  border-color: #c8c8c8;
}
.grayColor {
  color: #a4a4a6;
}
.redColor {
  background: #fef4eb;
  color: #f44a48 !important;
  width: 85px;
  text-align: center !important;
}
.coupon-list .list-item .van-row .span7 {
  height: 1.9rem;
  width: 29.1667%;
  position: relative;
}
.coupon-list .list-item .van-row .span7 .price {
  color: #fff;
  font-size: 0.34rem;
  line-height: 0.64rem;
  margin-top: 0.28rem;
  text-align: center;
}
.coupon-list .list-item .van-row .span7 .price strong {
  color: #fff;
  font-size: 0.42rem;
  display: inline-block;
}
.coupon-list .list-item .van-row .span7 button {
  padding: 0;
  color: #fff;
  border: 1px solid #fff;
  width: 1.3rem;
  height: 0.48rem;
  line-height: 0.42rem;
  border-radius: 0.14rem;
  position: absolute;
  bottom: 0.35rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0.25rem;
  background: none;
}
.coupon-list .list-item .van-row .span17 {
  height: 1.9rem;
  width: 70.8333%;
}
.coupon-list .list-item .van-row .span17 p {
  font-size: 0.36rem;
  line-height: 0.6rem;
  margin: 0.3rem 0 0;
  padding-left: 0.32rem;
  text-align: left;
}
.coupon-list .list-item .van-row .span17 span {
  color: #a4a4a6;
  font-size: 0.26rem;
  line-height: 0.35rem;
  margin-left: 0.32rem;
  display: block;
  margin-top: 0.05rem;
  text-align: left;
}
.coupon-list .list-item .van-row .line {
  position: relative;
  height: 1.9rem;
  z-index: -1;
}
.coupon-list .list-item .van-row .line img {
  position: absolute;
  top: 0;
  left: 29%;
  height: 1.9rem;
  background: #f2f2f2;
  width: 12px;
}
.coupon {
  border-top: 1px solid #ebebeb;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.coupon button {
  background: #fff;
  color: #32b287;
  font-size: 0.32rem;
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-radius: 0;
}
.no-data {
  text-align: center;
  padding: 1rem 0.5rem 0.5rem;
}
.no-data img {
  width: 360rpx;
  height: 360rpx;
}
.no-data p {
  margin: 0.4rem 0;
  font-size: 0.32rem;
  color: #a4a4a6;
}
</style>