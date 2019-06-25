<template>
  <div class="recruitment-detail">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">

      <div class="reDetailbody">
        <div class="retop">
        <div class="van-row">
         <h1>{{recruitment.name}}</h1>
         <p>{{recruitment.salary}}</p>
         <span>
         <i-icon type="coordinates" size="24" slot="icon" color="#999" />
         {{recruitment.address}}
         </span>
         <span> <i-icon type="time" size="24" slot="icon" color="#999" /> {{recruitment.experience}}</span>
        </div>
         <!-- 横线分隔条 -->
         <div class="gray-border"></div>

         <!-- 职位描述 -->
         <div class="reContent">
           <div class="van-col van-col--24">
            <h1>职位描述</h1>
            </div>
            <div v-html="recruitment.content">
            </div>
         </div>

        </div>

      </div>

    </div>
  </div>
    <!-- 进行预约 -->
    <div class="footer-cart">
        <button class="doreservat" @click="toEnroll(recruitment.id)">报名</button>
    </div>
  </div>
</template>

<script>
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
export default {
  components: {},
  data() {
    return {
      recruitment: {}
    };
  },
  mounted() {
    this.getData();
  },
  created() {},
  methods: {
    toDetail(option) {
      wx.redirectTo({
        url: "/pages/recruitDetail/index?recruitment_id=" + option
      });
    },
    toEnroll(option) {
      wx.redirectTo({
        url: "/pages/recruitApply/index?recruitment_id=" + option
      });
    },
    getData() {
      var id = parseInt(this.$root.$mp.query.recruitment_id);
      console.log(id);
      var _this = this;
      fly
        .get(
          "https://xiaochengxu.net199.com/public/index.php/api/5b77d680e2fdc",
          {
            version: "v3.0",
            app_id: 86793718,
            recruitment_id: id
          }
        )
        .then(function(response) {
          _this.recruitment = response.data.data;
          console.log(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.recruitment-detail .reDetailbody .van-row {
  border-bottom: 1px solid #ebebeb;
  padding: 0.28rem 0.28rem 0.2rem;
}
.recruitment-detail .reDetailbody .van-row h1 {
  font-size: 0.36rem;
  font-weight: 600;
  color: #333;
}
.recruitment-detail .reDetailbody .van-row p {
  color: #fa3c00;
  margin: 0rem;
  font-size: 0.36rem;
}
.recruitment-detail .reDetailbody .van-row span {
  font-size: 0.3rem;
  color: #333;
  margin-right: 0.28rem;
  line-height: 24px;
  margin-bottom: 0.28rem;
}

.recruitment-detail .reDetailbody {
  border: none;
}
.recruitment-detail .reDetailbody img {
  width: 1.862rem;
  height: 1.862rem;
  border-radius: 50%;
}
.recruitment-detail .reDetailbody .van-col--17 {
  height: 1.862rem;
  padding-left: 4%;
}
.recruitment-detail .reDetailbody .van-col--17 h3 {
  color: #333;
  font-size: 0.3rem;
  font-weight: 500;
  margin-bottom: 0;
}
.recruitment-detail .reDetailbody .van-col--17 span {
  color: #32b287;
  font-size: 0.26rem;
  border-radius: 0.07rem;
  border: 1px solid #32b287;
  margin-right: 0.28rem;
  padding: 0.04rem 0.14rem;
}
.recruitment-detail .reDetailbody .van-col--17 p {
  color: #a4a4a6;
  font-size: 0.336rem;
  margin: 0px;
}

.recruitment-detail .reDetailbody .van-col .van-icon-arrow::before {
  font-size: 0.36rem;
  color: #333;
  line-height: 1.862rem;
}

.recruitment-detail .reDetailbody .reContent {
  padding: 0.28rem 0.28rem 0.2rem;
}
.recruitment-detail .reDetailbody .van-col--24 h1 {
  font-size: 0.36rem;
  margin-bottom: 10px;
  color: #333;
}
.footer-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.footer-cart .doreservat {
  background: #32b287;
  color: #fff;
  border: none;
  border-radius: 0;
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
rich-text {
  font-size: 0.3rem;
  color: #8f8f94;
  line-height: 1.5;
}
</style>
