import request from '#/utils/request'
export function getDanmuListByVideoId(params) {
	return request({
		url: '/danmu/getDanmuListByVideoId',
		method: 'get',
		params:params
	})
}