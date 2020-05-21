<template>
	<div>
		<div>
			<form :model="entity">
				<div class="form-group">
					<input id="fileReportUpload" name="uploadImgFile" type="file" value="上传" multiple />
					<span class="picture">
						<div class="dropdown" v-if="entity.picture.length>0" v-for="(item,index) in entity.picture">
						  <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    {{item.fileUrl}}
						    <span class="caret"></span>
						  </button>
						  <ul class="dropdown-menu" aria-labelledby="dLabel">
						    <li @click="lookUpUrl(item.fileUrl)">
								查看
							</li>
							<li @click="deleteUrl(index)">
								删除
							</li>
						  </ul>
						</div>
					</span>
				</div>
			</form>
			
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
		lookUpUrl(url){
			window.open(url)
		},
		deleteUrl(index){
			this.entity.picture.splice(index,1)
		}
	}
};
</script>

<style>
@import '../../../static/css/public/elementUI.css';
.progress {
	display: none;
}
</style>
