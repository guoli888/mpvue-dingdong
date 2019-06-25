<template>
  <div class="recruit">
    <div class="search row" @click="toSearch">
          <i-col span="17" i-class="col-class">
            <i-col span='4'>
              <icon class="search-icon" type="search" size="18"></icon>
            </i-col>
            <i-col span='20'>
              <input type="text" :value="value" disabled='true' placeholder="输入关键字在店内搜索" class="search-input" />
              <div class="van-search__action">
              <div>搜索</div>
            </div>
            </i-col>
          </i-col>
      </i-row>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <div class="page__bd page__bd_spacing">
        <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
          <div>
            <swiper-item>
              <image src="http://offer.net199.com/dingdong/xcx/demo/bannertemp.e8a6fa63.5c4f544.jpg" class="slide-image" />
            </swiper-item>
          </div>
        </swiper>
      </div>
    </div>
    <!-- end轮播图 -->
    <!-- 分类活动 -->
    <div class="classify2 two">
      <div class="list">
        <div v-for="(item,index) in classify3" :key="index" class="listItem">
          <div class="textBox">
            <p>{{ item.title }}</p>
            <p class="info">{{ item.info }}</p>
          </div>
          <div class="imgBox">
            <img :src="item.imageUrl">
          </div>
        </div>
      </div>
    </div>
    <div class="gray-border"></div>
    <!-- end 分类活动 -->
    <!-- 商家列表 -->
    <div class="nearby">
      <div class="title-bar">
        <hr/>
        <span>招聘列表</span>
      </div>

      <div class="recruitbody">
          <div class="van-row" v-for="(item,index) in recruitments" :key="index" @click="toDetail(item.id)">
            <div class="van-col van-col--14" span=14>
            <h3>{{item.name}}</h3>
            <span>{{item.address}}</span> <span>{{item.experience}}</span>
            <div><span>{{item.label1}}</span><span >{{item.label2}}</span><span >{{item.label3}}</span></div>
            </div>
            <div class="van-col van-col--10">
              <p>{{item.salary}}</p>
              <span>{{item.status_str}}</span>
            </div>
          </div>
      </div>
      <div class="weui-loadmore" v-if="loadMore">
        <div class="weui-loading"></div>
        <div class="weui-loadmore__tips">正在加载</div>
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
      startindex: 4,
      swiperList: [],
      recruitments: [],
      classify3: [
        {
          title: '家庭日常保洁',
          info: '会员享优惠',
          imageUrl:
            'http://offer.net199.com/dingdong/xcx/demo/5b64fc981d12c.jpg',
          link: ''
        },
        {
          title: '企业服务',
          info: '省钱省心',
          imageUrl:
            'http://offer.net199.com/dingdong/xcx/demo/5b64fca2ea8c0.jpg',
          link: ''
        },
        {
          title: '老人看护',
          info: '贴心照顾',
          imageUrl:
            'http://offer.net199.com/dingdong/xcx/demo/5b64fca89106a.jpg',
          link: ''
        }
      ],
      page: 1,
      loadMore: false
    }
  },
  mounted() {
    // 初始化page
    this.page = 1
    this.getData()
  },
  created() {},
  // 上拉加载，拉到底部触发
  onReachBottom() {
    var that = this
    // 上拉加载需要处理的事情
    this.loadMore = true
    this.page += 1
    setTimeout(function() {
      console.log('倒计时结束，上拉加载更多')
      // 请求方法
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b77cab4e7a7e',
          {
            version: 'v3.0',
            app_id: 86793718,
            page: that.page
          }
        )
        .then(function(response) {
          if (response.data.data.length > 0) {
            that.recruitments = that.recruitments.concat(response.data.data)
          } else {
            // 若返回内容为空，轻提示
            wx.showToast({
              title: '我可是有底线的',
              icon: 'none',
              duration: 1500,
              mask: false
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      that.loadMore = false
      // return that.loadMore
    }, 1000)
    console.log(this.page)
  },
  methods: {
    toDetail(option) {
      wx.redirectTo({
        url: '/pages/recruitment/index?recruitment_id=' + option
      })
    },
    toSearch() {
      wx.navigateTo({ url: '/pages/search/index' })
    },
    getData() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b77cab4e7a7e',
          {
            version: 'v3.0',
            app_id: 86793718,
            page: _this.page
          }
        )
        .then(function(response) {
          _this.recruitments = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.recruit .search {
  background: #f7f6f4;
  border-radius: 0.49rem;
  height: 0.72rem;
  margin: 0.1rem 0.15rem;
  position: relative;
}

.search-icon {
  padding: 0.05rem 0 0 0.1rem;
  position: relative;
  top: 0.02rem;
  left: 0.2rem;
}
.search-input {
  color: #a4a4a6;
  font-size: 0.3rem;
  padding: 0.1rem 0;
}
.van-search__action {
  font-size: 0.32rem;
  line-height: 0.72rem;
  background: #32b287;
  color: #fff;
  padding: 0 0.63rem;
  border-top-right-radius: 0.49rem;
  border-bottom-right-radius: 0.49rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
swiper {
  height: 2.4rem;
}
.banner {
  height: 2.4rem;
  margin-top: 0.25rem;
}
image {
  width: 100%;
  height: 100%;
}
.classify2 .left,
.classify2 .listItem {
  width: 44.5%;
  float: left;
  display: block;
  border-bottom: 1px solid #ebebeb;
  padding: 0.2rem 0.2rem 0;
}
.classify2 .list:first-child {
  height: 2.6rem;
  border-right: 1px solid #ebebeb;
}
.classify2 .listItem {
  float: left;
  display: inline-block;
}
.classify2 .listItem .textBox {
  float: left;
  width: 70%;
}
.classify2 .listItem .textBox p {
  font-size: 0.3rem;
}
.classify2 .listItem .textBox .info {
  color: #999;
}
.classify2 .listItem .imgBox {
  float: left;
  width: 30%;
}
.classify2 .listItem .imgBox img {
  border-radius: 50%;
  height: 0.95rem;
}
.classify2 .list .listItem:first-child {
  border-right: 1px solid #ebebeb;
}
.classify2 .list .listItem:first-child .textBox {
  width: 100%;
}
.classify2 .list .listItem:first-child .imgBox {
  width: 100%;
}
.classify2 .list .listItem:first-child p {
  color: #32b287;
}
.classify2 .list .listItem:first-child p.info {
  color: #999;
}
.classify2 .list .listItem:first-child .imgBox img {
  height: 1.32rem;
  width: 80%;
  border-radius: 0;
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
.nearby {
  margin-bottom: 1rem;
}
.nearby .title-bar {
  text-align: center;
  position: relative;
  height: 0.5rem;
}
.nearby .title-bar hr {
  height: 2rpx;
  border: none;
  border-top: 2rpx solid #bebcb9;
  width: 3rem;
  margin: 0.5rem auto;
}
.nearby .title-bar span {
  position: absolute;
  top: -0.28rem;
  left: 0;
  right: 0;
  display: block;
  background: #fff;
  font-size: 0.34rem;
  width: 1.8rem;
  text-align: center;
  margin: 0 auto;
}
.recruitbody {
  background: #fff;
}
.recruitbody .van-row {
  border: none;
  border-bottom: 1px solid #ebebeb;
  padding: 0.28rem 0.28rem 0.2rem;
  overflow: hidden;
}
.recruitbody .van-row .van-col--14 {
  width: 58.33333%;
  float: left;
  overflow: hidden;
}
.recruitbody .van-row .van-col--10 {
  width: 41.66667%;
  float: left;
  overflow: hidden;
}
.recruitbody .van-row .van-col--14 h3 {
  font-size: 0.3rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0px;
}
.recruitbody .van-row .van-col--14 span {
  font-size: 0.26rem;
  color: #a4a4a6;
  margin-right: 0.28rem;
}
.recruitbody .van-row .van-col--14 div {
  overflow: hidden;
  margin-bottom: 5px;
  margin-top: 10px;
}
.recruitbody .van-row .van-col--14 div span {
  color: #a4a4a6;
  border-radius: 0.07rem;
  background: aliceblue;
  margin-right: 0.28rem;
  padding: 0.08rem 0.14rem;
}
.recruitbody .van-row .van-col--14 div p {
  font-size: 0.26rem;
  margin-top: 0.1rem;
  color: #a4a4a6;
}
.recruitbody .van-row .van-col--14 div p span {
  color: #32b287;
  font-size: 0.26rem;
  border-radius: 0.07rem;
  border: 1px solid #32b287;
  margin-right: 0.28rem;
  padding: 0.04rem 0.14rem;
}
.recruitbody .van-row .van-col--10 p {
  text-align: right;
  color: #fa3c00;
  margin: 0.1rem 0rem;
  font-size: 0.3rem;
}
.recruitbody .van-row .van-col--10 span {
  font-size: 0.26rem;
  color: #a4a4a6;
  float: right;
  text-align: right;
}
.weui-loadmore {
  margin-top: 0.15rem;
}
</style>
