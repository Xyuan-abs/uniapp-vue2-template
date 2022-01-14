import { showBlueToothErrorMassage } from './bluetooth-error.js'

/**
 *  开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，请在搜索并连接到设备后调用 uni.stopBluetoothDevicesDiscovery 方法停止搜索。
 * @returns
 */
export function startSearchBlueTooth() {
  return new Promise((resolve, reject) => {
    uni.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      interval: 1000,
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        console.log(err)
        showBlueToothErrorMassage(err)
        reject(err)
      },
    })
  })
}

/**
 *  停止搜寻附近的蓝牙外围设备。
 * @returns
 */
export function stopSearchBlueTooth() {
  return new Promise((resolve, reject) => {
    uni.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        console.log(err)
        showBlueToothErrorMassage(err)
        reject(err)
      },
    })
  })
}

/**
 * 监听寻找到新设备的事件
 * @param {*} callback 搜索到蓝牙设备后执行的回调函数  参数为搜索到的设备列表
 */
export function onBluetoothDeviceFound(callback) {
  uni.onBluetoothDeviceFound(function (res) {
    let devices = res.devices

    // 过滤 没有名字的设备
    devices = devices.filter((d) => d.name)

    callback(devices)
  })
}

/**
 *  获取在蓝牙模块生效期间所有已发现的蓝牙设备。
 * @returns
 */
export function getBluetoothDevices() {
  return new Promise((resolve, reject) => {
    uni.getBluetoothDevices({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log(err)
        showBlueToothErrorMassage(err)
        reject(err)
      },
    })
  })
}
