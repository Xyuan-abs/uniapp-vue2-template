<!-- 
  名称：InsPanel
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="ins-panel">
    <slot>ins-panel</slot>
  </view>
</template>

<script>
export default {
  name: 'InsPanel',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  onLoad() {}, // 页面
  mounted() {}, // 组件
  methods: {},
}
</script>

<style lang="scss">
.ins-panel {
  font-family: inherit;
  background-color: #fff;
  border-radius: 4px;
}
</style>
