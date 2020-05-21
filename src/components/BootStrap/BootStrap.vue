<template>
	<el-container style="height: inherit;">
		<el-aside width="200px">
			<el-row class="tac">
				<el-col :span="24">
					<el-menu :default-active="defaultActive" class="el-menu-vertical-demo" background-color="#ffffff" text-color="#000000" active-text-color="#409eff">
						<template v-for="(item, index) in navDetailList">
							<template v-if="item.children">
								<el-submenu :index="item.index.toString()">
									<template slot="title">
										<i :class="item.class"></i>
										<span>{{item.title}}</span>
									</template>
									<template v-for="(value, index) in item.children">
										<template v-if="value.children">
											<el-submenu :index="value.index.toString()">
												<template slot="title">
													<i :class="value.class"></i>
													<span>{{ value.title }}</span>
												</template>
												<template v-for="(valueItem, index) in value.children">
													<el-menu-item @click="sidebarClick(valueItem.index,valueItem.title)" :index="valueItem.index.toString()">
														<i :class="valueItem.class"></i>
														<router-link slot="title" class="sidebar" :class="defaultActive==valueItem.index?'defaultActive':''" :to="valueItem.component">{{valueItem.title}}</router-link>
													</el-menu-item>
												</template>
											</el-submenu>
										</template>
										<template v-else>
											<el-menu-item @click="sidebarClick(value.index,value.title)" :index="value.index.toString()">
												<i :class="value.class"></i>
												<router-link slot="title" class="sidebar" :class="defaultActive==value.index?'defaultActive':''" :to="value.component">{{value.title}}</router-link>
											</el-menu-item>
										</template>
									</template>
								</el-submenu>
							</template>
							<template v-else>
								<el-menu-item @click="sidebarClick(item.index,item.title)" :index="item.index.toString()">
									<i :class="item.class"></i>
									<router-link slot="title" class="sidebar" :class="defaultActive==item.index?'defaultActive':''" :to="item.component">{{item.title}}</router-link>
								</el-menu-item>
							</template>
						</template>
					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
		<el-container style="padding: 10px 20px;">
			<el-header>
				<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px 20px;border-bottom: 1px solid #000000;">
					<el-breadcrumb-item>bootStrap</el-breadcrumb-item>
					<el-breadcrumb-item>{{navName}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			navDetailList: [],
			defaultActive:'1-1',
			navName:'表格'
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.navDetailList = [
				{
					index: '1',
					title: '表单',
					class: 'el-icon-location',
					children: [
						{
							index: '1-1',
							title: '表格',
							component:'/bootStrap/table'
						},
						{
							index: '1-2',
							title: '导航一-2',
							children: [
								{
									index: '1-2-1',
									title: '上传插件fileInput',
									component:'/bootStrap/upload'
								},
								{
									index: '1-2-2',
									title: '导航一-1-2',
									component:'/bootStrap/table'
								}
							]
						}
					]
				},
				{
					index: '2',
					title: '表格',
					component:'/bootStrap/table'
				},
				{
					index: '3',
					title: '导航三',
					component:'/bootStrap/table'
				}
			];
		},
		sidebarClick(index,title){
			this.defaultActive=index;
			this.navName=title
		}
	}
};
</script>

<style lang="less" type="text/less">
.el-menu {
	border-right: 1px solid transparent;
}

.sidebar{
	text-decoration: none;
	color: #000000;
}
.defaultActive{
	color: #409eff;
}
</style>
