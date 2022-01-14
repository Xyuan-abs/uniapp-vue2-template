<template>
  <view class="index">
    <!-- 搜索 -->
    <view class="direction-row">
      <dashboard-search />
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

    <!-- 蓝牙 -->
    <view class="direction-row">
      <blue-tooth />
    </view>
  </view>
</template>

<script>
import DashboardSearch from './components/DashboardSearch.vue'
import SwiperBanner from './components/SwiperBanner.vue'
import ClassNav from './components/ClassNav.vue'
import BlueTooth from './components/bluetooth/index.vue'

import { testRequest } from '@/api/test'

export default {
  components: { DashboardSearch, SwiperBanner, ClassNav, BlueTooth },
  options: { addGlobalClass: true },
  data() {
    return {
      message:
        'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
    }
  },
  onLoad() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let request = testRequest({ test: 'test' })
      request.then((res) => {
        console.log('%c [ res ]-70', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      })

      // request.task.abort()
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
