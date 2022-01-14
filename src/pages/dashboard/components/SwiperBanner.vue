<!-- 
  名称：InsTemplate
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="swiper">
    <u-swiper
      :list="swiperList"
      indicator-style="right: 20px"
      @change="(e) => (currentNum = e.current)"
    >
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ swiperList.length }}</text>
      </view>
    </u-swiper>
  </view>
</template>

<script>
export default {
  name: 'InsTemplate',
  components: {},
  props: {},
  data() {
    return {
      swiperList: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
      ],
      currentNum: 0,
    }
  },
  computed: {},
  watch: {},
  mounted() {}, // 组件
  methods: {},
}
</script>

<style lang="scss">
.swiper {
  font-family: inherit;
  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #ffffff;
      font-size: 12px;
    }
  }
}
</style>
