<template>
  <div class="collention">
    <div class="header">
      <div @click="goBack" class="iconfont back">&#xe624;</div>
      <h2>收藏</h2>
    </div>
    <div class="coll-item" v-for="(item,index) in datademo" :key="index">
      <h2><span v-if="item.type==1">判断</span><span v-if="item.type==2">单选</span>{{index+1}}、{{item.title}}</h2>
      <p>{{item.answer}}</p>
      <p>解析：{{item.explain}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      num:0
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   // next(vm => {
  //   //   // console.log(JSON.parse(localStorage.getItem("收藏")));
  //   //   let arr = JSON.parse(localStorage.getItem("收藏"));
  //   //   vm.data.push(arr);
  //   //   // console.log(JSON.parse(JSON.stringify(vm.data))[0]);
  //   // //  console.log(vm.data[0]);

  //   // });
 
  //   next()
  // },
  activated() {
    // this.collectiondata()
    // let arr = JSON.parse(localStorage.getItem("收藏"));
    //   this.data.push(arr);
    console.log("触发");
    this.collectiondata();
    console.log(this.data);
  },
  created() {
    //   this.data=[...this.data]
    //   console.log();
    //   console.log(JSON.parse(JSON.stringify(this.data)));
    this.collectiondata();
  },
  // updated(){
  //    this.$nextTick(function(){

  //    })
  // },
  methods: {
    collectiondata() {
      this.$nextTick(() => {
        console.log(JSON.parse(localStorage.getItem("收藏")));
        let arr = JSON.parse(localStorage.getItem("收藏"));
        this.data.push(arr);
        this.num=1;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },

  computed: {
    datademo() {
      return this.data[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.collention{
  padding: 0 20px;

  .header{
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

  .coll-item{
    margin-bottom: 24px;
    line-height: 25px;

    h2{
      span{
        width: 39px;
        height: 21px;
        text-align: center;
        line-height: 21px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAiCAMAAADYiy+9AAAANlBMVEUAAAAkwn0kw30kwnwkwn0kw30ixH4jxH0hwXwkwnwkw34lwnwhwH0jxH0jw3wkw34lwn4kwn06OdIGAAAAEXRSTlMA+rPz62FaIRagy309PMuAoG3ulrYAAACeSURBVEjHpdVJDgIxDETRsjOnB6j7Xxah3nQEQiT19vXlnXFT07NH408Wz5Yqvtnd+Cfz/WNenFO8YJADJ4WMmwcXbMNeKmQuyte+BC4KBW/OZQ4ABwXHdYB0QjUKrCJRktAoaTgp6YiURBglpgaIqAa6GmhqIKmBamIArgYONQBXAyWIAWQ1gE0JqIXhtQkBFOea4b1rAaCm1uNs5QVeB4LE5MsVVQAAAABJRU5ErkJggg==)
        //   no-repeat 50%;
        background-color: #07a5ff;
        background-size: 100%;
        margin-right: 4px;
        vertical-align: text-bottom;
        transform: scale(0.83);
        
      }
    }
  }
}
</style>