<!-- 
  名称：BluetoothList
  版本：1.0.0 
  作者：Xyuan
  时间：2022年1月6日11:54:33
 -->
<template>
  <view class="bluetooth-list">
    <!-- 蓝牙设备列表 -->
    <view v-for="(d, i) in list" :key="i" class="bluetooth-list__item" @click="connectBluetooth(d)">
      <text>{{ d.name }}</text>
      <text>{{ d.RSSI }}</text>
    </view>
  </view>
</template>

<script>
import { stopSearchBlueTooth } from './bluetooth-search.js'
import { createConnection, closeConnection } from './bluetooth-connection'
import {
  getBLEServices,
  getBLECharacteristics,
  onBLECharacteristicValueChange,
  readBLECharacteristics,
  writeBLECharacteristics,
} from './bluetooth-transmission'

import { string2buf } from './utils'

export default {
  name: 'BluetoothList',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      deviceId: '',
      serviceId: '',
      readId: '',
      writeId: '',
      notifyId: '',
    }
  },
  computed: {},
  watch: {},
  onLoad() {}, // 页面
  mounted() {
    this.init()
  }, // 组件
  beforeDestroy() {
    closeConnection()
  },
  methods: {
    init() {
      // 监听特征值改变事件 所有数据都通过这个来获取
      onBLECharacteristicValueChange((characteristic) => {
        console.log(
          `characteristic ${characteristic.characteristicId} has changed, now is ${characteristic.valueStr}`
        )
      })
    },
    /* 连接蓝牙 */
    connectBluetooth(bluetooth) {
      // 停止蓝牙搜素
      stopSearchBlueTooth()

      // 连接指定蓝牙
      // 1.连接蓝牙
      const deviceId = (this.deviceId = bluetooth.deviceId)
      let serviceId = ''
      createConnection(deviceId)
        .then(() => {
          // 2.获取蓝牙设备的服务
          return getBLEServices(deviceId)
        })
        .then((services) => {
          // 3.获取蓝牙设备的服务 对应的 特征值
          let service = services.find((d) => d.isPrimary)
          if (service) {
            serviceId = this.serviceId = service.uuid
            return getBLECharacteristics(deviceId, serviceId)
          }
        })
        .then((characteristics) => {
          // 4. 保存 readId 、writeId 、notifyId 并注册 notifyBLECharacteristicValueChange监听事件
          for (let i = 0; i < characteristics.length; i++) {
            let item = characteristics[i]

            if (item.properties.read) {
              this.readId = item.uuid
            }
            if (item.properties.write) {
              this.writeId = item.uuid
            }
            if (item.properties.notify) {
              this.notifyId = item.uuid
            }
            if (item.properties.notify || item.properties.indicate) {
              uni.notifyBLECharacteristicValueChange({
                deviceId,
                serviceId,
                characteristicId: item.uuid,
                state: true,
              })
            }
          }
        })
        .catch((e) => {
          closeConnection()
        })
    },
    /* 发送指令 */
    writeMsg() {
      // 要传的 ArrayBuffer 数据
      const value = string2buf('111')

      // BLE数据包传输规定了一次只能传输20byte，所以如果数据量较大，需要做分包传输处理
      let chunkCount = Math.ceil(value.length / 20)
      let packageList = []

      for (let i = 0; i < chunkCount; i++) {
        packageList.push(`${chunkCount}${i}${value.slice(i * 20, 20)}`) //chunkCount 表示总共多少包，i表示当前是第几个包

        setTimeout(function () {
          writeBLECharacteristics(this.deviceId, this.serviceId, this.writeId, packageList[i])
        }, 20)
      }
    },
    /* 读取信息 */
    readMsg() {
      readBLECharacteristics(this.deviceId, this.serviceId, this.readId)
    },
  },
}
</script>

<style lang="scss">
.bluetooth-list {
  font-family: inherit;
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 15px;
    border: 1px solid $u-border-color;
    margin-top: 12px;
    border-radius: 4px;

    font-size: 14px;
  }
}
</style>
