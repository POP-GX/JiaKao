<template>
  <div class="box">
    <div class="nav">
      <div class="nav-title">
        <div class="gps">{{city}}</div>
        <div class="title">驾考App</div>
        <div class="text">
          <i class="iconfont">&#xe618;</i>
        </div>
      </div>
      <div class="tabs">
        <router-link tag="div" class="tab-item" to="/">科目一</router-link>
        <router-link tag="div" class="tab-item" to="/subjectfour">科目四</router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- <div class="footer">
      <span @click="godemo">home</span>

      <span @click="gofind">find</span>
    </div>-->
  </div>
</template>

<script>
import { MP } from "../../mymap";

export default {
  // props: ["type"],
  data() {
    return {
      ak: "TMEoWZhKtbaCgV30xFvuQEFvh8tyoYKG", //秘钥
      city: "正在定位",
      // type: 0,
      page: 20,
      maxSize: 5,
      Subject: 1,
      showview: false
    };
  },
  created() {
    // console.log(this.$route.params);
    // this.type = this.$route.params.type;
    // console.log(this.type);
    // this.getDataServe()
    // this.getCity();
  },
  methods: {
    getCity() {
      this.$nextTick(() => { 
        MP(this.ak).then(BMap => {
          //在此调用api
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(a => {
            if(a.address.city){
                this.city = a.address.city;
            }else{
              this.city=a.address.province
            }
            
            console.log(a);
          });
        });
      });
    },
    toSequence(showview) {
      // this.$router.push({ name: "testdemo"});
      // this.showview = true;

      console.log(showview);
      // this.showview = showview;
      // this.$emit("toSequence", this.showview);

      // console.log(this.showview);
    },
    godemo() {
      this.$router.push({ name: "SubjectOne" });
    },
    gofind() {
      this.$router.push({ name: "Findcar" });
    },
    getDataServe() {
      this.$http(
        //   &page=${this.page}&maxSize=${this.maxSize}
        `http://de.ylapi.cn/driverexam/query.u?uid=11344&appkey=d99eb6fbc68b9253995c45b20c196b5a&subject=${this.Subject}&type=${this.type}`
      ).then(res => {
        console.log(res);
      });
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm =>{
  //     vm.getCity(); //调用函数获取城市信息
  //   });
  // }

};
</script>

<style lang="scss" scoped>
.box {
  .nav {
    .exact-actived {
      color: #333333;
      font-weight: bold;
    }
    .nav-title {
      display: flex;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      box-sizing: border-box;
      .gps,
      .text {
        flex: 0 0 60px;
        font-size: 14px;
      }
      .text {
        text-align: right;
      }

      .title {
        flex: 1;
        color: #404040;
        font-weight: 700;
        font-size: 16px;
        text-align: center;

        span {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }

    .tabs {
      display: flex;
      font-size: 12px;
      color: #999999;
      div {
        flex: 1;
        padding-bottom: 16px;
        text-align: center;
      }
    }
  }
  
  .footer {
    position: fixed;
    right: 0;
    bottom: -1px;
    left: 0;
    display: flex;
    flex: 1;

    span {
      display: inline-block;
      flex: 1;
      height: 46px;
      line-height: 46px;
      text-align: center;
      z-index: 10;
      border-top: 1px solid silver;
      background-color: #fff;
    }
  }
}
</style>