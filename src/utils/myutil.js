//输入2020/3/3
//输出2020-03-03
export function formatDate(date) {
	if (!date) return '';
	date = new Date(date);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}