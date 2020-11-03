<template>
  <div class="second" v-show="showview">
    <!-- 问卷题 -->
    <!-- <div @click="goBack" class="iconfont back"></div> -->

    <div class="closebtn iconfont" @click="closeview">&#xe605;</div>
    <div v-for="(item,index) in questionList" :key="item.id">
      <!-- 测试 -->
      <div class="test-content" v-show="index== page">
        <div class="content-title">{{index+1}}.{{item.question}}</div>

        <van-radio-group v-model="radio" :value="sss" @change="getRadioVal(index)">
          <van-radio :name="item.answer  + ',' + 1">{{item.opt1}}</van-radio>
          <van-radio :name="item.answer  + ',' + 2">{{item.opt2}}</van-radio>
          <van-radio :name="item.answer  + ',' + 3" v-if="item.opt3">{{item.opt3}}</van-radio>
          <van-radio :name="item.answer  + ',' + 4" v-if="item.opt4">{{item.opt4}}</van-radio>
        </van-radio-group>
        <br />

        <br />
        <div class="btn">
          <div
            class="back"
            @click="toBack(index)"
            v-if="index != 0"
            :class="index == 0 ? 'before-back' : 'back' "
          >上一题</div>
          <div
            class="next"
            @click="toNext(index)"
            v-if="isShow"
            :class="index == 0 ? 'next' : 'before-next'"
          >下一题</div>
        </div>
        <div v-if="showAnswer">正确答案：{{answerArr[index]}} {{item.explain}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props:["showview"],
  data() {
    return {
      points: 0,
      sss:0,
      showAnswer: false,
      // 当前页
      page: 0,
      // 选项
      radio: "1",
      // 题目的id
      ids: [],
      // 分数
      nums: [],
      // 存放每一题的id和num
      questionInfos: [],
      // 当前题目的序号等于当前题目的条数
      isShow: true,
      // 获取问卷数据
      questionList: [],
      type: "C1",
      maxSize: 100,
      answerArr: [],
      radiov: "",
      showview: true
    };
  },
  created() {
    // 接受上一层传来的数据
    this.gender = this.$route.params.gender;
    this.age = this.$route.params.age;
    console.log(this.$route.params);
    // 获取问卷数据
    this.getDataServe();
  },
  // beforeRouteUpdate(to, from) {
  //   console.log(to, from);
  // },
  computed: {
    toggle() {
      return !this.showview;
    }
  },
  methods: {
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    closeview() {
      //  console.log(this.toggle);
      //  this.$emit("close",this.toggle)
      // this.toggle=!this.toggle
      // console.log(1);
      this.$router.push({name:"SubjectFour",params:{points:this.points}});
      // this.showview=!this.showview
    },
    getRadioVal(index) {
      // console.log(this);
      // this.showAnswer = true;
      if(index==this.page){
        this.showAnswer = true;
      }
    },
    getDataServe() {
      this.$http(
        //   &page=${this.page}&maxSize=${this.maxSize}
        `http://de.ylapi.cn/driverexam/query.u?uid=11344&appkey=d99eb6fbc68b9253995c45b20c196b5a&subject=1&type=${this.type}&maxSize=${this.maxSize}`
      ).then(res => {
        console.log(res);

        console.log(res.data.datas);
        this.questionList = res.data.datas;
        console.log(this.questionList);
        this.questionList.forEach(item => {
          // console.log(item.answer);
          this.answerArr.push(item.answer);
        });
      });
    },

    toNext(index) {
      // console.log(2222);
      index++;
      this.showAnswer = false;
      // 做题进度
      this.points=index*10;
      // console.log(this.answerArr);
      // console.log(this.questionInfos);
      // console.log(this.$refs.radio);
      console.log(this.points);
      

      // 判断是否答题，没有则无法跳转到下一题
      if (index === 0) {
        if (
          this.radio.slice(0, 1) === "" ||
          this.radio.slice(0, 1) === undefined
        ) {
          return;
        }
      }

      // 保存答题数据
      let question = { ids: this.radio.slice(2), nums: this.radio.slice(0, 1) };
      this.questionInfos[index] = question;
      //   this.questionInfos.forEach(questionInfo => {
      //     // console.log('questionInfo:[ids: ' + questionInfo.ids + ', nums: ' + questionInfo.nums + '] ');
      //   });
      // 判断已答题目列表是否包含下标为index的题目，有则回显
      if (
        this.questionInfos[index] !== undefined &&
        this.questionInfos[index] !== ""
      ) {
        this.radio =
          this.questionInfos[index].nums + "," + this.questionInfos[index].ids;
      }
      console.log(this.radio);

      this.page++;
      // console.log(this.page);

      // 6. 其他（如按钮隐藏）
      // 当前页等于最后一题 下一题按钮隐藏
      if (this.page == this.questionList.length - 1) {
        return (this.isShow = false);
      } else {
        return (this.isShow = true);
      }
    },

    // 点击上一题
    toBack(index) {
      index--;
      //  从已回答列表中获取答题数据，回显
      this.radio =
        this.questionInfos[index].nums + "," + this.questionInfos[index].ids;
      //  保存答题数据
      let question = { ids: this.radio.slice(2), nums: this.radio.slice(0, 1) };
      this.questionInfos[index] = question;

      this.page--;
      if (this.page == this.questionList.length - 1) {
        return (this.isShow = false);
      } else {
        return (this.isShow = true);
      }
    }
  }
};
</script>

<style lang="scss">
.second {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 15;
  padding: 10px 10px 0 10px;
  background-color: #fff;
  
  .van-radio-group {
    margin-top: 10px;
    height: 110px;
  }

  .closebtn {
    margin-bottom: 10px;
    font-size: 20px;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    
    & > div {
      margin: 0 10px;
    }
  }
}
</style>
