<template>
	<div>
		<div>
			<el-form ref="entity" :model="entity" label-width="80px">
				<div class="form-group">
					<input id="fileReportUpload" name="uploadImgFile" type="file" value="上传" multiple />
					<el-dropdown v-if="entity.picture.length>0" v-for="(item,index) in entity.picture" @command="handleCommand">
					  <el-button type="primary">
					    {{item.fileUrl}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </el-button>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item :command="{index:1,value:item.fileUrl}">查看</el-dropdown-item>
					    <el-dropdown-item :command="{index:2,value:index}">删除</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-form>
			
		</div>
	</div>
</template>

<script>
require('bootstrap-fileinput/css/fileinput.css');
require('bootstrap/dist/css/bootstrap.css');
require('../../../static/plugins/fileinput/fileinput.js');
require('../../../static/plugins/fileinput/fileinput_locale_zh.js');
export default {
	data() {
		return {
			entity: {
				picture: []
			},
			baseUrl: 'https://mock.yonyoucloud.com/mock/6034/vue/file'
		};
	},
	mounted() {
		this.initUpload($('#fileReportUpload'), this.baseUrl);
	},
	methods: {
		initUpload($input, posturl) {
			let that = this;
			$input
				.fileinput({
					language: 'zh',
					uploadUrl: posturl,
					showCaption: false, // 显示文件文本框
					showCancel: false, // 显示取消按钮
					allowedFileExtensions: ['jpg', 'png', 'gif', 'doc', 'xls', 'docx', 'xlsx', 'pdf'], //接收的文件后缀
					browseClass: 'btn btn-primary shiny',
					maxFileCount: 1, //最大上传数量
					maxFileSize: 5242880, //上传大小
				})
				.on('fileuploaded', function(event, data) {
					console.log('上传附件成功', data.response.data);
					that.entity.picture = data.response.data;
					setTimeout(function(){
						$(".fileinput-remove-button").click();
					},100)
					
				});
		},
		handleCommand(command){
			if(command.index==1){
				window.open(command.value)
			}else{
				this.entity.picture.splice(command.value,1)
			}
		}
	}
};
</script>

<style>
.progress {
	display: none;
}
</style>
