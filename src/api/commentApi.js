import request from '#/utils/request'
export function getCommentByVideoId(params) {
	return request({
		url: '/comment/getCommentByVideoId',
		method: 'get',
		params
	})
}
export function addComment(data) {
	return request({
		url: '/comment/addComment',
		method: 'post',
		data
	})
}