import request from '#/utils/request'

// 通过视频id获取视频
export function getVideoById(data) {
	return request({
		url: '/video/getVideoById?video_id=' + data,
		method: 'get',
	})
}

//同过视频上映时间和视频的观看次数获取视频
export function getVideoByDataAndViewsNumber(data) {
	return request({
		url: '/video/getVideoByDataAndViewsNumber?time=' + data.time + '&video_type=' + data.video_type+'&offset='+data.offset,
		method: 'get',
	})
}

export function getVideoByUsersPreference(data) {
//分页查询，一排6个
return request({
	url: '/video/getVideoByUsersPreference?preference=' + data.preference + '&video_type=' + data.video_type+'&offset='+data.offset,
	method: 'get',
})
}

export function searchVideo(data) {
	return request({
		url: '/video/searchVideo',
		method: 'get',
		params: data
	})
}