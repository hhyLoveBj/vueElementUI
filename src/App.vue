<template>
	<div id="app">
		<el-container>
			<el-header :style="'height:'+headerHeight+'px;margin-bottom:10px'">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#ffffff" text-color="#000000" active-text-color="#409eff">
					<el-menu-item :index="item.index" v-for="(item,index) in navList">
						<router-link class="headerNav" :to="item.component">{{item.name}}</router-link>
					</el-menu-item>
				</el-menu>
			</el-header>
			<el-main :style="'height:'+mainHeight+'px;'">
				<router-view></router-view>
			</el-main>
			<el-footer class="flex-center" :style="'height:'+footerHeight+'px'">知识整理</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return{
			activeIndex:'1',
			headerHeight:60,
			mainHeight:100,
			footerHeight:60,
			navList:[],
		}
	},
	mounted() {
		let height=document.documentElement.clientHeight;
		this.mainHeight=height-this.headerHeight-this.footerHeight-10;
		this.init()
	},
	methods: {
		init(){
			this.navList=[
				{
					index:'1',
					component:'/elementUI',
					name:'elementUI'
				},
				{
					index:'2',
					component:'/bootStrap',
					name:'bootStrap'
				},
			]
			this.activeIndex='1';
			this.$router.push(this.navList[0].component)
		}
	}
};
</script>

<style lang="less" type="text/less">
	@import './static/css/public/index.css';
	@import './static/css/public/elementUI.css';
	@blueColor: #409eff;
	@blockColor: #000000;
	@white: #ffffff;
	.headerNav{
		display: inline-block;
		width: 100%;
		height: 100%;
		padding: 0px 20px;
	}
	.el-menu-item{
		padding: 0px;
	}
</style>
