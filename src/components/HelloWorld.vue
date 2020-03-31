<template>
  <div id="app">
	<el-table ref="multipleTable" :data="tableData" stripe border @selection-change="selectChange" tooltip-effect="dark">
		<el-table-column type="selection" min-width="55"></el-table-column>
		<el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
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
	  export default {
	    data() {
	      return {
			multipleTable:[],
	        tableData:[
				{
					name:'小一',
				},
				{
					'name':'小二'
				}
			],
			pageSize:20,
			pageSizes:[20, 50, 100],
			total:30,
			currentPage:0
	      };
	    },
	    methods: {
			selectChange(val){
				console.log('val',val)
				this.multipleTable=val
			},
			toggleSelection(){
				this.$refs.multipleTable.clearSelection()
			},
			handleEdit(index, row){
				console.log(index, row);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
	    }
	  };
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
