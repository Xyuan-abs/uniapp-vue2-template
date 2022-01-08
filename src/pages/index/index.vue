<template>
  <view class="index">
    <!-- 搜索 -->
    <view class="direction-row">
      <u-search
        v-model="keyword"
        placeholder="日照香炉生紫烟"
        :show-action="false"
        search-icon="scan"
      ></u-search>
    </view>

    <!-- 轮播图 -->
    <view class="direction-row">
      <swiper-banner />
    </view>

    <!-- 消息 -->
    <u-notice-bar :text="message" bg-color="transparent" font-size="12"></u-notice-bar>

    <!-- 分类入口 -->
    <view class="direction-row">
      <class-nav />
    </view>

    <!-- 列表 -->
    <view class="direction-row">
      <!-- <ins-panel>
        <view class="container">
          <image class="logo" src="/static/logo.png"></image>
          <text class="title">{{ info }}</text>
          <u-button type="primary" :plain="true" text="镂空按钮" @click="nextPage"></u-button>
        </view>
      </ins-panel> -->
    </view>
  </view>
</template>

<script>
import InsPanel from '@/components/InsPanel.vue'

import IndexHead from './components/Head.vue'
import SwiperBanner from './components/SwiperBanner.vue'
import ClassNav from './components/ClassNav.vue'

export default {
  components: { SwiperBanner, ClassNav, IndexHead, InsPanel },
  options: { addGlobalClass: true },
  data() {
    return {
      info: 'Hello',
      keyword: '遥看瀑布挂前川',
      message:
        'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
    }
  },
  onLoad() {},
  methods: {
    nextPage() {
      uni.navigateTo({
        url: '/pages/detail/index',
      })
    },
    handleEmit() {
      this.info = '父组件 触发了emit'
    },
  },
}
</script>

<style lang="scss">
.index {
  padding: 0 20px 20px;
  background-color: transparent;
  overflow: hidden;

  .u-notice-bar {
    padding-left: 0 !important;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    .logo {
      height: 200rpx;
      width: 200rpx;
      margin: 200rpx auto 50rpx auto;
    }
    .title {
      font-size: 36rpx;
      color: #8f8f94;
    }
  }

  .index-head {
    background-color: red;
  }
  index-head {
    margin-bottom: 15px;
  }
}
</style>
