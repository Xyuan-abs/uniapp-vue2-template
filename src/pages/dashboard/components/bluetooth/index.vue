<!-- 
  名称：BlueTooth
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="blue-tooth">
    <!-- 操作按钮 -->
    <view class="tools">
      <view class="btn">
        <u-button
          type="primary"
          :disabled="!hasInitBlueToothAdapter"
          :plain="true"
          text="搜索蓝牙"
          @click="startSearch"
        ></u-button>
      </view>
      <view class="btn">
        <u-button
          type="primary"
          :disabled="!hasInitBlueToothAdapter"
          :plain="true"
          text="停止搜索"
          @click="stopSearch"
        ></u-button>
      </view>
    </view>

    <!-- 提示 -->
    <view class="message">
      <span class="message__text"> {{ message }}</span>
      <u-loading-icon size="16" mode="circle" :show="isSearching" color="#909399"></u-loading-icon>
    </view>

    <!-- 蓝牙列表 -->
    <bluetooth-list :list="list" />
  </view>
</template>

<script>
import BluetoothList from './BluetoothList.vue'

import { blueToothError } from './bluetooth-error'
import { initBlueToothAdapter, closeBlueToothAdapter } from './bluetooth-adapter.js'
import {
  startSearchBlueTooth,
  onBluetoothDeviceFound,
  stopSearchBlueTooth,
} from './bluetooth-search.js'

export default {
  name: 'BlueTooth',
  components: { BluetoothList },
  props: {},
  data() {
    return {
      list: [],
      message: '',

      hasInitBlueToothAdapter: false,
      isSearching: false,
    }
  },
  computed: {},
  watch: {},
  onLoad() {}, // 页面
  mounted() {
    this.init()
  },
  beforeDestroy() {
    closeBlueToothAdapter()
  },
  methods: {
    init() {
      // 初始化蓝牙模块
      this.initAdapter()
      // 监听搜索蓝牙设备事件
      this.onDeviceFound()
    },
    // 初始化蓝牙模块
    initAdapter() {
      this.message = '正在初始化蓝牙模块'
      initBlueToothAdapter()
        .then(() => {
          this.hasInitBlueToothAdapter = true
          this.message = '蓝牙模块初始化完成'
        })
        .catch((e) => {
          this.hasInitBlueToothAdapter = false
          this.message = '蓝牙模块初始化出错'
        })
    },
    // 点击开始搜索按钮 开始搜索
    startSearch() {
      this.isSearching = true
      this.list = []

      this.message = '正在搜索附近蓝牙'
      startSearchBlueTooth().catch((e) => {
        this.message = blueToothError[e.errCode] || e.errMsg
        this.isSearching = false
      })
    },
    // 点击停止搜索按钮 停止搜索
    stopSearch() {
      stopSearchBlueTooth().then(() => {
        this.message = '已停止蓝牙搜索'
        this.isSearching = false
      })
    },
    // 监听搜索蓝牙设备事件
    onDeviceFound() {
      onBluetoothDeviceFound((devices) => {
        devices.forEach((d) => {
          // 添加设备到列表  如果列表存在该设备  则更新该设备数据
          let index = this.list.findIndex((v) => v.deviceId === d.deviceId)
          if (index !== -1) {
            this.list.splice(index, 1, d)
          } else {
            this.list.push(d)
          }
        })
      })
    },
  },
}
</script>

<style lang="scss">
.blue-tooth {
  font-family: inherit;
  .tools {
    display: flex;
    .btn {
      & + .btn {
        margin-left: 20px;
      }
    }
  }
  .message {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;

    color: #909399;
    font-size: 14px;

    &__text {
      margin-right: 5px;
    }
  }
}
</style>
