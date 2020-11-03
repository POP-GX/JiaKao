<template>
  <div
    class="test-box"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="disabled"
    infinite-scroll-immediate="false"
  >
    <!-- 轮播 -->
    <Swiper /> 

    <div class="content">
      <div class="content-item">
        <div @click="toIcon">
          <p class="iconfont">&#xe659;</p>
          <p>图标技巧</p>
        </div>
        <div @click="toIcon">
          <p class="iconfont">&#xe659;</p>
          <p>易错难题</p>
        </div>
      </div>

      <div @click="toSequence">
        <van-circle
          v-model="currentRate"
          size="90px"
          :rate="points?points:0"
          :speed="100"
          :text="Circle"
        />
        <span>顺序练习</span>
      </div>

      <div>
        <van-circle v-model="currentRate2" size="90px" :speed="100" />
        <span>模拟考试</span>
      </div>

      <div class="content-item">
        <div>
          <p class="iconfont">&#xe625;</p>
          <p>速记口诀</p>
        </div>

        <div>
          <p class="iconfont">&#xe625;</p>
          <p @click="toCollection">收藏</p>
        </div>
        <div></div>
      </div>
    </div>

    <div class="line"></div>

    <!-- 视频教学 -->
    <VideoTest :text="text[0]" />

    <div class="line"></div>
    <!-- <CommentCommunity /> -->
    <div class="scroll-box">
      <h4>{{text[0]}}</h4>
      <div class="infinite-list-wrapper">
        <ul class="list">
          <li v-for="(i,index) in newsList" class="list-item" :key="index">
            <div>
              <img :src="i.avatar" alt />
            </div>
            <div class="list-item-r">
              <p class="name">{{i.name}}</p>
              <p class="location">{{i.time}} 来自 {{i.location}}</p>
              <p class="title">{{i.title}}</p>
              <img v-if="i.url.length!=0" :src="i.url" ref="imgs" @click.stop="imgdemo(index)" />
            </div>
          </li>
        </ul>

        <p v-if="loading" class="load">加载中...</p>
        <p v-if="noMore" class="more">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper";
