import request from '#/utils/request'
export function getActorById(params) {
	return request({
		url: '/actor/getActorById',
		method: 'get',
		params:params
	})
}
export function getDirectorById(params) {
	return request({
		url: '/director/getDirectorById',
		method: 'get',
		params:params
	})
}