<template>
  <div class="icon">
    <div class="header">
      <h2 class="title">{{title}}</h2>
      <div class="iconfont back" @click="goback">&#xe611;</div>
    </div>
    <div class="icon-cont">
      <div v-for="item in iconlist" :key="item.id">
        <div class="icon-item">
          <img :src="item.imageUrl" alt />
          <p class="title">{{item.title}}</p>
          <p class="about">相关试题{{item.ke1QuestionList.length}}题</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      iconlist: []
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params, from);
    // 判断是否存在 不存在则跳回主页
    if (to.params.ititle == undefined) {
      next({ name: "IconView" });
    }
    // this.title=to.params.ititle
    next(vm => {
      vm.title = to.params.ititle;
      if (vm.title == "禁令标志") {
        vm.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          `http://sirius.kakamobi.cn/api/open/traffic-icon/icon-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=2&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=b3a2d97f5b544b2fa575dfb03a401d04&groupId=1&sign=e968e48898fbae15b2286c9724ed7de1`
        ).then(res => {
          console.log(res.data.data.itemList);
          vm.iconlist = res.data.data.itemList;
        });
      } else if (vm.title == "警告标志") {
        vm.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          ` http://sirius.kakamobi.cn/api/open/traffic-icon/icon-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=2&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=381b35608a7f4089b6bf00a690c13afa&groupId=2&sign=ac310d92350ab5bfbd9dbc0797199f48`
        ).then(res => {
          console.log(res.data.data.itemList);
          vm.iconlist = res.data.data.itemList;
        });
      }else if (vm.title == "指示标志") {
        vm.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          `http://sirius.kakamobi.cn/api/open/traffic-icon/icon-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=2&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=49b16c4e0f38458083146587afe66ef7&groupId=3&sign=4d8709887878e18fa50861c1a4d2e8f2`
        ).then(res => {
          console.log(res.data.data.itemList);
          vm.iconlist = res.data.data.itemList;
        });
      }
    });
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      console.log(this.title);
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  padding-bottom: 48px;
  .header {
    position: relative;
    .title {
      text-align: center;
      height: 46px;
      line-height: 46px;
      padding-bottom: 6px;
      font-size: 20px;
      color: #333333;
      border-bottom: 1px solid #f4f4f4;
    }

    .back {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 18px;
    }
  }
  .icon-cont {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 50%;
      // flex: 0 0 50%;
      padding: 32px 0;
      text-align: center;

      box-sizing: border-box;
      color: #333333;
      img {
        width: 140px;
      }
      .icon-item {
        padding: 0 25px;
        box-sizing: border-box;
        .title {
          height: 36px;
          margin-top: 14px;
          color: #3b3b3b;
          font-size: 18px;
        }

        .about {
          padding: 8px 10px;
          border: 2px solid #333333;
          border-radius: 12px;
          margin-top: 24px;
        }
      }
    }
    & > div:nth-child(odd) {
      border-right: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;
    }
    & > div:nth-child(even) {
      border-bottom: 1px solid #f4f4f4;
    }
  }
}
</style>