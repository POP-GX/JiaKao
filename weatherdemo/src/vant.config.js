import {
	Toast,
	Skeleton,
	Empty,
	Icon,
	Swipe,
	SwipeItem,
	RadioGroup,
	Radio,
	IndexBar, 
	IndexAnchor ,
	Cell,
	Circle,
	ActionSheet  
} from 'vant'
const vants = [Toast, Skeleton, Empty, Icon, Swipe, SwipeItem, RadioGroup, Radio,IndexBar, IndexAnchor ,Cell ,Circle,ActionSheet]

export default {
	/**
	 * Vue.use 方法会自动调用install函数
	 * Install Vant Component plugin
	 * @param Vue
	 */
	install(Vue) {
		vants.forEach(Component => {
			Vue.use(Component)
		})
	}

}
