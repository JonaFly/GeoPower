import Request from '../utils/request.js'

export function login (userInfo) {
	return Request(userInfo, '/user/login', 'post')
}

// 退出登录
export function loginout(userInfo) {
	return Request(userInfo, '/front/user/loginOut', 'post')
}

// 注册
export function register(userInfo) {
	return Request(userInfo, '/user/register', 'post')
}


//忘记密码
export function user_changepwd(query) {
	const data = {
		oldpwd: query.oldpwd,
		newpwd: query.newpwd
	}
	return Request(data, '/user/changepwd', 'post')
}
