import { showBlueToothErrorMassage } from './bluetooth-error.js'

/**
 * 初始化蓝牙模块
 * @returns
 */
export function initBlueToothAdapter() {
  return new Promise((resolve, reject) => {
    uni.openBluetoothAdapter({
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
 *  关闭蓝牙模块。
 * @returns
 */
export function closeBlueToothAdapter() {
  return new Promise((resolve, reject) => {
    uni.closeBluetoothAdapter({
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

/**
 *  获取本机蓝牙适配器状态。
 * @returns
 */
export function getBlueToothAdapterState() {
  return new Promise((resolve, reject) => {
    uni.getBluetoothAdapterState({
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

/**
 * 监听蓝牙适配器状态变化事件
 * @param {*} callback 回调函数
 */
export function onBlueToothAdapterStateChange(callback) {
  uni.onBluetoothAdapterStateChange(function (res) {
    callback(res)
  })
}
