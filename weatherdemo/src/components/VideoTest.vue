<template>
  <div class="video">
    <h4>驾考讲堂</h4>
    <div class="video-box">
      <div
        class="video-item"
        v-for="item in videoList"
        :key="item.id"
        @click="toVideo(item.videoUrlM,item.subTitle,item.viewCount,text)"
      >
        <div class="video-img">
          <img :src="item.imageUrl" alt />
          <div class="play">
            <i class="iconfont">&#xe631;</i>
            <span>{{item.viewCount}}</span>
          </div>
        </div>
        <p>{{item.subTitle}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data(){
    return{
      videoList:[],
    }
  },
  created(){
      this.getdataVideo()
  },
  methods:{
        // 请求视频接口
    getdataVideo() {
      if (this.text == "科目一社区") {
        setTimeout(() => {
          this.$http(
            //   &page=${this.page}&maxSize=${this.maxSize}
            ` http://sirius.kakamobi.cn/api/open/kejian/get-random-lecture.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=6&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440600&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=f04ab6644a61416388e294f70ad22408&kemu=1&sign=b28649efc806332043bb9805b48d66ab`
          ).then(res => {
            // console.log(res);
            // this.subject=res.data.datas
            this.videoList = res.data.data.itemList;
            console.log(this.videoList);
          });
        }, 1800);
      }

      if (this.text == "科目四社区") {
        setTimeout(() => {
          this.$http(
            //   &page=${this.page}&maxSize=${this.maxSize}
            `http://sirius.kakamobi.cn/api/open/kejian/get-random-lecture.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=26&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440100&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=ffb9e338053c4ac99836c277b632d133&kemu=4&sign=e049de87f0157766ce9358b4b792e1d4`
          ).then(res => {
            console.log(res);
            // this.subject=res.data.datas
            this.videoList = res.data.data.itemList;
            console.log(this.videoList);
          });
        }, 1800);
      }
    },
     toVideo(url, subTitle, viewCount, text) {
      console.log(url);
      this.$router.push({
        name: "VideoDemo",
        params: {
          vurl: url,
          subTitle: subTitle,
          viewCount: viewCount,
          text: text
        }
      });
    },
  }
};
</script>

<style lang="scss">
.video {
  padding: 0 20px;
  box-sizing: border-box;

  .video-box {
    display: flex;
    overflow-x: auto;

    & > .video-item:first-child {
      margin-left: 0;
    }
    & > .video-item:last-child {
      margin-right: 0;
    }

    .video-item {
      margin: 0 8px;
      font-size: 0;
      .video-img {
        position: relative;
        .play {
          position: absolute;
          display: flex;
          align-items: center;
          bottom: 4px;
          right: 10px;
          color: rgb(245, 245, 245);

          i {
            font-size: 20px;
            margin-right: 3px;
          }

          span {
            font-size: 14px;
          }
        }
      }

      img {
        width: 180px;
        border-radius: 6px;
        z-index: -1;
      }

      p {
        font-size: 14px;
        margin: 10px 0;
        line-height: 18px;
        text-align: center;
      }
    }
  }
}
</style>