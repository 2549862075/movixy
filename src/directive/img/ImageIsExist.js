/**
 * @description
 * @param {string} v-image (yes) 图片地址
 * @param {string} default-img (no) 预加载占位图
 * @param {string} error-img (no)   加载错误占位图
 * @example
 *         <img v-image="cover" :default-img=""  :error-img="">
 */


/**
 * @description 检测图片地址是否有效
 * @param url
 */
const imageIsExist = function(url) {
	return new Promise((resolve, reject) => {
			const image = new Image()
			image.onload = function() { // 图片地址有效
					if (this.complete === true) {
							resolve(image)
					}
			}
			image.onerror = function() { // 图片加载失败
					reject('could not load image')
			}
			image.src = url
	})
}

export default function(el, binding, vnode, oldVnode) {
	let placeholderImage = new URL('../../assets/placeholder_16_9.gif', import.meta.url).href // 默认占位图
	let defaultImage = el.getAttribute('default-img') // 外部传入的默认占位图
	let errorImage = el.getAttribute('error-img')       // 外部传入的错误占位图
	if(binding.value !== binding.oldValue) {
	el.setAttribute('src', defaultImage || placeholderImage) }
	// el.setAttribute('class', 'img-objectfix-contain') 
	 let realImageUrl = binding.value // 获取图片地址（ v-image="cover" 的 cover）
	if (realImageUrl) {
			imageIsExist(realImageUrl)
					.then(() => {
							el.setAttribute('src', realImageUrl)
					})
					.catch(() => {
							el.setAttribute('src', errorImage || placeholderImage)
					})
	}
	
}