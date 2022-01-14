/**
 * request.js
 */

/**
 * 合并 请求地址
 * @param {string} url
 * @returns
 */
function mergeUrl(url) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    let baseUrl = process.env.VUE_APP_BASE_API
    return `${baseUrl}${url}`
  }
}

/**
 * method 格式化为 大写
 * @param {string} method
 * @returns
 */
function setMethod(method) {
  return method.toUpperCase()
}

/**
 * 合并 请求参数 (根据项目 自定义请求参数格式)
 * @param {*} data
 * @returns
 */
function mergeData(data) {
  return {
    data: data,
    timestamp: new Date().getTime(),
  }
}

/**
 * 获取 其他配置
 * @param {*} data
 * @returns
 */
function getOtherOptions({
  header,
  timeout,
  dataType,
  responseType,
  sslVerify,
  withCredentials,
  firstIpv4,
} = {}) {
  return {
    header: mergeHeader(header),
    timeout,
    dataType,
    responseType,
    sslVerify,
    withCredentials,
    firstIpv4,
  }
}

/**
 * 合并 请求header
 * @param {*} header
 * @returns
 */
function mergeHeader(header = {}) {
  let globalHeader = {
    'Content-Type': 'application/json',
    token: '123456',
    language: 'zh-Hans-CN',
  }

  let result = Object.assign({}, globalHeader, header)

  return result
}

/**
 * handleSuccess
 * @param {*} resolve
 * @param {*} reject
 * @returns
 */
function handleSuccess(resolve, reject) {
  return function (res) {
    /**
     * 自定义 请求拦截
     *    200:请求正常  500：登录失败  501：token失效
     */
    let code = res.code

    if (code !== 200) {
      let message = res.message || '请求出错了~'
      uni.showToast({
        title: message,
        icon: 'error',
        duration: 2000,
      })
      reject(Promise.reject(new Error(message)))
    } else {
      resolve(res)
    }
  }
}

/**
 * handleError
 * @param {*} resolve
 * @param {*} reject
 * @returns
 */
function handleError(reject) {
  return function (err) {
    uni.showToast({
      title: '网络开小差了~',
      icon: 'error',
      duration: 2000,
    })
    reject(err)
  }
}

/**
 * handleComplete
 * @param {string} taskId
 * @returns
 */
function handleComplete(taskId) {
  return function () {
    // 请求任务队列 移除 该任务
    let index = requestTasks.findIndex((d) => d.taskId === taskId)
    if (index !== -1) {
      requestTasks.splice(index, 1)
    }
  }
}

// 请求任务队列
const requestTasks = []

/**
 * 设置请求任务队列相关
 * @param {object} requestTask 请求任务
 * @param {Promise} requestPromise 请求任务
 * @param {string} requestTaskId  task唯一标识
 */
function setTask(requestTask, requestPromise, requestTaskId) {
  // 设置 task唯一标识
  requestTask.taskId = requestTaskId
  // 添加到 请求队列
  requestTasks.push(requestTask)
  // 添加到 promise
  requestPromise.task = requestTask
}

/**
 * 设置 请求任务id
 */
function createTaskId() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

/**
 *  取消所有请求
 */
export function cancelAllRequest() {
  requestTasks.forEach((request) => {
    request.abort()
  })
}

/**
 * 发起网络请求
 * @param {string} url 请求地址
 * @param {string} method 请求方法
 * @param {Object} data 请求参数
 * @param {Object} options 请求配置
 * @returns
 */
export default function request({ url, method, data, options } = {}) {
  let requestTask = null
  let requestTaskId = createTaskId()

  let requestPromise = new Promise((resolve, reject) => {
    // 基础配置
    let baseOptions = {
      url: mergeUrl(url),
      method: setMethod(method),
      data: mergeData(data),
      success: handleSuccess(resolve, reject),
      fail: handleError(reject),
      complete: handleComplete(requestTaskId),
    }
    // 其他配置
    let otherOptions = getOtherOptions(options)
    // 全部配置
    let totalOptions = Object.assign({}, baseOptions, otherOptions)
    // 发起请求
    requestTask = uni.request(totalOptions)
  })

  // 设置请求任务队列相关
  setTask(requestTask, requestPromise, requestTaskId)

  return requestPromise
}
