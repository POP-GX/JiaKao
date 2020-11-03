<template>
  <!-- <h2>科目一内容</h2> -->
  <PublicTest :text="text" :maxSize="maxSize" :points="points"/>
</template>

<script>
import PublicTest from "../../views/PublicTest";
export default {
  data() {
    return {
      text: ["科目一社区"],
      // type: 0,
      points:0,
      maxSize: 1000,
    };
  },
   beforeRouteEnter(to, from, next) {
    console.log(to.params.points);
    if(to.params.points){
      next(vm=>{
      vm.points=to.params.points
    })
    }
    next()
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from);

  //   // next()
  //   next(vm => {
  //     vm.type = to.params.type;
  //     console.log(vm.type);
  //   });
  // },
  created() {
    //   this.type = this.$route.params.type;
    //   // console.log(this.type);
    // console.log(this.type);
    // this.getDataServe()
  },
  getDataServe() {
    this.$http(
      //   &page=${this.page}&maxSize=${this.maxSize}
      `http://de.ylapi.cn/driverexam/query.u?uid=11344&appkey=d99eb6fbc68b9253995c45b20c196b5a&subject=2&type=${this.type}&maxSize=${this.maxSize}`
    ).then(res => {
      console.log(res);
    });
  },
  components: {
    PublicTest
  }
};
</script>

<style lang="scss" scoped>
</style>