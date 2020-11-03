<template>
  <!-- <h2>科目一内容</h2> -->
  <PublicTestf :text="text" :maxSize="maxSize" :showview="showview" :points="points"/>
</template>

<script>
import PublicTestf from "../../views/PublicTest";
export default {
  props: ["showview"],
  data() {
    return {
      text: ["科目四社区"],
      points:0,
      // type: 0,
      maxSize: 1000,
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.params.points);
    if(to.params.points){
      next(vm=>{
      vm.points=to.params.points
    })
    }
    next()
  },
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
  methdos: {
    xxxx(){
      console.log(1111);
      
    },
  },
  components: {
    PublicTestf
  }
};
</script>

<style lang="scss" scoped>
</style>