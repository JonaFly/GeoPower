import Request from '../utils/request.js'

// 获取用户列表
export function getUserList () {
	return Request(null, '/user/list', 'get')
}
// 修改用户信息
export function updateUserInfo(userInfo) {
	return Request(userInfo, '/user/update', 'post')
}

// 获取监控端手机号
export function getJKphone(phone) {
	return Request(null, '/user/getPidPhone/' + phone, 'get')
}

// 获取eth账号
export function getEthAccount() {
	return Request(null, '/streamr/creatEthUser', 'get')
}
