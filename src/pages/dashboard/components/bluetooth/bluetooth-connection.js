import { showBlueToothErrorMassage } from './bluetooth-error.js'

/**
 * 连接低功耗蓝牙设备。
 * @param {*} deviceId 蓝牙设备id
 * @returns
 */
export function createConnection(deviceId) {
  return new Promise((resolve, reject) => {
    uni.createBLEConnection({
      deviceId,
      timeout: 1000 * 30,
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
 *  断开与低功耗蓝牙设备的连接。
 * @param {*} deviceId 蓝牙设备id
 * @returns
 */
export function closeConnection(deviceId) {
  return new Promise((resolve, reject) => {
    uni.closeBLEConnection({
      deviceId,
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
