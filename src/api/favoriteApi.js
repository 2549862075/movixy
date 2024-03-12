import request from '#/utils/request'
export function addVideoToFavorite(data) {
	return request({
		url: '/favorite/addVideoToFavorite?userId=' + data.userId + '&videoId=' + data.videoId,
		method: 'get',
	})
}
export function getFavoriteList(params) {
	return request({
		url: '/favorite/getFavoriteList',
		method: 'get',
		params
	})
}
export function deleteFavorite(data) {
	return request({
		url: '/favorite/deleteFavoriteByFavorite_id',
		method: 'get',
		params: data
	})
}