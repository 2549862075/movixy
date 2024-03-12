import request from '#/utils/request'
export function getBannerList(data) {
	return request({
		url: '/banner/getBannerList',
		method: 'post',
		data: data
	})
}