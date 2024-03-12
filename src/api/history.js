import request from '#/utils/request'
export function getHistoryList(params) {
	return request({
		url: '/history/getHistoryList',
		method: 'get',
		params
	})
}