<template>
  <div class="icon-box">
    <div class="header">
      <div @click="goBack" class="iconfont back">&#xe624;</div>
      <h2>图标速记</h2>
    </div>

    <Swiper />
    
    <div v-for="item in iconlist" class="icon-list" :key="item.name">
      <div class="icon-title">
        <h4>{{item.name}}</h4>
        <span class="iconfont" @click="More(item.name)">
          更多
          <i>&#xe612;</i>
        </span>
      </div>
      <div class="icon-item">
        <div class="icon-img">
          <img v-for="i in item.imageList" :src="i" alt :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "../../components/Swiper";
export default {
  data() {
    return {
      iconlist: [],
      reading: true
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "SubjectOne" });
    },
    More(title) {
      this.$router.push({ name: "IconList", params: { ititle: title } });
    }
  },
  created() {
    if (this.reading) {
      this.$http(
        //   &page=${this.page}&maxSize=${this.maxSize}
        `http://sirius.kakamobi.cn/api/open/traffic-icon/group-list.htm?_platform=android&_srv=t&_appName=jiakaobaodian&_product=%E9%A9%BE%E8%80%83%E5%AE%9D%E5%85%B8&_vendor=oppo&_renyuan=XYX&_version=7.8.9&_system=QKQ1.190716.003&_manufacturer=OnePlus&_systemVersion=10&_device=HD1900&_imei=123&_productCategory=jiakaobaodian&_operator=T&_androidId=627cf3117679cbe6&_deviceId=627cf3117679cbe6&_appUser=39d6def38cce4e10a038ce840322a75a&_pkgName=com.handsgo.jiakao.android&_screenDpi=2.625&_screenWidth=1080&_screenHeight=2290&_network=wifi&_launch=2&_firstTime=2020-09-19%2014%3A19%3A16&_apiLevel=29&_rV=29&_rN=ONEPLUS&_oaid=141F49CAB61D1A11CFA4104BE0E55F2C9CB363F939B776A5CDA777A370365CEF&_userCity=440100&_p=&_j=1.0&schoolName=%E6%9C%AA%E6%8A%A5%E8%80%83%E9%A9%BE%E6%A0%A1&schoolCode=-1&_webviewVersion=4.7&_mcProtocol=4.1&_r=13bcfac7e49d43a1bd860a92ea007f57&sign=4b742fc10a693d1f1aa89c6ed4b82a8e`
      ).then(res => {
        console.log(res.data.data);
        this.iconlist = res.data.data.itemList;
        console.log(this.iconlist);
      });
    }
  },
  components: {
    Swiper
  }
};
</script>

<style lang="scss" scoped>
.icon-box {
  padding: 0px 20px;
  .swiper {
    padding: 0;
    margin-bottom: 26px;
  }
  .header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-right: 28px;
    h2 {
      flex: 1;
      text-align: center;
      font-weight: 700;
      font-size: 18px;
    }

    .back {
      flex: 0 0 24px;
      font-size: 24px;
    }
  }

  h4 {
    // padding: 10px 0;
    font-size: 16px;
  }
  .icon-list {
    margin-top: 10px;

    .icon-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      color: #707070;

      span {
        font-size: 14px;

        i {
          color: #d5d5d5;
        }
      }
    }

    .icon-item {

      .icon-img {
        display: flex;
        margin-bottom: 22px;
        
        img {
          width: 80px;
          margin: 10px 9px;
        }

        & > img:nth-of-type(1) {
          margin-left: 0;
        }

        & > img:nth-of-type(4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>