import request from '#/utils/request'
export function getCommentLikeByUserId (params) {
	return request({
		url: '/commentLike/getCommentLikeByUserId',
		method: 'get',
		params: params
	})
}
export function addCommentLike (data) {
	return request({
		url: '/commentLike/addCommentLike',
		method: 'get',
		params: data
	})
}
export function deleteCommentLike (params) {
	return request({
		url: '/commentLike/deleteCommentLike',
		method: 'get',
		params: params
	})
}