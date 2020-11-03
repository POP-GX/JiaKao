import {
	Select
} from 'element-ui'
const elementUI = [Select]

export default {
	/**
	 * Vue.use 方法会自动调用install函数
	 * Install Vant Component plugin
	 * @param Vue
	 */
	install(Vue) {
		elementUI.forEach(Component => {
			Vue.use(Component)
		})
	}

}