<!-- 
  名称：InsTemplateForComponent  虚拟化组件节点 微信小程序支持自定义class
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="class ins-template"> ins-template </view>
</template>

<script>
export default {
  name: 'InsTemplate',
  components: {},
  props: {},
  options: {
    // 微信小程序中 options 选项
    // multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    // styleIsolation: 'isolated', // isolated | apply-shared| shared  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    // addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  },
  externalClasses: ['class'],
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
.ins-template {
  font-family: inherit;
}
</style>
