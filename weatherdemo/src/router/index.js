import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../components/test/Home"
import Examination from "../components/test/Examination"
import SubjectOne from "../components/test/SubjectOne"

Vue.use(VueRouter) 


const routes = [
	// {
	// 	path: '/',
	// 	// name:"Home",
	// 	component: Home,
	// },
	{
		path: '/',
		// props: true,
		name: "examination",
		component: Examination,
		children: [
			{
				path: '/',
				name: 'SubjectOne',
				// props: true,
				meta: { num: 1 },
				component: SubjectOne,

			},
			{
				path: '/subjectfour',
				name: 'SubjectFour',
				// props: true,
				component: () => import('../components/test/SubjectFour')

			}
		]
	},
	{
		path: '/testdemo',
		name: "Testdemo3",
		component: () => import('../views/TestDemo3')
	},
	{
		path: '/testdemo2',
		name: "Testdemo2",
		component: () => import('../views/TestDemo2')
	},
	{
		path: '/iconView',
		name: "IconView",
		component: () => import("../views/icondemo/IconView")
	},
	{
		path: '/iconlist',
		name: "IconList",
		component: () => import("../views/icondemo/IconList")
	},
	{
		path: '/videoDemo',
		name: "VideoDemo",
		component: () => import("../views/VideoDemo")
	},
	{
		path: '/findcar',
		name: "Findcar",
		meta: { num: 2 },
		component: () => import("../views/FindCar")
	},
	{
		path: '/collection',
		name: "Collection",
		meta: { num: 2 },
		component: () => import("../views/Collection")
	},
]

let router = new VueRouter({ // 初始化VueRouter
	mode: 'history',
	routes,
	linkActiveClass: "actived",
	linkExactActiveClass: "exact-actived"

})
export default router
