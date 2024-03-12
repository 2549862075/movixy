import request from '#/utils/request'
export function getDanmuListByVideoId(params) {
	return request({
		url: '/danmu/getDanmuListByVideoId',
		method: 'get',
		params:params
	})
}
export function addDanmu(params) {
	return request({
		url: '/danmu/addDanmu',
		method: 'post',
		data:params
	})
}