; (function ($) {
    /**
     * 绑定上传控件
     * @param {} $domList   
     * 
     *  file:上传控件初始化用的id
     *  span：存放上传文件的地方Id
     *  input：存放值的地方，新增、编辑传到后台
     *  $from： from 表单对象
     * 
     * @param {} option 
     * @returns {} 
     */
    $.fn.uploadImageJS = function ($domList,option) {
        var $this = this;
        var setting = {
            uploadUrl: 'http://localhost:8080/gov/sys/file/upload',
            showCaption: false,
            uploadAsync: true,
			showCancel: false, // 显示取消按钮
            allowedFileExtensions: ['jpg', 'png', 'gif', 'doc', 'xls', 'docx', 'xlsx', 'pdf'],//接收的文件后缀
            browseClass: "btn btn-blue shiny",
            maxFileCount: 1,    //最大上传数量
            maxFileSize: 5242880    //上传大小 
        };
        var data = $(this).data("uploadImageJS");
        $domList["file"] = $this; 
        if (!data)
            $this.data('uploadImageJS', (data = new bindUploadImage($domList,$.extend(setting, option))));

    }

    var bindUploadImage = function ($domList,options) {
        this.options = options; //实例化上传控件用的参数
        this.$domList = $domList; //根据值加载数据
        this.funUpload = $.bindFileUpload; //实例化绑定上传数据用的方法
        this.init();
        this.bindEvent();

    }

    bindUploadImage.prototype.init = function () {
        var $this = this;
        var $dom = this.$domList;
        $dom["file"].fileinput($this.options);  //根据Id上传文件
        
    }
    bindUploadImage.prototype.bindEvent= function() {
        var $this = this,
            $dom = $this["$domList"],
            $file = $dom["file"],
            $input = $dom["input"],
            $span = $dom["span"],
            $from = $dom["$from"];

        //完成上传后的回调
        $file.on("filebatchuploadcomplete", function (events, selector, data) {
            //清除上传文件后的上传框
            //alert("上传成功");
            $($(events.delegateTarget).parent().parent()).find(".fileinput-remove-button").click();


        });
        $($file).on("fileuploaded", function (event, data, previewId, index) {


            var value = $input.val(); //获取档期内input框中的内容
            var responseInfo = eval("(" + data.jqXHR.responseText + ")"); 
            if ($this.options["maxFileCount"] > 1) {      //上传多个文件
                    $input.val(value + "," + responseInfo.path);

                    $this.funUpload.init({
                        $this: $span,
                        value: responseInfo.path,//获取最后一个上传的值，绑定到span中
                        status: true,
                        $from: $from 
                    });


                } else if ($this.options["maxFileCount"] == 1) { 
                	//上传单个文件
                   
                    $input.val(responseInfo.path);
                     
                    $this.funUpload.init({
                        $this: $span,
                        value: responseInfo.path,//获取最后一个上传的值，绑定到span中
                        status: true,
                        $from: $from
                    });
                }
         
             
        });

    }

})(jQuery);