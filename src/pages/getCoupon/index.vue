<template>
  <div class="page">
      <div class="no-data" v-if="coupon.length===0">
        <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
        <p> 暂无可领取优惠券 </p>
      </div>
    <div class="coupon-list">
      <ul>
        <li class="list-item" v-for="(item,index) in coupon" :key="index">
          <div class="coupon-box">
            <div class="van-row">
              <!-- 库存为0是判断 -->
              <div class="van-col span7 grayBg" v-if="item.count===0">
                <div class="clo-left">
                  <p class="price">￥
                    <strong>{{item.money}}</strong>
                    </p>
                  <button @click="receive(item.id)" v-if="item.count===0"> 已领完 </button>
                </div>
              </div>
              <!-- 已领取判断 -->
              <div class="van-col span7 grayBg" v-if="item.is_received===1">
                <div class="clo-left">
                  <p class="price">￥
                    <strong>{{item.money}}</strong>
                    </p>
                  <button @click="receive(item.id)" > 已领取 </button>
                </div>
              </div>
              <!-- 未领取判断 -->
              <div class="van-col span7 greenBg" v-else>
                <div class="clo-left">
                  <p class="price">￥
                    <strong>{{item.money}}</strong>
                    </p>
                  <button @click="receive(item.id)"> 立即领取 </button>
                </div>
              </div>
              <div class="van-col span17">
                <div class="col-right">
                  <!-- 无库存或库存为空判断 -->
                  <p class="grayColor" v-if="item.count===0 || item.is_received===1">{{item.name}}</p>
                  <p class="greenColor" v-else>{{item.name}}</p>
                  <span class="redColor">满{{item.start_money}}可用</span>
                  <span>有效期：{{item.start_time}}~{{item.end_time}}</span>
                </div>
              </div>
              <!-- 无库存或库存为空判断 -->
              <div class="line" v-if="item.count===0 || item.is_received===1">
                <img src="/static/images/line2.png" alt="">
              </div>
              <!-- 有库存判断 -->
              <div class="line" v-else>
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
      noData: false
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
      console.log('倒计时结束，上拉加载更多')
      // 请求方法
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f91fabbfc9',
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
            that.coupon = that.coupon.concat(response.data.data)
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
              that.coupon = that.coupon.concat(dataArray)
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
          'https://xiaochengxu.net199.com/public/index.php/api/5b8f91fabbfc9',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            page: _this.page,
            access_token: wx.getStorageSync('token')
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.coupon = response.data.data
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
              _this.coupon[i].start_time = format1
              _this.coupon[i].end_time = format2
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
.redColor {
  background: #fef4eb;
  color: #f44a48 !important;
  width: 85px;
  text-align: center !important;
}
.grayBg {
  background: #c8c8c8;
  border-color: #c8c8c8;
}
.grayColor {
  color: #a4a4a6;
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