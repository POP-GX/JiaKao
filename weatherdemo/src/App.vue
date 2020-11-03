<template>
  <div id="app">
    <transition :name="RouterTrans">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <div class="footer">
      <router-link tag="div" class="iconfont" to="/">
        <i class="iconfont">&#xe622;</i>
        <span>Home</span>
      </router-link>

      <router-link tag="div" class="iconfont" to="/findcar">
        <i class="iconfont">&#xe613;</i>
        <span>Find</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      page: 20,
      maxSize: 5,
      Subject: 1,
      obj: "",
      RouterTrans:""
    };
  },
  components: {},
  created() {
    // this.test();
  },
   watch: {
    $route(to,from) {
      // console.log(to);

      if (to.meta.num > from.meta.num) {
        this.RouterTrans= "RouterTransR";
      } else {
        this.RouterTrans= "RouterTransL";
      }
      
    }
  },
  methods: {
    test() {
      this.$http(
        `http://de.ylapi.cn/driverexam/query.u?uid=11344&appkey=d99eb6fbc68b9253995c45b20c196b5a&subject=${this.Subject}&type=C1&page=${this.page}&maxSize=${this.maxSize}`
      ).then(res => {
        console.log(res);
      });
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
  update(){
    console.log(JSON.parse(localStorage.getItem("收藏")));
    console.log(1);
    
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 640px;
  margin: 0 auto;
  color: #2c3e50;
  .RouterTransL-enter {
    transform: translateX(0px);
  }
  .RouterTransL-leave {
    transform: translateX(-100%);
  }
   .RouterTransR-enter {
    transform: translateX(100%);
  }
  .RouterTransR-leave {
    transform: translateX(100%);
  }

  .RouterTransL-enter-active,
  .RouterTransL-leave-active,
  .RouterTransR-enter-active,
  .RouterTransR-leave-active {
    /*元素进入整个过程中 类名*/
    transition: all 0.3s linear;
  }
  .RouterTransL-leave-to {
    transform: translateX(-100%);
  }
  .RouterTransL-enter-to {
    transform: translateX(-100%);
  }
   .RouterTransR-leave-to {
    transform: translateX(100%);
  }
  .RouterTransR-enter-to {
    transform: translateX(100%);
  }
  .footer {
    position: fixed;
    right: 0;
    bottom: -1px;
    left: 0;
    display: flex;
    flex: 1;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      height: 48px;
      text-align: center;
      z-index: 10;
      border-top: 1px solid silver;
      background-color: #fff;

      i {
        font-size: 20px;
        margin-bottom: 4px;
      }
    }

    .exact-actived {
      color: #07a5ff;
    }
  }
}
</style>


