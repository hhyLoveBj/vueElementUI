import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import ElementUI from '@/components/ElementUI/ElementUI.vue'
import ElementTable from '@/view/element/elementTable/table.vue'
import EuploadFile from '@/view/element/form/upload-fileinput.vue'

import BootStrap from '@/components/BootStrap/BootStrap.vue'
import bootStrapTable from '@/view/bootstrap/bootstrapTable/table.vue'
import BuploadFile from '@/view/bootstrap/form/upload-fileinput.vue'

const router=new VueRouter({
	routes:[
		{
			path:"/elementUI",
			name:'elementui',
			component:ElementUI,
			children:[
				{
					path:"",
					component:EuploadFile,
				},
				{
					path:"table",
					name:'elementtable',
					component:ElementTable,
				},
				{
					path:"upload",
					name:'Euploadfile',
					component:EuploadFile,
				}
			]
		},{
			path:"/bootStrap",
			name:'bootstrap',
			component:BootStrap,
			children:[
				{
					path:"",
					component:bootStrapTable,
				},
				{
					path:"table",
					name:'bootstraptable',
					component:bootStrapTable,
				},
				{
					path:"upload",
					name:'Buploadfile',
					component:BuploadFile,
				}
			]
		}
	],
})

export default router


// const router=new VueRouter({
// 	routes:[
// 		{
// 			path:"/",
// 			component:VueRouter,
// 		}, //跳转的位置要引进来（import VueRouter from 'vue-router'）
// 		{
// 			path:"路由",
// 			name:'取个名字',
// 			component:跳转的位置,
// 		}, //输入个name，用于绑定个名字
// 		{
// 			path:"/about(路由)",
// 			name:'取个名字',
// 			component:跳转的位置,
// 			children:[
// 				{
// 					path:"/about/aboutour(路由)",
// 					name:'取个名字',
// 					component:跳转的位置,
// 				},
// 				{
// 					path:"/aboutour(路由)",
// 					name:'取个名字',
// 					component:跳转的位置,
// 				},
// 			],
// 		}, //二级路由
// 		{
// 			path:"(路由)",
// 			component:跳转的位置,
// 			beforeEnter: (to, from, next) => {
// 				例如:alert('非登录状态禁止访问页面');
// 				next(false); //禁止跳转到此页面
// 			},
// 		},//路由独享守卫 针对指定页面 全局守卫也可以在此写
// 		{
// 			path:"路由",
// 			name:'取个名字',
// 			components:{
// 			default:'原本要跳转的',
// 			'取的名字'：取的名字，
// 			'取的名字'：取的名字
// 			},
// 		},//一个页面想要另外一个页面的某些东西 在原本页面写入<route-view name="取个名字"></route-view>
// 		path:'*',redirect:'/'} //如果用户输入错误，默认展示页
// 	],
// 	mode:"history" //去掉后面的#号
// })
