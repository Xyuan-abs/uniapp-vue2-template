import { showBlueToothErrorMassage } from './bluetooth-error.js'
import { buf2string } from './utils.js'

/**
 * 获取蓝牙设备所有服务(service)
 * @param {string} deviceId 蓝牙设备id
 * @returns promise
 */
export function getBLEServices(deviceId) {
  return new Promise((resolve, reject) => {
    uni.getBLEDeviceServices({
      deviceId,
      success(res) {
        console.log('getBLEDeviceServices', res)
        resolve(res.services)
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
 * 获取蓝牙设备某个服务中所有特征值(characteristic)。
 * @param {string} deviceId 蓝牙设备id
 * @param {string} serviceId 服务id
 * @returns promise
 */
export function getBLECharacteristics(deviceId, serviceId) {
  return new Promise((resolve, reject) => {
    uni.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success(res) {
        console.log('getBLEDeviceCharacteristics', res)
        resolve(res.characteristics)
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
 * 监听低功耗蓝牙设备的特征值变化事件。
 * @param {Function} callback 回调函数 参数为特征值
 */
export function onBLECharacteristicValueChange(callback) {
  uni.onBLECharacteristicValueChange(function (characteristic) {
    // 将特征值value 由 array buffer 转成 字符串

    let valueStr = buf2string(characteristic.value)
    characteristic.valueStr = valueStr

    callback(characteristic)
  })
}

/**
 * 读取低功耗蓝牙设备的特征值的二进制数据值。
 * @param {string} deviceId 蓝牙设备id
 * @param {string} serviceId 服务id
 * @param {string} characteristicId 特征值id
 * @returns promise
 */
export function readBLECharacteristics(deviceId, serviceId, characteristicId) {
  return new Promise((resolve, reject) => {
    uni.readBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      success(res) {
        console.log('readBLECharacteristics', res)
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
 * 向低功耗蓝牙设备特征值中写入二进制数据。
 * @param {string} deviceId 蓝牙设备id
 * @param {string} serviceId 服务id
 * @param {string} characteristicId 特征值id
 * @param { ArrayBuffer} value 特征值
 * @returns promise
 */
export function writeBLECharacteristics(deviceId, serviceId, characteristicId, value) {
  return new Promise((resolve, reject) => {
    uni.writeBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId,
      value,
      success(res) {
        console.log('writeBLECharacteristics', res)
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
