<!-- 
  名称：IndexHead
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="index-head"> {{ title }} </view>
</template>

<script>
export default {
  name: 'IndexHead',
  props: {
    title: {
      type: String,
      default: '111',
    },
  },
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      this.handleEmit()
    }, 2000)
  },
  methods: {
    handleEmit() {
      this.$emit('change')
    },
  },
}
</script>

<style>
.index-head {
  font-family: inherit;
  padding: 20rpx 0;
  text-align: center;
  font-size: 14px;
}
</style>
