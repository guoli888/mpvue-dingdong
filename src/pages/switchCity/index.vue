<template>
  <div class="switchCity">
      <div class="letter-box">
        <div class="letter-item" v-for="(item,index) in cities" :key="index" @click="clickLetter(item.key)">
          {{item.key}}
        </div>
      </div>
      <div class="item-key" v-if="isShowLetter">
        {{showLetter}}
      </div>
     <!--内容-->
     <scroll-view scroll-y="true" style="height:603px" @scroll="bindScroll"
 :scroll-into-view="scrollTopId" >
    <div class="top row">
        <div class="title">
          <img src="/static/images/dw.png">
          <span class="">定位城市</span>
        </div>
        <div class="btn">
          <button @click="doClick(nowCity)">{{nowCity}}</button>
        </div>
    </div>
    <div class="city-box">
      <div class="item-box">
        <div class="item-list" v-for="(item,index) in cities" :key="index">
          <div class="list-keyname" :id="item.key">{{item.key}}</div>
          <div class="item-name" v-for="(items,index2) in item.list" :key="index2" @click="doClick(items.name)">
          {{items.name}}
          </div>
        </div>

      </div>
    </div>
    </scroll-view>

  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
import { cities } from './city'
export default {
  components: {},

  data() {
    return {
      cities: [],
      name: '',
      cityLetter: [],
      showLetter: '',
      isShowLetter: false,
      winHeight: 0,
      tHeight: 0,
      bHeight: 0,
      startPageY: 0,
      scrollTopId: '',
      nowCity: '芜湖市'
    }
  },
  mounted() {
    let storeCity = new Array(26)
    const words = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach(item => {
      let firstName = item.pinyin.substring(0, 1)
      let index = words.indexOf(firstName)
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      })
    })
    this.cities = storeCity
    this.setData({
      cities: this.cities
    })
    var sysInfo = wx.getSystemInfoSync()
    var winHeight = sysInfo.windowHeight
    var itemH = winHeight / this.cities.length
    var tempObj = []
    for (var i = 0; i < this.cities.length; i++) {
      var temp = {}
      temp.name = this.cities[i].key
      temp.tHeight = i * itemH
      temp.bHeight = (i + 1) * itemH
      tempObj.push(temp)
    }
    console.log(tempObj)
    this.setData({
      winHeight: winHeight,
      itemH: itemH
    })
    console.log(winHeight)
    console.log(itemH)
  },

  created() {},
  methods: {
    doClick(name) {
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b71004736af1',
          {
            // 请求参数
            version: 'v3.0',
            app_id: '86793718',
            city_name: name
          }
        )
        .then(function(response) {
          // Toast(response.data.msg)
          if (response.data.code === 1) {
            wx.setStorageSync('city_id', response.data.data.id)
            // wx.setStorageSync('store_id', response.data.data.id)
            wx.setStorageSync('city_name', response.data.data.name)
            // window.localStorage.setItem('nowCity', response.data.data.name)
            _this.nowCity = response.data.data.name
            wx.showToast({
              title: '切换成功',
              icon: 'none',
              duration: 1500,
              mask: false
            })
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/index/index'
              })
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
    handleClick() {
      // 返回首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    clickLetter(key) {
      console.log(key)
      var showLetter = key
      this.setData({
        showLetter: showLetter,
        isShowLetter: true,
        scrollTopId: showLetter
      })
      var that = this
      setTimeout(function() {
        that.setData({
          isShowLetter: false
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>
.switchCity .top {
  padding: 0.08rem 0.3rem 0.35rem;
}
.switchCity .top .title {
  color: #a4a4a6 !important;
  font-size: 0.26rem;
  padding: 0.25rem 0 0.1rem;
  line-height: 0.35rem;
}
.switchCity .top .title img {
  width: 0.3rem;
  height: 0.34rem;
  vertical-align: bottom;
  margin-right: 0.07rem;
}
.switchCity .btn {
  width: 1.5rem;
  height: 0.65rem;
  line-height: 0.65rem;
  text-align: center;
  margin-top: 0.3rem;
  font-size: 0.26rem;
}
.switchCity .btn button {
  width: 1.5rem !important;
  height: 0.65rem;
  line-height: 0.65rem;
  display: block;
  margin-left: 0;
  font-size: 0.26rem;
  background: #f5f5f5;
}
.switchCity .van-cell-text button {
  width: 1.5rem;
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
}
.letter-box {
  position: fixed;
  right: 2px;
  top: 45px;
  line-height: 38rpx;
  font-size: 28rpx;
  color: #32b287;
  z-index: 5;
}
.item-name {
  padding: 0.18rem 0.3rem;
  border-bottom: 1px solid #ebebeb;
  font-size: 27rpx;
}
.list-keyname {
  background: #ebebeb;
  padding: 0.1rem 0.3rem;
}
.item-key {
  position: fixed;
  top: 40%;
  left: 36%;
  background: rgba(0, 0, 0, 0.4);
  height: 100px;
  border-radius: 8px;
  width: 100px;
  line-height: 100px;
  color: #fff;
  text-align: center;
  font-size: 25px;
  z-index: 5;
}
</style>
