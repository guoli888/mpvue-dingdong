<template>
  <div class="shop">
    <!-- 头部搜索 -->
    <div class="search row" @click="goSearch">
      <i-col span="24" i-class="col-class">
        <i-col span='3'>
          <icon class="search-icon" type="search" size="18"></icon>
        </i-col>
        <i-col span='21' @click="toSearch">
          <input type="text" :value="value" disabled='true' v-model="searchVal" placeholder="输入关键字在店内搜索" class="search-input" />
          <div class="van-search__action" @click="reSearch">
            <div>搜索</div>
          </div>
        </i-col>
      </i-col>
    </div>

    <div class="gray-border"></div>

    <div class="van-list" v-model="loading" :finished="finished" @load="onLoad">
      <div class="van-row">

        <div class="van-col van-col--12" v-for="(item,index) in goodsList" :key="index">
          <a @click="tomallDetail(item.id)">
            <div class="van-cell van-hairline">
              <div class="van-cell__value van-cell__value--alone">
                <img :src="item.cover">
                <p class="title">{{item.name}}</p>
                <p class="info">{{item.subname}}</p>
                <p class="price">￥{{item.price}}</p>
              </div>
            </div>
          </a>
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
  data () {
    return {
      goodsList: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  created () {},
  mounted () {
    // 执行请求方法
    this.onLoad()
  },
  methods: {
    onLoad () {
      var _this = this
      setTimeout(() => {
        fly
          .get(
            'https://xiaochengxu.net199.com/public/index.php/api/5b7e4bbac0e5a',
          {
            params: {
                version: 'v3.0',
                app_id: '86793718',
                page: '_this.page',
                size: 3
              }
          }
          )
          .then(response => {
            if (response.data.code === 1) {
              console.log(response.data.msg)
              let mallList = response.data.data
              if (Array.isArray(mallList[0])) {
                _this.finished = true
                _this.loading = false
                return false
              }
              if (_this.goodsList) {
                console.log(_this.goodsList)
                _this.goodsList = _this.goodsList.concat(mallList)
              } else {
                _this.goodsList = mallList
              }
              _this.loading = false
              _this.page++
            }
          })
      }, 300)
    },
    tomallDetail (id) {
      wx.navigateTo({
        url: '/pages/goodsInfo/index?goods_id=' + id
      })
    },
    toSearch () {
      wx.navigateTo({
        url: '/pages/search/index'
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
  margin: 0.1rem 0.15rem 0.3rem;
  padding-left: 0.2rem;
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

.van-row {
  margin: 0.35rem 0.2rem !important;
}

.van-col {
  box-sizing: border-box;
  float: left;
}

.van-col--12 {
  margin: 0 1% 0.4rem;
  width: 48%;
  float: left;
}

.van-cell {
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.van-col--12 .van-cell .van-cell__value img {
  border-radius: 0.1rem;
  height: 3.4rem;
  width: 3.4rem;
}

.van-col--12 .van-cell .van-cell__value p {
  color: #000;
  font-size: 0.3rem;
  height: auto;
  line-height: 0.4rem;
  margin: 0;
  overflow: hidden;
}

.van-col--12 .van-cell .van-cell__value p.title {
  margin-top: 0.1rem;
}

.van-col--12 .van-cell .van-cell__value p.info {
  color: #999;
  font-size: 0.28rem;
}

.van-col--12 .van-cell .van-cell__value p.price {
  color: #fa3c00;
}

.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
</style>
