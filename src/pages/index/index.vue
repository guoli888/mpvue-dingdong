<template>
   <div class="index">
    <!-- 头部搜索 -->
    <div class="search row" @click="goSearch">
      <i-row>
        <i-col span="7" i-class="col-class">
          <div class="city-name">
            <a href="/pages/switchCity/index">
            {{nowCity}}
            </a>
            <span class="tri-se"></span>
          </div>
        </i-col>
        <i-col span="17" i-class="col-class" @click="toSearch">
          <i-col span='4'>
            <icon class="search-icon" type="search" size="18"></icon>
          </i-col>
          <i-col span='20'>
            <input type="text" :value="value" disabled="true" placeholder="输入关键字在店内搜索" class="search-input" />
          </i-col>
        </i-col>
      </i-row>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <div class="page__bd page__bd_spacing">
        <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
          <div v-for="(item,index) in banner" :key="index">
            <swiper-item>
              <image :src="item.image" class="slide-image" @click="goStore(item.href)"/>
            </swiper-item>
          </div>
        </swiper>
      </div>
    </div>
    <!-- end轮播图 -->
    <!-- 快捷导航 -->
    <div class="nav">
      <i-row>
        <div v-for="(item,index) in firClassify" :key="index" class="navBox">
          <img :src="item.image" @click="goCategory(item.href)" />
          <p>{{item.info}}</p>
        </div>
      </i-row>
    </div>
    <!-- end 快捷导航 -->
    <!-- 更多导航 -->
    <div class="more-nav">
      <i-row>
        <div v-for="(item,index) in secClassify" :key="index" class="navBox" >
           <img :src="item.image" class="smallIco" @click="goCategory(item.href)"/>
           <p class="smallFont">{{item.info}}</p>
        </div>
      </i-row>
    </div>
    <!-- end 更多导航 -->
    <!-- 横幅广告栏 -->
    <div class="gray-border"></div>
    <i-col span="24" v-for="(item, index) in bannerAd" :key="index">
      <img :src="item.image" class="c-banner" @click="goCategory(item.href)" />
    </i-col>
    <div class="gray-border2"></div>
    <!-- end 横幅广告栏 -->

    <!-- 分类活动 -->
    <div class="classify">
      <i-row>
        <div span="12" v-for="(item,index) in columnAdvert" :key="index" class="i-col-12">
          <i-col span="17">
            <p>{{ item.info }}</p>
            <p class="info">{{item.description}}</p>
          </i-col>
          <i-col span="7">
            <img :src="item.image">
          </i-col>
        </div>
      </i-row>
    </div>
    <!-- end 分类活动 -->

    <!-- 横幅广告栏 -->
    <div class="gray-border"></div>
    <i-col span="24" v-for="(item, index) in bannerAd2" :key="index">
      <img :src="item.image" class="c-banner2" @click="goCategory(item.href)" />
    </i-col>
    <div class="gray-border3"></div>
    <!-- end 横幅广告栏 -->

    <!-- 分类活动2 -->
    <div class="classify2 two">
      <div class="list">
        <div v-for="(item,index) in columnAdvert2" :key="index" class="list-item">
          <div class="textBox">
            <p>{{ item.info }}</p>
            <p class="info">{{ item.description }}</p>
          </div>
          <div class="imgBox">
            <img :src="item.image">
          </div>
        </div>
      </div>
    </div>
    <div class="gray-border"></div>
        <!-- end 分类活动 -->
    <!-- 精选商品 -->
    <div class="goods-info row">
      <i-row>
        <div >
          <div class="title">家电
            <span>维修</span>
          </div>
        </div>
      </i-row>
      <div class="list">
        <ul>
          <div v-for="(item,index) in column" :key="index" >
            <li>
              <a :href="item.link">
                <img :src="item.image">
                <p>{{ item.info}}</p>
                <p class="price">{{ item.description }}</p>
              </a>
            </li>
          </div>
        </ul>
      </div>

    </div>
    <!-- end 精选商品 -->
  </div>
</template>

<script>
// 必须导入 否则编译报错
import _ from 'lodash'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

