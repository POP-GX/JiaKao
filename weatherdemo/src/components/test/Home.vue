<template>
  <!-- A1,A2,A3,B1,B2,C1,C2,C3,D,E,F 默认C1 -->
  <div>
    <h3>选择车型</h3>
    <div class="select-list">
      <div v-for="(t) in types" @click="toTest(t)" :key="t">
        <i v-if="t=='C1' || t=='C2'" class="iconfont">&#xe612;</i>
        <i v-if="t=='A2' || t=='B2'" class="iconfont">&#xe90a;</i>
        <i v-if="t=='A1' || t=='B1' || t=='A3'" class="iconfont">&#xe66b;</i>
         <p>{{t}}</p>
      </div>
      <!-- <div>C2</div>
      <div>A1</div>
      <div>A2</div>
      <div>A3</div>
      <div>B1</div>
      <div>B2</div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: ["C1", "C2", "A1", "A2", "A3", "B1", "B2"]
    }
  },
  // props: ["type"],
  methods: {
    toTest(t) {
      this.$router.push({ name: "SubjectOne", params: { type: t } });
    }
  }
};
</script>

<style lang="scss" scoped>

.select-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 360px;
  div {
    flex: 0 0 33.33%;
    height: 80px;
  }
}
</style>