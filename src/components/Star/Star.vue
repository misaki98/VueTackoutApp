<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="item" v-for="(item, index) in starClasses" :key="index"></span>
    <!-- <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    score: Number,
    size: Number
  },
  components: {},
  computed: {
    starClasses() {
      const { score } = this;
      const scs = [];
      const scoreInteger = Math.floor(score);
      for (let i = 0; i < scoreInteger; i++) {
        scs.push("on");
      }
      if ((score - scoreInteger) * 10 >= 5) {
          scs.push('half')
      }
      while (scs.length<5) {
          scs.push('off')
      }
      return scs
    }
  },
  methods: {}
};
</script>
<style lang='less' scoped>
@import "../../common/less/mixins.less";
.star {
  // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        .bg-image("./images/stars/star48_on");
      }

      &.half {
        .bg-image("./images/stars/star48_half");
      }

      &.off {
        .bg-image("./images/stars/star48_off");
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        .bg-image("./images/stars/star36_on");
      }

      &.half {
        .bg-image("./images/stars/star36_half");
      }

      &.off {
        .bg-image("./images/stars/star36_off");
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        .bg-image("./images/stars/star24_on");
      }

      &.half {
        .bg-image("./images/stars/star24_half");
      }

      &.off {
        .bg-image("./images/stars/star24_off");
      }
    }
  }
}
</style>