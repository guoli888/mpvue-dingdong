<template>
  <div class="category">
    <!-- 头部搜索 -->
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
    <!-- 种类 -->
    <div class="more-nav">
      <scroll-view class="my-scroll" scroll-x style="width: 100%">
       <div class="scroll-item" v-for="(item,index) in swiperList" :key="index">
          <img :src="item.image" alt="" @click="changeStoreList(item.id)">
          <p>{{ item.name }}</p>
       </div>
      </scroll-view>
    </div>
    <div class="gray-border"></div>
    <!-- 商家列表 -->
    <div class="nearby">
      <div class="title-bar">
        <hr/>
        <span>商家列表</span>
      </div>

      <div class="list-item" v-for="(item,index) in indexList" :key="index" @click="goStore(item.id)">
        <div class="left">
          <img :src="item.avatar">
        </div>
        <div class="right">
          <div class="name" @click="goStore(item)">{{ item.name }}</div>
          <div class="mid clearfix">
            <!-- <star class="fl" :size="24" :score="data.score"></star> -->
            <i-rate :value="item.score" size='16' class="star"></i-rate>
            <span class="count">月售{{ item.monthly_sale }}</span>
          </div>
        <!-- 根据页面样式只能显示3条，多出省略 -->
          <div class="fee">
            <span class="start">{{ item.label[0] }}</span>
            <span class="deliver">{{ item.label[1] }}</span>
            <span class="average">{{ item.label[2] }}</span>
          </div>
        </div>
      </div>
      <div class="weui-loadmore" v-if="loadMore">
        <div class="weui-loading"></div>
        <div class="weui-loadmore__tips">正在加载...</div>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-if="noData">
        <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无更多数据...</div>
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
      indexList: [],
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
      noData: false,
      loadMore: false,
      page: 1
    }
  },
  created() {},
  mounted() {
    // 初始化page
    this.page = 1
    this.initData()
  },
  // 下拉刷新
  onPullDownRefresh() {
    let _this = this
    setTimeout(() => {
      // 模拟请求数据，并渲染
      _this.page = 1
      _this.initData()
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    var id = parseInt(this.$root.$mp.query.category_id)
    var that = this
    // 上拉加载需要处理的事情
    this.loadMore = true
    that.noData = false
    this.page += 1
    setTimeout(function() {
      console.log('倒计时结束，上拉加载更多')
      // 请求方法
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b626737a3f8a',
          {
            version: 'v3.0',
            app_id: '86793718',
            category_id: id,
            page: that.page
          }
        )
        .then(function(response) {
          console.log(response.data.msg)
          if (response.data.data.length > 1) {
            // console.log(response.data.data)
            // 通过数组拼接，改变indexList数组里的值
            that.indexList = that.indexList.concat(response.data.data)
          } else {
            // 若返回内容为空，轻提示
            that.noData = true
            // wx.showToast({
            //   title: '我可是有底线的',
            //   icon: 'none',
            //   duration: 1500,
            //   mask: false
            // })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      that.loadMore = false
      // console.log(that.loadMore)
      return that.loadMore
    }, 1000)
    // console.log(that.page)
  },
  methods: {
    goStore(option) {
      wx.redirectTo({
        url: '/pages/storeInfo/index?store_id=' + option
      })
    },
    initData() {
      var id = parseInt(this.$root.$mp.query.category_id)
      // console.log(id.category_id)
      var _this = this
      // 获取分类栏目
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b600f2ce89c7',
          {
            version: 'v3.0',
            app_id: '86793718',
            category_id: id,
            page: _this.page
          }
        )
        .then(function(response) {
          // mui.toast(response.data.msg);
          if (response.data.code === 1) {
            // console.log(response.data.data)
            _this.swiperList = response.data.data
          }
        })
        .catch(function(error) {
          console.log(error)
        })

      // 商家列表 初始进入显示所有商家
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b626737a3f8a',
          {
            version: 'v3.0',
            app_id: '86793718',
            category_id: id,
            page: _this.page
          }
        )
        .then(function(response) {
          console.log(response.data.msg)
          if (response.data.code === 1) {
            // console.log(response.data.data)
            _this.indexList = response.data.data
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 根据二级栏目显示商家
    changeStoreList(id) {
      console.log(id)
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b626737a3f8a',
          {
            category_id: id
          }
        )
        .then(function(response) {
          // console.log(response.data.data)
          // console.log(response.data.msg)
          if (response.data.code === 1) {
            // console.log(response.data.data)
            _this.indexList = response.data.data
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toSearch() {
      wx.navigateTo({ url: '/pages/search/index' })
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
  }
}
</script>

<style scoped>
.category .search {
  background: #f7f6f4;
  border-radius: 0.49rem;
  height: 0.72rem;
  margin: 0.1rem 0.15rem;
  position: relative;
}
.city-name {
  color: #32b287;
  font-size: 0.3rem;
  line-height: 0.56rem;
  text-align: center;
  border-right: 1px solid #a4a4a6;
  margin: 0.07rem 0;
}
.tri-se {
  width: 0;
  height: 0;
  border-right: 0.2rem solid #000;
  border-top: 0.2rem solid transparent;
  float: right;
  margin-top: 0.3rem;
  margin-right: 0.28rem;
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
.more-nav {
  width: 100%;
  height: 1.8rem;
}
.my-scroll {
  width: 100%;
  white-space: nowrap;
}
.scroll-item {
  text-align: center;
  width: 1.45rem;
  height: 1.2rem;
  display: inline-block;
  margin-left: 0.15rem;
  margin-top: 0.3rem;
  line-height: 1.4;
}
.scroll-item img {
  width: 0.86rem;
  height: 0.86rem;
  border-radius: 50%;
}
.scroll-item p {
  font-size: 0.27rem;
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
.list-item {
  overflow: hidden;
  padding: 0 0.15rem;
  margin-top: 0.3rem;
}
.list-item .left {
  width: 20%;
  height: 1.4rem;
  float: left;
}
.list-item .left img {
  width: 1.4rem;
}
.list-item .right {
  float: right;
  width: 78%;
  line-height: 1.4;
}
.list-item .right .name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  font-weight: bold;
  margin-right: 15px;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list-item .right .count {
  float: right;
  color: #666;
  font-size: 0.24rem;
}
.list-item .right .star {
  line-height: 0;
}
.list-item .right .fee span {
  content: inherit;
  background: #a2d707 none repeat scroll 0 0;
  border-radius: 0.07rem;
  color: #fff;
  font-size: 0.28rem;
  margin-right: 0.28rem;
  padding: 0 0.12rem;
}
.list-item .right .fee .start::after {
  content: inherit;
}
.list-item .right .fee .deliver::after {
  content: inherit;
}
.list-item .right .fee .average::after {
  content: inherit;
}
.list-item .right .fee .deliver {
  background: #69bef4;
}
.list-item .right .fee .average {
  background: #fa8385;
}
.nearby {
  margin-bottom: 0.9rem;
}
.weui-loadmore {
  margin-top: 0.45rem;
}
</style>
