import request from '@/utils/request.js'

/**
 * 接口测试
 * @param {*} data
 * @returns
 */
export function testRequest(data) {
  return request({
    url: '/api/test',
    method: 'post',
    data,
  })
}
