<template>
  <div class="scroll-box">
    <h4>{{text}}</h4>
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
</template>

<script>
export default {
    props:["text","newsList","noMore","loading"],
    data(){
        return{
            commentlist:[],
        }
    },
    created(){
        this.getDataServe();
    },
    methods:{
         // 请求评论区接口
    getDataServe() {
      // this.$http(
      //   //   &page=${this.page}&maxSize=${this.maxSize}
      //   `https://v1.alapi.cn/api/avatar?email=418054491`
      // ).then(res => {
      //   console.log(res);
      //   // this.subject=res.data.datas
      // });
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
          // console.log(item);
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
    },
    },
}
</script>

<style lang="scss" scoped>
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
</style>