/**
 * buffer 转成 str
 * @param {*} buffer
 * @returns
 */
export function buf2string(buffer) {
  let arr = Array.prototype.map.call(new Uint8Array(buffer), (x) => x)
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i])
  }
  return str
}

/**
 *  str 转 ArrayBuffer
 * @param {string} str 字符串value
 * @returns ArrayBuffer
 */
export function string2buf(str) {
  return codeBuffer(strToHexCharCode(str))
}

/**
 * 字符串转16进制
 * @param {string} str
 * @returns code16
 */
export function strToHexCharCode(str) {
  return str
    .split('')
    .map((chart) => '0x' + chart.charCodeAt(0).toString(16))
    .join(',')
}

/**
 * 将16进制转ArrayBuffer
 * @param { code16 } val
 * @returns ArrayBuffer
 */
export function codeBuffer(val) {
  console.log(
    '%c [ val.split(/,0x|0x/g) ]-48',
    'font-size:13px; background:pink; color:#bf2c9f;',
    val.split(/,0x|0x/g).filter((d) => d)
  )
  return new Uint8Array(
    val.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    })

    // val
    //   .split(/,0x|0x/g)
    //   .filter((d) => d)
    //   .map(function (h) {
    //     return parseInt(h, 16)
    //   })
  ).buffer
}
