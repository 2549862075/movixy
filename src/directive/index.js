import ImageIsExist from "./img/ImageIsExist"
const install = function(Vue) {
  Vue.directive('image-is-exist', ImageIsExist)
}

export default install
