<template>
  <div class="page">
    <div class="back">
      <button @click="backConfirm">不选择优惠券</button>
    </div>
    <div class="no-data" v-if="notUsed.length===0">
      <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
      <p> 暂无可用优惠券 </p>
    </div>
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
                  <button @click="toUse(item.id,item.money)"> 立即使用 </button>
                </div>
              </div>
              <div class="van-col span17">
                <div class="col-right">
                  <p class="greenColor" >{{item.name}}</p>
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
    <div class="weui-loadmore" v-if="loadMore">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载...</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-if="noData">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无更多优惠券...</div>
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
      coupon: [],
      page: 1,
      loadMore: false,
      noData: false,
      notUsed: []
    }
  },
  onShow() {
    this.page = 1
    this._inidata()
  },
  created() {},
  // 下拉刷新
  onPullDownRefresh() {
    let _this = this
    setTimeout(() => {
      // 模拟请求数据，并渲染
      _this.page = 1
      _this._inidata()
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    var that = this
    // 上拉加载需要处理的事情
    this.loadMore = true
    that.noData = false
    this.page += 1
    setTimeout(function() {
      // 请求方法
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f92368ced6',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            page: that.page
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.data > 0) {
            that.notUsed = that.notUsed.concat(response.data.data)
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
              dataArray[i].start_time = format1
              dataArray[i].end_time = format2
              that.notUsed = that.notUsed.concat(dataArray)
            }
          } else {
            that.noData = true
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      that.loadMore = false
      console.log(that.loadMore)
      return that.loadMore
    }, 1000)
    console.log(that.page)
  },
  methods: {
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
    },
    receive(id) {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f92185d8ae',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            page: _this.page,
            access_token: wx.getStorageSync('token'),
            coupon_id: id
          }
        )
        .then(function(response) {
          console.log(response.data)
          if (response.data.code === 1) {
            wx.showToast({
              title: response.data.msg, //提示的内容,
              icon: 'success', //图标,
              duration: 2000, //延迟时间,
              mask: false, //显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
            setTimeout(() => {
              // 刷新页面
              _this.page = 1
              _this._inidata()
            }, 1000)
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
    },
    toUse(id, couponmoney) {
      if (this.$root.$mp.query.from === 'order_confirm') {
        wx.redirectTo({
          url:
            '/pages/orderConfirm/index?couponId=' +
            id +
            '&coupon_money=' +
            couponmoney
        })
      }
    },
    backConfirm() {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  }
}
</script>

<style scoped>
.coupon-list {
  position: relative;
}
.coupon-list .list-item .van-row {
  margin: 0.1rem 0.36rem 0.6rem;
  box-shadow: 0px 0px 5px #ebebeb;
  padding: 0;
  border: none;
  line-height: normal;
  overflow: hidden;
  position: relative;
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
  position: fixed;
  bottom: 0;
  width: 100%;
}
.coupon button {
  background: #32b287;
  color: #fff;
  font-size: 0.32rem;
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-radius: 0;
}
.back {
  margin: 30rpx auto;
  width: 90%;
  height: 45px;
  line-height: 45px;
}
.back button {
  background: #ebebeb;
  color: #a4a4a6;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 32rpx;
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