export default {
  data() {
    return {
      userInfo: {},
      value: '输入关键字在店内搜索',
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      banner: [],
      firClassify: [],
      secClassify: [],
      bannerAd: [],
      columnAdvert: [],
      bannerAd2: [],
      columnAdvert2: [],
      column: [],
      nowCity: '芜湖市'
    }
  },

  components: {},
  watch: {},
  created() {
    wx.removeStorage({
      key: 'token'
    })
  },
  mounted() {
    // 执行请求方法
    this.initData()
    this.getClassify()
    this.getsecClassify()
    this.getbannerAd()
    this.getcolumnAdvert()
    this.getbannerAd2()
    this.getcolumnAdvert2()
    this.getcolumn()
  },
   onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  computed: {},
  methods: {
    goCategory(option) {
      // 传递参数
      var ind = option.indexOf('category_id', 0)
      var str = option.substring(ind, option.length)
      wx.navigateTo({
        url: '/pages/category/index?' + str
      })
    },
    goStore(option) {
      // 传递参数
      var ind = option.indexOf('store_id', 0)
      var str = option.substring(ind, option.length)
      wx.navigateTo({
        url: '/pages/storeInfo/index?' + str
      })
    },
    // 定义接口请求方法
    initData() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fced9e2771',
          {
            // id: 1
            version: 'v3.0'
          }
        )
        .then(function(response) {
          // 返回请求数据
          // console.log(response.data)
          _this.banner = response.data.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getClassify() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fddca42cdf',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.firClassify = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getsecClassify() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde04ea578',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.secClassify = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getbannerAd() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde2349230',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.bannerAd = response.data.data
          // console.log(response.data.data)s
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getcolumnAdvert() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde41aba72',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.columnAdvert = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getbannerAd2() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde5d973ae',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.bannerAd2 = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getcolumnAdvert2() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde7493597',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.columnAdvert2 = response.data.data
          // console.log(response.data.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getcolumn() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b5fde892b860',
          {
            version: 'v3.0'
          }
        )
        .then(function(response) {
          _this.column = response.data.data
          // console.log(response.data.data)
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
.search {
  background: #f7f6f4;
  border-radius: 0.49rem;
  height: 0.72rem;
  margin: 0.1rem 0.15rem;
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
.banner {
  margin-bottom: 0.15rem;
  height: 3.27rem;
  margin-top: 0.25rem;
}
image {
  width: 100%;
  height: 100%;
}
.nav {
  text-align: center;
  margin-bottom: 0.28rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #ebebeb;
}
.navBox {
  width: 20% !important;
  float: left;
  text-align: center;
}
p {
  font-size: 0.3rem;
  color: #000;
  margin-top: -0.1rem;
}
.nav img {
  width: 0.88rem;
  height: 0.88rem;
}
.more-nav {
  text-align: center;
  margin-bottom: 0.5rem;
}
.smallIco {
  width: 0.64rem;
  height: 0.64rem;
}
.smallFont {
  font-size: 0.26rem;
}
.mt10 {
  margin-top: 0.1rem;
}
.mb30 {
  margin-bottom: 0.3rem;
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
.c-banner {
  width: 100%;
  height: 2.5rem;
}
.c-banner2 {
  width: 100%;
  height: 1.4rem;
}
.gray-border2 {
  height: 0.2rem;
  margin-top: 2.5rem;
  background: #f8f8f8;
}
.gray-border3 {
  height: 0.2rem;
  margin-top: 1.4rem;
  background: #f8f8f8;
}
.classify .i-row .icol p {
  font-size: 0.392rem;
  color: #333;
  margin: 0;
  line-height: 0.5rem;
}
.classify p {
  font-size: 0.3rem;
  color: #333;
  margin: 0;
  line-height: 0.45rem;
}
.classify p.info {
  color: #999;
  font-size: 0.26rem;
}
.classify img {
  border-radius: 50%;
  height: 0.95rem;
}
.i-col-12:nth-child(2n) {
  border-left: 1px solid #ebebeb;
}
.i-col-12 {
  width: 44.5%;
  float: left;
  display: block;
  border-bottom: 1px solid #ebebeb;
  padding: 0.2rem 0.2rem 0;
}
.classify2 .left,
.classify2 .list-item {
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
.classify2 .list-item {
  float: left;
  display: inline-block;
}
.classify2 .list-item .textBox {
  float: left;
  width: 70%;
}
.classify2 .list-item .textBox p {
  line-height: 2;
}
.classify2 .list-item .textBox .info {
  color: #999;
}
.classify2 .list-item .imgBox {
  float: left;
  width: 30%;
}
.classify2 .list-item .imgBox img {
  border-radius: 50%;
  height: 0.95rem;
}
.classify2 .list .list-item:first-child {
  border-right: 1px solid #ebebeb;
}
.classify2 .list .list-item:first-child .textBox {
  width: 100%;
}
.classify2 .list .list-item:first-child .imgBox {
  width: 100%;
}
.classify2 .list .list-item:first-child p {
  color: #32b287;
}
.classify2 .list .list-item:first-child p.info {
  color: #999;
}
.classify2 .list .list-item:first-child .imgBox img {
  height: 1.28rem;
  width: 80%;
  border-radius: 0;
}
.goods-info .title {
  margin-left: 0.25rem;
  color: #32b287;
  font-size: 0.32rem;
  margin-top: 0.3rem;
}
.goods-info .title span {
  color: #e99f22;
}
.goods-info .list {
  padding: 0.3rem 0.1rem;
  overflow: hidden;
}
.goods-info .list ul li {
  padding: 0 0.1rem;
  float: left;
  width: 30.5%;
}
.goods-info .list ul li img {
  border-radius: 3px;
  width: 100%;
  height: 2.15rem;
}
.goods-info .list ul li .price {
  color: #fa3c00;
  font-size: 0.26rem;
  line-height: 0.5rem;
}
</style>
