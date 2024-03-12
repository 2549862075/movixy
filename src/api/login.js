import request from '#/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/login_user',
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout_user',
    method: 'get'
  })
}
