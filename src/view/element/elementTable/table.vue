<template>
  <div id="app">
	<el-table ref="multipleTable" :data="tableData" stripe border @selection-change="selectChange" height="655px" tooltip-effect="dark">
		<el-table-column type="selection" min-width="55"></el-table-column>
		<el-table-column prop="index" width="55" label="序号"></el-table-column>
		<el-table-column prop="name" label="姓名"></el-table-column>
		<el-table-column prop="date" label="日期"></el-table-column>
		<el-table-column prop="city" label="地址"></el-table-column>
		<el-table-column prop="description" label="描述"></el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
			<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		    </template>
		</el-table-column>
	</el-table>
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
	      :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	    </el-pagination>
	</el-pagination>
	<el-button @click="toggleSelection()">删除</el-button>
  </div>
</template>

<script>
	import apiAxios from '../../../api/index.js'
	  export default {
	    data() {
	      return {
			baseUrl:this.$store.state.baseUrl,
			multipleTable:[],
	        tableData:[],
			pageSize:20,
			pageSizes:[20, 50, 100],
			total:0,
			currentPage:1
	      };
	    },
		mounted() {
			this.init()
		},
	    methods: {
			init(){
				this.initTable()
		    },
			initTable(){
				let that=this;
				let data={
					pageSize:this.pageSize,
					page:this.currentPage,
					timeDate:'',
					search:''
				}
				this.$axios.post(this.baseUrl+'elementUI/table',data).then(res=>{
					if(res.status==200){
						that.total=res.data.total;
						that.tableData=res.data.list
					}
				})
			},
			selectChange(val){
				console.log('选中内容',val)
				this.multipleTable=val
			},
			toggleSelection(){
				this.$refs.multipleTable.clearSelection();
				this.initTable()
			},
			handleEdit(index, row){
				console.log(index, row);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize=val;
				this.initTable();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage=val;
				this.initTable();
			}
			
			
	    }
	  };
</script>

<style>
</style>
