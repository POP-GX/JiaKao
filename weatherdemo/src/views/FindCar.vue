<template>
  <div class="car-box" id="CarBox">
    <!-- <div>
      搜索
      <input type="text" placeholder="搜索汽车" v-model="text" @keyup.enter="SearchCar('#'+text)" />
    </div>-->
    <div class="hot">
      <h2>热门车型</h2>

      <div class="hot-header">
        <div class="hot-item" v-for="(item,index) in logos" :key="item.name" @click="Tabs(index)">
          <img :src="item.icon" />
          <p>{{item.name}}</p>
        </div>
      </div>

      <div class="hot-content">
        <div class="hot-content-item" v-for="(con,point) in lists" :key="point">
          <div v-show="current==0" v-for="(s) in con.one" :key="s.title">
            <img :src="s.img" alt />
            <p>{{s.title}}</p>
          </div>
          <div v-show="current==1" v-for="(s) in con.two" :key="s.title">
            <img :src="s.img" alt />
            <p>{{s.title}}</p>
          </div>
          <div v-show="current==2" v-for="(s) in con.three" :key="s.title">
            <img :src="s.img" alt />
            <p>{{s.title}}</p>
          </div>
          <div v-show="current==3" v-for="(s) in con.four" :key="s.title">
            <img :src="s.img" alt />
            <p>{{s.title}}</p>
          </div>
          <div v-show="current==4" v-for="(s) in con.five" :key="s.title">
            <img :src="s.img" alt />
            <p>{{s.title}}</p>
          </div>
   
        </div>
      </div>

    </div>
    
    <van-index-bar :index-list="newalust" highlight-color="#07a5ff">
      <div class="car-item" v-for="(item) in newalust" :key="item">
        <van-index-anchor :index="item" class="title">{{item}}</van-index-anchor>
        <div
          class="car-list"
          v-for="(count) in carList"
          v-show="item==count.firstletter&&count.img!=''"
          :key="count.name"
        >
          <div>
            <img :src="count.img" alt />
          </div>
          <div>
            <span>{{count.name}}</span>
          </div>
          <!-- <div>1111</div> -->
        </div>
       
      </div>
    </van-index-bar>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
// import Test from './Test'
export default {
  data() {
    return {
      carList: [],
      newalust: [], // 字母
      newimg: [],
      courntIndex: 0,
      text: "",
      current: 0,
      logos: [
        {
          icon: "//image.guazistatic.com/files/brand/1199.png",
          name: "奥迪"
        },
        {
          icon: "//image.guazistatic.com/files/brand/1198.png",
          name: "宝马"
        },
        {
          icon: "//image.guazistatic.com/files/brand/1197.png",
          name: "奔驰"
        },
        {
          icon: "//image.guazistatic.com/files/brand/1196.png",
          name: "本田"
        },
        {
          icon: "//image.guazistatic.com/files/brand/1195.png",
          name: "丰田"
        }
      ],
      lists: [
        {
          one: [
            {
              img:
                "http://img1.bitautoimg.com/autoalbum/files/20171026/141/201710261926102610121127_2.jpg",
              title: "奥迪A6L"
            },
            {
              img: require("../assets/images/aodi2.jpg"),
              title: "奥迪Q8"
            },
            {
              img: require("../assets/images/aodi3.jpg"),
              title: "奥迪TT"
            }
          ]
        },
        {
          two: [
            {
              img: require("../assets/images/bmw1.jpeg"),
              title: "宝马8系"
            },
            {
              img:require("../assets/images/bmw2.jpeg"),
              title: "宝马x7"
            },
            {
              img: require("../assets/images/bmw3.jpg"),
              title: "宝马i8"
            }
          ]
        },
        {
          three: [
            {
              img: require("../assets/images/benchidag.jpeg"),
              title: "奔驰大G"
            },
            {
              img: require("../assets/images/benchis.jpg"),
              title: "奔驰S600"
            },
            {
              img: require("../assets/images/benchiglc.jpg"),
              title: "奔驰GLC"
            }
          ]
        },
        {
          four: [
            {
              img: require("../assets/images/hondacrv.jpg"),
              title: "本田CR-v"
            },
            {
              img:require("../assets/images/hondasiyu.jpg"),
              title: "本田思域"
            },
            {
              img: require("../assets/images/hondayage.jpg"),
              title: "本田雅阁"
            }
          ]
        },
        {
          five: [
            {
              img: require("../assets/images/toyota1.jpg"),
              title: "丰田"
            },
            {
              img: require("../assets/images/toyota2.jpg"),
              title: "奔驰S600"
            },
            {
              img:require("../assets/images/toyota3.jpeg"),
              title: "奔驰GLC"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.GetCarList();
  },

  methods: {
    GetCarList() {
      this.$http("/api/carlist").then(res => {
        // console.log(res.data.data);
        this.carList = res.data.data;
        this.carList.map(ele => {
          this.newalust.push(ele.firstletter);
          // console.log(ele);
          // console.log(this.newalust);
        });
        // console.log(this.carList);
        this.newalust = [...new Set(this.newalust)];
        // console.log(this.newalust);
      });
    },
    Tabs(index) {
      console.log(index);
      this.current = index;  
      // console.log(this.lists[index].two)     
    },
    SearchCar(text) {
      // console.log(1);
      console.log(text);
      // const toElement = document.querySelector(text); // 获取文档中 id="demo" 的元素：
      // toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
  },
  computed: {
    cardemo() {
      return this.carList.filter(t => {
        return t;
      });
    },
    logodemo(){
      return this.lists.filter((i) =>{
       if(this.current==0){
          return i.one
       }
       if(this.current==1){
          return i.two
       }
      })
      // if(this.current==0){
      //     console.log(this.lists[0]);
      //       return this.lists[0].one
      // }
    }
  },
  components: {
    // Test
  }
};
</script>

<style lang="scss" scoped>
.car-box {
  flex: 1;

  .hot {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 14px;

    h2{
      padding: 8px 16px;
      box-sizing: border-box;
      background-color: #f8f8f8;
    }

    .hot-header {
      flex: 1;
      display: flex;
      margin-top: 20px;

      .hot-item {
        flex: 1;
        text-align: center;

        img {
          width: 55px;
          margin-bottom: 8px;
        }

        .active {
          color: red;
        }
      }
    }

    .hot-content {

      img {
        width: 130px;
        height: 86px;
        border-radius: 4px;
      }

      .hot-content-item {
        display: flex;
        justify-content: space-around;
        margin-top: 16px;
        text-align: center;

        p {
          margin-top: 6px;
        }
      }
    }
  }

  .van-index-bar {
    height: 90%;
    width: 100%;
    padding-bottom: 48px;
  }

  .car-item {
    width: 100%;

    .title {
      background-color: #f8f8f8;
      margin-bottom: 12px;

      .van-index-anchor {
        background-color: #f8f8f8;
      }
    }

    .car-list {
      width: 100%;
      display: flex;
      margin-bottom: 24px;
      padding: 0 16px;
      box-sizing: border-box;
      // overflow-y: hidden;
      & > div:nth-of-type(1) {
        flex: 0 0 70px;
        font-size: 0;
        padding-right: 18px;
        box-sizing: border-box;

        img {
          width: 70px;
        }
      }

      & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        flex: 1;
        border-bottom: 1px solid #ebedf0;
      }
    }
  }

  .zimu {
    flex: 0 0 35px;
    text-align: center;

    .zimu-list {
      
      h3 {
        padding: 4px 0;
      }
    }
  }
}
</style>