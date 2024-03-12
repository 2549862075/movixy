import request from '#/utils/request'
export function getTopMovieList(data) {
	return request({
		url: '/topMovie/getTopMovieList',
		method: 'post',
		data: data
	})
}