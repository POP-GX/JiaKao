<template>
  <div class="video-box">
    <span @click="GoBack">&lt;</span>
    <video :src="url" controls>
    </video>
    <div class="title">
      <h2>{{title}}</h2>
      <p>{{viewCount}}</p>
    </div>

    <div class="video-list">
      <div class="viedeo-list-title">
        <h2>课程目录</h2>
        <p>共{{videoviw.length}}节课</p>
      </div>

      <div class="video-list-item">
        <div v-for="(item,index) in videoviw" :key="item.id" @click="play(index)">
          <img :src="item.imageUrl" />
          <p>{{item.subTitle}}</p>
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>

    <div class="infinite-list-wrapper">
      <h2>全部点评</h2>
      <ul class="list">
        <li v-for="(i,index) in newsList" class="list-item" :key="index">
          <div>
            <img :src="i.avatar" alt />
          </div>
          <div class="list-item-r">
            <p>{{i.name}}</p>
            <p class="location">{{i.location}}</p>
            <p class="title">{{i.title}}</p>
            <img v-if="i.url.length!=0" :src="i.url" />
          </div>
          <!-- <span>{{i.title}}</span>
          <span>{{i.content}}</span>-->
          <!-- {{commentlist[i].author.avatar}} -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      url: "",
      videoviw: [],
      title: "",
      viewCount: 0,
      commentlist: [],
      newsList: [
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2019/12/12/16/a78c060b3dd54eb78efb788c3687a8ff.jpg!100x100",
          name: "内容1",
          location: "东城区",
          title: "xxxxx",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/09/12/22/927e2a60db7b4ed3b067004639a234d7.jpg?_platform=android!100x100",
          name: "内容2",
          location: "东城区",
          title: "xxxxxx",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/05/11/15/ebeb87dbeba246a28b31658ee8e039fa.jpg!100x100",
          name: "内容3",
          location: "东城区",
          title: "ssss",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/09/22/10/b9f3ae57c5ee4bd882aaba8b062ec50f.jpg!100x100",
          name: "内容4",
          location: "东城区",
          title: "ssss",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        },
        {
          avatar:
            "https://avatar-user.mucang.cn/user-avatar/2020/08/03/09/cf5357cb57ca49a2969f062f2fbe084b.jpg!100x100",
          name: "内容5",
          location: "东城区",
          title: "ssss",
          url:
            "https://cheyouquan.image.mucang.cn/saturn-image/2020/09/23/11/50930ada099b4b2fbb4796505e1336c5.jpg!detail"
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params, from);
    // 判断是否存在 不存在则跳回主页
    if (to.params.subTitle == undefined) {
      next({ name: "SubjectOne" });
    }
    next();
  },
  created() {
    this.getdata();
    console.log(this.$route.params.vurl);
    // if(this.$route.params.vurl.length==0){
    //     this.$route.push({name: "SubjectOne"})
    // }
    this.url = this.$route.params.vurl;

    console.log(this.$route.params.subTitle);
    this.title = this.$route.params.subTitle;

    console.log(this.$route.params.viewCount);
    this.viewCount = `${this.$route.params.viewCount}人观看`;
    console.log(this.$route.params.text[0]);
    this.text = this.$route.params.text[0];
  },
  methods: {
    getdata() {
        this.$http(
          `http://sirius.kakamobi.cn/api/open/kejian/lecture-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=22&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440100&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=c4a2a8f063734ec09d440320e513a20e&projectId=2&sign=114efa641547180c4896be0528e333e8`
        ).then(res => {
          console.log(res);
          this.videoviw = res.data.data.itemList[0].lectureDataList;
          console.log(this.videoviw);
        });

      if (this.text == "科目四社区") {
        this.$http(
          `http://sirius.kakamobi.cn/api/open/kejian/lecture-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=26&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440100&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=afca17b3815347df9c121420d149f259&projectId=9&sign=873ea5e20be91d39860acdbbfd9a7ad8`
        ).then(res => {
          console.log(res);
          this.videoviw = res.data.data.itemList[0].lectureDataList;
          console.log(this.videoviw);
        });
      }

      this.$http(
        //   &page=${this.page}&maxSize=${this.maxSize}
        `http://cheyouquan.kakamobi.com/api/open/business/jiakao/course-home6.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=6&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_gpsType=gcj&_cityName=%E5%B9%BF%E5%B7%9E%E5%B8%82&_cityCode=440100&_gpsCity=440100&_longitude=113.434203&_latitude=23.127897&_ipCity=440600&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=e3917336e99149f98bdef0d3192cfa86&_bluetooth=1&_call=1&_cpu=armeabi-v7a&_pad=0&_saturnVersion=13.5&_simulator=0&tagId=28775&cityCode=440100&sign=e665722a6cc520de3635318026f4697001`
      ).then(res => {
        console.log(res);
        // this.subject=res.data.datas
        this.commentlist = res.data.data.topicList;
        console.log(this.commentlist);

        // console.log(this.commentlist.data.topicList);
      });
    },
    play(index) {
      console.log(index);
      // 点击对应的视频
      this.url = this.videoviw[index].videoUrlM;
      // 点击对应的标题
      this.title = this.videoviw[index].subTitle;
      // 点击对应的播放量
      this.viewCount = `${this.videoviw[index].viewCount}人观看`;
    },
    GoBack(){
      this.$router.go(-1)
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
            url: item.imageList[0].detail.url
          });
        }
      });
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.video-box {
  padding: 0 10px;
  box-sizing: border-box;
    &>span{
      position: absolute;
      top: 17px;
      left: 24px;
      color: #fff;
      z-index: 100;
    }
  .title {
    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 14px 0;
    }

    p {
      margin-bottom: 30px;
      color: #999;
    }
  }

  & > video {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
  }
  .video-list {
    h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .viedeo-list-title {
      display: flex;
      justify-content: space-between;
    }

    .video-list-item {
      display: flex;
      overflow-x: auto;
      border-radius: 6px;
      & > div {
        text-align: center;
        margin: 0 8px;

         &>p:nth-of-type(1){
        font-size: 14px;
        margin-bottom: 14px;
        margin-top: 5px;
      }
      }

      & > div:first-of-type {
        margin-left: 0;
      }

      & > div:last-of-type {
        margin-right: 0;
      }

      img {
        width:160px;
        border-radius: 6px;
      }
     
    }
  }

  .infinite-list-wrapper {
    // height: 280px; // 1. 指定高度
    // overflow: auto; // 2. 内容超过指定高度 出现滚动条
    width: 100%;
    // border: 1px solid green;
    padding-bottom: 80px;

    h2 {
      margin: 10px 0;
      font-size: 20px;
      font-weight: 700;
    }
    .list {
      margin-top: 20px;
    }
    .list-item {
      display: flex;
      // background: lightblue;
      margin: 10px;
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
      }

      .list-item-r {
        img {
          width: 100px;
          height: 180px;
        }

        .location {
          font-size: 12px;
          color: #b4b4b4;
        }

        .title {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>