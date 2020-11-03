<template>
  <div class="textdemo">
    <div class="header">
      <div @click="goBack" class="iconfont back">&#xe624;</div>
      <h2>顺序练习</h2>
    </div>
    <div class="title" v-for="(book,index) in booktest" :key="book.id">
      <div v-if="currentdemo===index">
        <div class="title-header">
          <p>
            <span v-if="book.type==1" class="type1">判断</span>
            <span v-if="book.type==2">单选</span>
            {{index+1}}-{{book.title}}
          </p>
        </div>
        <!-- :class="{ 'active':isActive==book.title&&current==index}" -->
        <ul>
          <li
            v-for="(b,i) in book.content"
            @click="choose(book.title,index,i)"
            :key="i"
            :class="{'active-true':book.active&&i==book.i}"
          >{{b.title}}//{{i}}</li>
        </ul>
        <p v-show="book.showanswer">答案：{{book.explain}}</p>
        <p>{{book.fen}}///id:{{book.id}}</p>
        <p>-----------------------------------------------</p>
        <div class="starts">
          <span :class="{active:book.start}" @click="Collection(index)">收藏</span>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="prex()" class="btn-l">上一题</button>
      <button @click="next()" class="btn-r">下一题</button>
    </div>

    <p>{{num}}</p>
    <!-- <p>{{currentdemo+1}}/{{booktest.length}}</p> -->

    <van-cell
      class="vant-num"
      is-link
      :title="currentdemo+1+'/'+booktest.length+'  '+trueAnswer"
      @click="show = true"
    />
    电量：{{dianliang*100}}%
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      url:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAiCAMAAADYiy+9AAAANlBMVEUAAAAkwn0kw30kwnwkwn0kw30ixH4jxH0hwXwkwnwkw34lwnwhwH0jxH0jw3wkw34lwn4kwn06OdIGAAAAEXRSTlMA+rPz62FaIRagy309PMuAoG3ulrYAAACeSURBVEjHpdVJDgIxDETRsjOnB6j7Xxah3nQEQiT19vXlnXFT07NH408Wz5Yqvtnd+Cfz/WNenFO8YJADJ4WMmwcXbMNeKmQuyte+BC4KBW/OZQ4ABwXHdYB0QjUKrCJRktAoaTgp6YiURBglpgaIqAa6GmhqIKmBamIArgYONQBXAyWIAWQ1gE0JqIXhtQkBFOea4b1rAaCm1uNs5QVeB4LE5MsVVQAAAABJRU5ErkJggg==",
      num: 0,
      fen: [],
      isActive: null,
      current: 0,
      point: 0,
      books: [
        {
          title: "逻辑思维",
          content: [
            {
              title: "中等偏上",
              fen: 6
            },
            {
              title: "中等水平",
              fen: 8
            },
            {
              title: "低水平",
              fen: 2
            }
          ]
        },
        {
          title: "计划能力",
          content: [
            {
              title: "选项A",
              fen: 8
            },
            {
              title: "选项B",
              fen: 15
            }
          ]
        },
        {
          title: "执行能力",
          content: [
            {
              title: "选项A",
              fen: 8
            },
            {
              title: "选项B",
              fen: 15
            },
            {
              title: "选项c",
              fen: 15
            }
          ]
        }
      ],
      booktest: [],
      show: false,
      actions: [],
      dianliang: 0,
      trueAnswer: 0,
      arr: [],
      points:2
      // { name: "选项一" }, { name: "选项二" }, { name: "选项三" }
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.testdata();
  //   });
  // },
  beforeMount() {},
  created() {
    // this.GetDataServe();
    // this.test();
    this.testdata();
    this.dianchi();
  },
  computed: {
    currentdemo() {
      return this.num;
    }
  },

  methods: {
    goBack() {
         this.$router.push({name:"SubjectOne",params:{points:this.points}});
    },
    dianchi() {
      var that = this;
      setInterval(() => {
        navigator.getBattery().then(function(battery) {
          // console.log(battery);
          that.dianliang = battery.level;
        });
      }, 2000);
    },
    onSelect(item, index) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      // Toast(item.name);
      console.log(item, index);
      this.num = index;

      console.log(this.current);
    },
    testdata() {
      for (let i = 0; i < 51; i++) {
        this.$http(
          //   &page=${this.page}&maxSize=${this.maxSize}
          `http://m.jxedt.com/mnksnew/g.asp?id=${i}`
        ).then(res => {
          // console.log(res.data);
          if (res.data.type == "2") {
            this.booktest.push({
              title: res.data.question,
              content: [
                { title: "A、" + res.data.an1 },
                { title: "B、" + res.data.an2 },
                { title: "C、" + res.data.an3 },
                { title: "D、" + res.data.an4 }
              ],
              fen: res.data.answertrue,
              id: res.data.id,
              type: res.data.type,
              start: false,
              showanswer: false,
              active: false,
              explain: res.data.explain,
              i: 0,
              collection: false //收藏
            });
          } else if (res.data.type == "1") {
            this.booktest.push({
              title: res.data.question,
              content: [{ title: "A、" + "正确" }, { title: "B、" + "错误" }],
              fen: res.data.answertrue,
              id: res.data.id,
              type: res.data.type,
              start: false,
              active: false,
              showanswer: false,
              i: 0,
              explain: res.data.explain,
              collection: false //收藏
            });
          }
        });
      }
      console.log(this.booktest);

      setTimeout(() => {
        // console.log(this.booktest.length);
        for (let j = 0; j < this.booktest.length; j++) {
          // console.log(j);
          this.actions.push({ name: j + 1 });
        }
        console.log(this.booktest.length);
      }, 1000);

      //  let list=JSON.parse(JSON.stringify(this.booktest))
      // console.log(JSON.stringify(this.booktest));
    },
    GetDataServe() {
      this.$http(
        //   &page=${this.page}&maxSize=${this.maxSize}
        `http://m.jxedt.com/mnksnew/g.asp?id=256`
      ).then(res => {
        console.log(res.data);

        this.books.push({
          title: res.data.question,
          content: [
            { title: res.data.an1 },
            { title: res.data.an2 },
            { title: res.data.an3 },
            { title: res.data.an4 }
          ],
          fen: res.data.answertrue
        });
        this.books.forEach((item, i) => {
          console.log(item, i);
          this.actions.push({ name: i + 1 });
        });
        console.log(this.actions);
      });
    },
    test() {
      this.books.forEach((item, index) => {
        console.log(item, index);
      });
    },
    next: function() {
      if (this.num < this.booktest.length - 1) {
        this.num += 1;
      }
      this.points+=2
      // console.log(this.num);
    },
    prex: function() {
      if (this.num === 0) {
        this.num = 0;
      } else {
        this.num -= 1;
      }
      console.log(this.arr);
    },
    choose: function(title, index, i) {
      // console.log(title, index);
      // console.log(this.booktest);

      this.isActive = title;
      this.current = index;
      // i是选项下标 index是题目下标
      console.log(this.current, index, i);
      console.log(this.booktest[index].fen);
      console.log(this.booktest[index].id);

      for (let k = 0; k < this.booktest.length; k++) {
        // console.log(this.booktest[k].tite);
        // console.log(index);
        this.booktest[index].showanswer = true;

        this.booktest[index].i = i;

        if (index + 1 == this.booktest[k].id) {
          console.log("id相同");
          if (i + 1 == this.booktest[index].fen) {
            console.log("正确");
            this.trueAnswer += 1;
            this.booktest[index].active = true;
          }
        }
        //  console.log(this.trueAnswer);
      }
      // this.fen[this.num] = this.books[this.num].content[index].fen;
    },
    Collection(index) {
      console.log(index);
      console.log(
        this.booktest[index].content[this.booktest[index].fen - 1].title
      );
      if (!this.booktest[index].collection) {
        this.booktest[index].collection = true;
        this.arr.push({
          title: this.booktest[index].title,
          explain: this.booktest[index].explain,
          answer: this.booktest[index].content[this.booktest[index].fen - 1].title,
          type:this.booktest[index].type
        });
      } else {
        this.booktest[index].collection = false;
        console.log("删除");
      }

      localStorage.setItem("收藏", JSON.stringify(this.arr));
    }
  }
};
</script>

<style lang="scss" scoped>
.textdemo {
  height: 100vh;
  padding: 0 10px;
  box-sizing: border-box;
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
  .starts {
    position: fixed;
    bottom: 60px;
    left: 18px;
    font-size: 14px;
  }

  .title {
    margin-top: 10px;
    & > div > p {
      font-size: 20px;
      line-height: 22px;
    }
    & > div > ul {
      margin-top: 12px;
      font-size: 18px;

      li {
        padding: 8px 0;
        line-height: 27px;
      }
    }

    .title-header {
      p {
        line-height: 24px;
        color: #333;
        font-size: 20px;
      }
      span {
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

  .btn {
    position: fixed;
    bottom: 100px;
    right: 20px;

    button {
      background-color: #07a5ff;
      padding: 10px 12px;
      font-size: 12px;
      border-radius: 15px;
      color: #fff;
    }

    .btn-l {
      margin-right: 20px;
    }
  }

  .vant-num {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    .van-cell__title {
      // color: red;
    }
  }

  .van-popup {
    display: flex;
    flex-wrap: wrap;

    & > button {
      width: 15%;
    }
  }
  .active-true {
    color: rgb(29, 172, 249);
  }
  .active-false {
    color: rgb(255, 70, 72);
  }
}
</style>