import VideoTest from "../components/VideoTest";
// import ScrollBox from "../components/ScrollBox";
export default {
  props: ["text", "maxSize", "points"],
  // beforeRouteEnter
  data() {
    return {
      nums: 23,
      currentRate: 0,
      currentRate2: 0,
      radio: "1",
      showImg: false,
      showImgUrl: "",
      subject: 0,
      count: 0,
      commentlist: [],
      loading: false,
      newsList: [
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2019/12/12/16/a78c060b3dd54eb78efb788c3687a8ff.jpg!100x100",
          name: "哈拉萨",
          location: "东城区",
          title:
            "科目一97 科目二考两次，90，科目三考两次100，科目四昨天刷了一天的题，感觉时间不够，买了Vip，昨天一夜没睡，刷题，考前还在刷……时间根本不够啊，还好，还...",
          time: "2020/5/15",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/09/12/22/927e2a60db7b4ed3b067004639a234d7.jpg?_platform=android!100x100",
          name: "他们都叫我 大航ge.",
          location: "成都市",
          title:
            "秋天的第一杯奶茶可以没，第一本驾照必须有啊国庆前拿到了驾照，hhh马路杀手要起飞咯。从此多了个男司机马路杀手，感谢宝典哦，感谢vip精简题，感谢考友的鼓励，感...",
          time: "2020/5/15",

          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/29/10/1717a4113ab4433e8fa8c8fef4cf31f6.png!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/05/11/15/ebeb87dbeba246a28b31658ee8e039fa.jpg!100x100",
          name: "用户8430077899",
          location: "北京",
          title: "驾考宝典超级牛🐮科四预测94分真考了我94分！",
          time: "2020/5/15",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/29/09/8372f7c461b94c1ab7aba683959359b0.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/09/22/10/b9f3ae57c5ee4bd882aaba8b062ec50f.jpg!100x100",
          name: "ResSart",
          location: "东城区",
          time: "2020/5/15",
          title: "ssss",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/28/11/576c22c7eb0f41169691da1b8d90fd5c.png!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/08/03/09/cf5357cb57ca49a2969f062f2fbe084b.jpg!100x100",
          name: "内容5",
          location: "东城区",
          time: "2020/5/15",
          title: "ssss",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        }
      ],
      videoList: [],
      lists: [],
      showview: false
    };
  },

  computed: {
    noMore() {
      return this.newsList.length > 5;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    Circle() {
      return this.currentRate.toFixed(0) + "%";
    }
  },

  created() {
    // console.log(this.type, this.maxSize);
    // this.getdataVideo();
    this.getDataServe();
    // console.log(this.type);
    // console.log(this.showview);
  },
  // mounted(){

  // },
  methods: {
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },

    imgdemo(index) {
      // console.log(this.$refs.imgs[index].src);
      this.showImgUrl = this.$refs.imgs[index].src;
      console.log(this.showImgUrl);
    },

    toIcon() {
      this.$router.push({ name: "IconView" });
    },
    toCollection(){
      this.$router.push({ name: "Collection" });
      // console.log(JSON.parse(localStorage.getItem("收藏")));
      
    },
    // 答题页面
    toSequence() {
      if (this.text[0] == "科目一社区") {
        this.$router.push({ name: "Testdemo3" });
      } else if (this.text[0] == "科目四社区") {
        this.$router.push({ name: "Testdemo2" });
      }
      // this.stop()
      // this.showview = !this.showview;
      // console.log(1);
      // this.$emit("toSequence", this.showview);
    },

    // 请求评论区接口
    getDataServe() {
      // this.$http(
      //     //   &page=${this.page}&maxSize=${this.maxSize}
      //     `http://t.yushu.im/v2/movie/us_box`
      //   ).then(res => {
      //     console.log(res);

      //     // console.log(this.commentlist);
      //   });
      if (this.text == "科目一社区") {
        this.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          `http://cheyouquan.kakamobi.com/api/open/business/jiakao/course-home6.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=6&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440600&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=e3917336e99149f98bdef0d3192cfa86&_bluetooth=1&_call=1&_cpu=armeabi-v7a&_pad=0&_saturnVersion=13.5&_simulator=0&tagId=28775&cityCode=440100&sign=e665722a6cc520de3635318026f4697001`
        ).then(res => {
          console.log(res);
          this.commentlist = res.data.data.topicList;
          // console.log(this.commentlist);
        });
      }
      if (this.text == "科目四社区") {
        this.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          `http://cheyouquan.kakamobi.com/api/open/business/jiakao/course-home6.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.375&_screenWidth=1080&_screenHeight=2294&_network=wifi&_launch=31&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440100&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=c4e8cc43b52f49b3adb1437d25c51c41&_bluetooth=1&_call=1&_cpu=armeabi-v7a&_pad=0&_saturnVersion=13.5&_simulator=0&tagId=28805&cityCode=440100&sign=5411376973ae1d0c0294b85d31a0410f01`
        ).then(res => {
          console.log(res);
          this.commentlist = res.data.data.topicList;
          // console.log(this.commentlist);
        });
      }
    },
    loadMore() {
      console.log("加载...");
      this.loading = true;
      setTimeout(() => {
        this.commentlist.forEach(item => {
          console.log(item);
          if (item.imageList.length != 0) {
            this.newsList.push({
              avatar: item.author.avatar,
              name: item.author.name,
              location: item.location,
              title: item.title,
              url: item.imageList[0].detail.url,
              time: new Date(item.author.createTime).toLocaleString()
            });
          }
          this.loading = false;
        });
      }, 1000);
    }
  },

  components: {
    Swiper,
    VideoTest
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "iconfont";
  src: url("../../public/fonts/iconfont.eot");
  src: url("../../public/fonts/iconfont.eot?#iefix") format("embedded-opentype"),
    url("../../public/fonts/iconfont.woff") format("woff"),
    url("../../public/fonts/iconfont.ttf") format("truetype"),
    url("../../public/fonts/iconfont.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.test-box {
  position: relative;
  flex: 1;

  .fade-enter-active,
  .fade-leave-avtive {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .line {
    width: 100%;
    height: 8px;
    background-color: #f1f7f7;
    margin: 8px 0;
  }

  .scroll-box {
    flex: 1;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .scroll-box h4,
  .video h4 {
    padding: 10px 0;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .infinite-list-wrapper {
    // height: 280px;
    // overflow: auto; // 内容超过指定高度 出现滚动条
    width: 100%;
    // border: 1px solid green;
    padding-bottom: 80px;

    .list-item {
      display: flex;
      // background: lightblue;
      margin: 10px;
      padding-top: 10px;
      line-height: 20px;

      div:nth-of-type(1) {
        width: 80px;
        img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }
      }
      div:nth-of-type(2) {
        flex: 1;
        padding-bottom: 14px;
        border-bottom: 1px solid #ebedf0;
      }

      .list-item-r {
        .name {
          font-size: 18px;
          color: #333333;
        }

        .location {
          font-size: 14px;
          color: #b4b4b4;
          margin: 5px 0;
        }

        .title {
          margin: 10px 0;
          color: #333333;
          letter-spacing: 0.5px;
          line-height: 22px;
        }

        img {
          width: 100px;
          height: 180px;
          object-fit: cover;
        }
      }
    }

    .more {
      margin-top: 16px;
    }

    .more,
    .load {
      text-align: center;
    }
  }

  .content {
    display: flex;
    margin: 22px 0;
    justify-content: center;
    align-items: center;
    // height: 90px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      & > div:nth-of-type(2) {
        margin-top: 34px;

        & > p:nth-of-type(1) {
          color: #fe6723;
        }
      }

      & > div {
        p {
          font-size: 20px;
          padding-bottom: 14px;
        }
        & > p:nth-of-type(1) {
          color: #4d9af3;
        }
        & > p:nth-of-type(2) {
          font-size: 14px;
        }
      }
    }
    div {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      margin: 0 7px;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        display: block;
        margin-top: 16px;
      }
    }

    & > div:nth-of-type(2) {
      // background-color: #2eb0fd;
      .van-circle {
        height: 100%;
      }
    }

    & > div:nth-of-type(2),
    & > div:nth-of-type(3) {
      flex: 0 0 90px;
      height: 90px;
      // padding: 20px 0;
      // border-radius: 50%;
      color: #020202;
    }
  }

  .scroll-box {
    // height: 300px;
    // overflow: hidden;
    .scroll-list {
      background-color: skyblue;
    }
  }
}
</style>