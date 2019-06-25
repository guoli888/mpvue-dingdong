<template>
<div class="rechargeRecord">
  <div class="head">
    <div class="title">
      <p>账户余额（元）</p>
    </div>
    <div class="price">
      <span>{{price}}</span>
    </div>
  </div>
  <div class="content">
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
            <div class="no-data" v-if="rechargeRecord.length===0">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="">
              <p> 暂无充值记录 </p>
            </div>
            <scroll-view scroll-y="true" style="height:380px"  >
            <!-- 循环list -->
            <div class="recordList">
              <div class="list-item" v-for="(item,index) in rechargeRecord" :key="index">
                <div class="col span11">
                  <p>充值金额</p>
                  <p class="chongzhi">￥<span>{{item.money}}</span></p>
                </div>
                <div class="col span13">
                  <p>充值时间</p>
                  <p>{{item.create_time}}</p>
                </div>
              </div>
            </div>
            <!-- 循环list -->
            </scroll-view>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <div class="no-data" v-if="consumption.length===0">
              <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="">
              <p> 暂无消费记录 </p>
            </div>
           <scroll-view scroll-y="true" style="height:380px"  >
            <!-- 循环list -->
             <div class="recordList2">
             <div class="list-item" v-for="(item,index) in consumption" :key="index">
                <div class="col span11">
                  <p>消费金额</p>
                  <p class="xiaofei">￥<span>{{item.order_price}}</span></p>
                </div>
                <div class="col span13">
                  <p>消费时间</p>
                  <p>{{item.create_time}}</p>
                </div>
              </div>
            </div>
            <!-- 循环list -->
            </scroll-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { formatTime } from '@/utils/index'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
export default {
  components: {},

  data() {
    return {
      tabs: ['充值记录', '消费记录'],
      activeIndex: 0,
      fontSize: 30,
      price: '0.00',
      rechargeRecord: [],
      consumption: [],
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
    this._inidata()
  },
  created() {},
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id
    },
    _inidata() {
      // 请求当前充值记录
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b93374542ed9',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            record_type: 'recharge'
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            _this.rechargeRecord = response.data.data
            var resData = _this.rechargeRecord
            for (var i = 0; i < resData.length; i++) {
              var ctime = resData[i].create_time
              var newDate = new Date()
              newDate.setTime(ctime * 1000)
              var creatTime = formatTime(newDate)
              _this.rechargeRecord[i].create_time = creatTime
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      // 请求当前消费记录
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b93374542ed9',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            record_type: 'expenses'
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            _this.consumption = response.data.data
            var resData = _this.consumption
            for (var i = 0; i < resData.length; i++) {
              var ctime = resData[i].create_time
              var newDate = new Date()
              newDate.setTime(ctime * 1000)
              var creatTime = formatTime(newDate)
              _this.consumption[i].create_time = creatTime
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      // 请求当前余额
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
            _this.price = response.data.data.money
          } else {
            _this.price = '--'
          }
        })
        .catch(function(error) {
          console.log(error)
          _this.price = '--'
        })
    }
  }
}
</script>

<style scoped>
/* 选项卡切换样式 */
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-navbar {
  border-bottom: 1px solid #ebebeb;
  border-top: none;
}
.weui-tab__content {
  padding-top: 60px;
  text-align: center;
}
.weui-navbar__slider_0 {
  background-color: #32b287;
  left: 70rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  background-color: #32b287;
  left: 200rpx;
  transform: translateX(250rpx);
}
.weui-tab__content {
  padding-top: 20rpx;
}
.weui-navbar__item.weui-bar__item_on {
  color: #32b287;
}
/* 头部样式 */
.head {
  background: #32b287;
  position: relative;
  height: 3rem;
}
.head .title {
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  padding-top: 0.8rem;
}
.head .price {
  display: block;
  padding-top: 0.1rem;
  text-align: center;
}
.head .price span {
  color: #fff;
  font-size: 0.56rem;
}
/* 充值 */
.recordList .list-item {
  overflow: hidden;
  padding: 0.15rem;
  font-size: 0.32rem;
  border-bottom: 10px solid #f8f8f8;
}
.recordList .list-item .col {
  float: left;
}
.recordList .list-item .span13 {
  width: 58%;
  text-align: right;
}
.recordList .list-item .span13 p {
  color: #a4a4a6;
}
.recordList .list-item .span11 {
  width: 41%;
  text-align: left;
}
.recordList .list-item .span11 p {
  color: #a4a4a6;
}
.recordList .list-item .span11 .chongzhi {
  color: #32b287;
  font-size: 0.3rem;
}
.recordList .list-item .span11 .chongzhi span {
  font-size: 0.36rem;
  font-weight: bold;
}
/* 支出 */
.recordList2 .list-item {
  overflow: hidden;
  padding: 0.15rem;
  font-size: 0.32rem;
  border-bottom: 10px solid #f8f8f8;
}
.recordList2 .list-item .col {
  float: left;
}
.recordList2 .list-item .span13 {
  width: 58%;
  text-align: right;
  font-size: 0.32rem;
}
.recordList2 .list-item .span13 p {
  color: #a4a4a6;
}
.recordList2 .list-item .span11 {
  width: 41%;
  text-align: left;
  font-size: 0.32rem;
}
.recordList2 .list-item .span11 p {
  color: #a4a4a6;
}
.recordList2 .list-item .span11 .xiaofei {
  color: #fa8385;
  font-size: 0.3rem;
}
.recordList2 .list-item .span11 .xiaofei span {
  font-size: 0.36rem;
  font-weight: bold;
}

/* 无记录显示 */
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
