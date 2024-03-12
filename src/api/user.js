import request from '#/utils/request'

// update user
export function updateUser(data) {
	return request({
		url: '/user/updateUser',
		method: 'post',
		data: data
	})
}
//update password
export function updatePassword(data) {
	return request({
		url: '/user/updatePassword',
		method: 'post',
		data: data
	})
}
