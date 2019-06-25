<template>
<div class="search-box">
  <!-- 头部搜索 -->
  <div class="search row" @click="goSearch">
    <div class="select">
        <picker class="weui-btn" @change="PickerChange" :value="indexPicker" :range="array">
          <span class="tri-se"> </span>
          <text type="default">{{array[indexPicker]}}</text>
          <i-icon type="unfold" class="i-icon" />
        </picker>
      </div>
    <i-col span="17" i-class="col-class">
      <i-col span='4'>
        <icon class="search-icon" type="search" size="18"></icon>
      </i-col>
      <i-col span='20'>
        <input type="text" :value="value" v-model="searchVal" placeholder="输入关键字" class="search-input" />
        <div class="van-search__action" @click="reSearch">
          <div>搜索</div>
        </div>
      </i-col>
    </i-col>
  </div>
  <!-- 主体内容区 -->
  <div class="searchCon">
    <!-- 搜索有结果时 -->
    <!-- 店铺列表显示 -->
    <div class="list row goods-info" v-if="isHas">
        <!-- 循环开始 -->
          <div class="list-item" v-for="(item,index) in serachList" :key="index" @click="toStore(item.id)">
            <div class="col span4"><img :src="item.avatar"></div>
            <div class="col span20">
              <p class="price">月销售：{{item.monthly_sale}}</p>
              <p>{{item.name}}</p>
            <div class="fee">
              <span class="start">{{item.label[0]}}</span>
              <span class="deliver">{{item.label[1]}}</span>
              <span class="average">{{item.label[2]}}</span>
            </div>

            </div>
          </div>
    </div>
    <!-- 商品列表显示 -->
    <div class="list row goods-info" v-if="isHas2">
        <!-- 循环开始 -->
          <div class="list-item" v-for="(item,index2) in serachList2" :key="index2" @click="toGoods(item.id)">
            <div class="col span4"><img :src="item.cover"></div>
            <div class="col span20">
              <p class="price">销量：{{item.sales_volume}}</p>
              <p>{{item.name}}</p>
            <div class="price">
              <span class="now">￥{{item.price}}</span>
              <span class="old">￥{{item.market_price}}</span>
            </div>
            </div>
          </div>
    </div>
    <!-- 服务列表显示 -->
    <div class="list row goods-info" v-if="isHas3">
        <!-- 循环开始 -->
          <div class="list-item" v-for="(item,index3) in serachList3" :key="index3" @click="toService(item.id)">
            <div class="col span4"><img :src="item.cover"></div>
            <div class="col span20">
              <p class="price">销量：{{item.sales_volume}}</p>
              <p>{{item.name}}</p>
            <div class="price">
              <span class="now">￥{{item.price}}</span>
              <span class="old">￥{{item.market_price}}</span>
            </div>
            </div>
          </div>
    </div>
    <!-- 加载效果 -->
    <div class="weui-loadmore" v-if="loadMore">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <!-- 搜索结果为空时 -->
    <div class="no-data" v-if="isEmpty">
      <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
      <p> 抱歉,未搜索到“{{ keyWords }}”相关数据 </p>
    </div>
     <div class="no-data" v-if="isEmpty1">
      <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
      <p> 请输入要搜索的内容 </p>
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
      searchVal: '',
      isEmpty: false,
      isEmpty1: true,
      isHas: false,
      isHas2: false,
      isHas3: false,
      keyWords: '',
      serachList: [], // 店铺
      serachList2: [], // 商品
      serachList3: [], // 服务
      type: 'store',
      indexPicker: 0,
      array: ['店铺', '商品', '服务'],
      page: 1,
      loadMore: false
    }
  },
  mounted() {
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
          'https://xiaochengxu.net199.com/public/index.php/api/5b6e8ace0c395',
          {
            version: 'v3.0',
            app_id: 86793718,
            type: that.type,
            key_words: that.searchVal,
            page: that.page
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            var items = response.data.data.list
            console.log(response.data.data.list)
            if (response.data.data.type === 'store') {
              // 判断搜索结果是否存在
              if (items.length == 0) {
                that.isEmpty = true
                that.isEmpty1 = false
                that.isHas = false
                that.isHas2 = false
                that.isHas3 = false
                that.keyWords = that.searchVal
              } else {
                that.isHas = true
                that.isHas2 = false
                that.isHas3 = false
                that.isEmpty1 = false
                that.isEmpty = false
                console.log(response.data.data)
                that.serachList = that.serachList.concat(
                  response.data.data.list
                )
              }
            } else if (response.data.data.type === 'goods') {
              // 判断搜索结果是否存在
              if (items.length == 0) {
                that.isEmpty = true
                that.isHas = false
                that.isHas2 = false
                that.isEmpty1 = false
                that.isHas3 = false
                that.keyWords = that.searchVal
              } else {
                that.isHas2 = true
                that.isHas = false
                that.isHas3 = false
                that.isEmpty1 = false
                that.isEmpty = false
                console.log(response.data.data)
                that.serachList2 = that.serachList2.concat(
                  response.data.data.list
                )
              }
            } else {
              // 判断搜索结果是否存在
              if (items.length == 0) {
                that.isEmpty = true
                that.isHas = false
                that.isHas2 = false
                that.isEmpty1 = false
                that.isHas3 = false
                that.keyWords = that.searchVal
              } else {
                that.isHas3 = true
                that.isHas = false
                that.isHas2 = false
                that.isEmpty1 = false
                that.isEmpty = false
                console.log(response.data.data)
                that.serachList3 = that.serachList3.concat(
                  response.data.data.list
                )
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
      that.loadMore = false
      // return that.loadMore
    }, 1000)
    console.log(this.page)
  },
  methods: {
    // setData方法
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    PickerChange(e) {
      this.setData({
        indexPicker: e.mp.detail.value // 改变select选择索引值
      })
      console.log(this.indexPicker)
      if (e.mp.detail.value == 0) {
        console.log('000')
        this.setData({
          type: 'store'
        })
      } else if (e.mp.detail.value == 1) {
        console.log('111')
        this.setData({
          type: 'goods'
        })
      } else {
        console.log('222')
        this.setData({
          type: 'service'
          // 给gender添加数据
        })
      }
      console.log(this.type)
    },
    initData() {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b763116a18a9',
          {
            version: 'v3.0',
            app_id: 86793718
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            _this.serachList = response.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    reSearch() {
      var _this = this
      if (_this.searchVal === '') {
        wx.showToast({
          title: '请输入要搜索的内容',
          icon: 'none',
          duration: 1500,
          mask: false
        })
        _this.isHas = false
        _this.isHas2 = false
        _this.isHas3 = false
        _this.isEmpty1 = true
        _this.isEmpty = false
      } else {
        fly
          .get(
            'https://xiaochengxu.net199.com/public/index.php/api/5b6e8ace0c395',
            {
              version: 'v3.0',
              app_id: 86793718,
              type: _this.type,
              key_words: _this.searchVal,
              page: _this.page
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              var items = response.data.data.list
              console.log(response.data.data.list)
              if (response.data.data.type === 'store') {
                // 判断搜索结果是否存在
                if (items.length == 0) {
                  _this.isEmpty = true
                  _this.isEmpty1 = false
                  _this.isHas = false
                  _this.isHas2 = false
                  _this.isHas3 = false
                  _this.keyWords = _this.searchVal
                } else {
                  _this.isHas = true
                  _this.isHas2 = false
                  _this.isHas3 = false
                  _this.isEmpty1 = false
                  _this.isEmpty = false
                  console.log(response.data.data)
                  _this.serachList = response.data.data.list
                }
              } else if (response.data.data.type === 'goods') {
                // 判断搜索结果是否存在
                if (items.length == 0) {
                  _this.isEmpty = true
                  _this.isHas = false
                  _this.isHas2 = false
                  _this.isEmpty1 = false
                  _this.isHas3 = false
                  _this.keyWords = _this.searchVal
                } else {
                  _this.isHas2 = true
                  _this.isHas = false
                  _this.isHas3 = false
                  _this.isEmpty1 = false
                  _this.isEmpty = false
                  console.log(response.data.data)
                  _this.serachList2 = response.data.data.list
                }
              } else {
                // 判断搜索结果是否存在
                if (items.length == 0) {
                  _this.isEmpty = true
                  _this.isHas = false
                  _this.isHas2 = false
                  _this.isEmpty1 = false
                  _this.isHas3 = false
                  _this.keyWords = _this.searchVal
                } else {
                  _this.isHas3 = true
                  _this.isHas = false
                  _this.isHas2 = false
                  _this.isEmpty1 = false
                  _this.isEmpty = false
                  console.log(response.data.data)
                  _this.serachList3 = response.data.data.list
                }
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    toStore(option) {
      wx.redirectTo({
        url: '/pages/storeInfo/index?store_id=' + option
      })
    },
    toGoods(option) {
      wx.redirectTo({
        url: '/pages/goodsInfo/index?goods_id=' + option
      })
    },
    toService(option) {
      wx.redirectTo({
        url: '/pages/goodsInfo/index?goods_id=' + option
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
  padding-left: 165rpx;
  position: relative;
}
.search .select {
  width: 18%;
  position: absolute;
  top: 10rpx;
  left: 40rpx;
  font-size: 0.32rem;
  color: #32b287;
  border-right: 1px solid #a4a4a6;
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
  padding: 0.1rem 0.1rem;
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
.searchCon {
  padding: 0.3rem 0;
}
.searchCon .no-data {
  text-align: center;
  padding: 0.5rem;
}
.searchCon .no-data img {
  width: 360rpx;
  height: 360rpx;
}
.searchCon .no-data p {
  margin: 0.4rem 0;
  font-size: 0.32rem;
  color: #a4a4a6;
}
.searchCon .list .list-item {
  display: block;
  padding: 0.2rem;
  overflow: hidden;
  border-bottom: 1px solid #ebebeb;
}
.searchCon .list .list-item img {
  float: left;
  width: 1.25rem;
  height: 1.25rem;
}
.col {
  float: left;
}
.searchCon .list .list-item .span4 {
  width: 18%;
}
.searchCon .list .list-item .span20 {
  width: 78%;
  margin-left: 0.25rem;
}
.searchCon .list .list-item .span20 p {
  height: 0.35rem;
  color: #393a3f;
  font-size: 0.32rem;
}
.searchCon .list .list-item .span20 p.price {
  height: auto;
  color: #666;
  font-size: 0.26rem;
  text-align: right;
  width: 40%;
  float: right;
  margin-top: 0.4rem;
}
.searchCon .list .list-item .span20 .fee {
  width: 75%;
  margin-top: 0.3rem;
}
.searchCon .list .list-item .span20 .fee span {
  background: #a2d707 none repeat scroll 0 0;
  border-radius: 0.07rem;
  color: #fff;
  content: inherit;
  font-size: 0.26rem;
  margin-right: 0.25rem;
  padding: 0rem 0.14rem;
}
.searchCon .list .list-item .span20 .fee .deliver {
  background: #69bef4 none repeat scroll 0 0;
}
.searchCon .list .list-item .span20 .fee .average {
  background: #fa8385 none repeat scroll 0 0;
}
.searchCon .list .list-item .span20 .price {
  text-align: left;
  margin-top: 10px;
}
.searchCon .list .list-item .span20 .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: #f01414;
}
.searchCon .list .list-item .span20 .price .old {
  font-size: 10px;
  color: #93999f;
  text-decoration: line-through;
}
</style>
