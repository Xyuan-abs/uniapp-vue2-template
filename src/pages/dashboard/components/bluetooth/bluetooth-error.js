export const blueToothError = {
  10000: '未初始化蓝牙适配器',
  10001: '当前蓝牙适配器不可用',
  10002: '没有找到指定设备',
  10003: '连接失败',
  10004: '没有找到指定服务',
  10005: '没有找到指定特征值',
  10006: '当前连接已断开',
  10007: '当前特征值不支持此操作',
  10008: '其余所有系统上报的异常',
  10009: 'Android 系统特有，系统版本低于 4.3 不支持 BLE',
}

/**
 * 展示 调用蓝牙api错误 吐司
 * @param {*} err
 * @returns
 */
export function showBlueToothErrorMassage(err) {
  uni.showToast({
    title: blueToothError[err.errCode] || err.errMsg || '未知错误',
    icon: 'error',
    duration: 2000,
  })
}
