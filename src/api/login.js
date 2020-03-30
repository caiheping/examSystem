import HttpRequest from '../utils/request'

// 用户登录
export function login (query = {}) {
  return HttpRequest('/user/login', 'POST', query)
}

// 用户退出
export function logout (query = {}) {
  return HttpRequest('/user/logout', 'DELETE', query)
}
