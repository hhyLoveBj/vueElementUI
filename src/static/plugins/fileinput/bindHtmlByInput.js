; (function ($) {
    /**
     * $from：当前from表单对象
     * bindName：需要绑定数据的from表单中某些html 元素名称 如： data-bind="bind" 指定
     * rollBack：绑定完成数据后，返回的方法
     * data：需要绑定的数据
     * status：true：可以编辑 false：不可编辑
     * clearUpload： true 清空上传按钮初始化过的span   false：不清空
     */
    $.fn.newBindHtmlByInput = function (options) {
        //合并参数
        var defaultOptions = { status: false, clearUpload: false, rollBack: null, bindName: null };
        defaultOptions = $.extend(defaultOptions, options);

        //调用绑定dom元素代码
        new bindHtml(this, defaultOptions);
    };
    var bindHtml = function ($from, options) {
        this.notImage = "../../Images/notImage.jpg"; //没有img的时候 调用的img地址
        this.options = options;
        this.options["$from"] = $from;
       
        this.options["formatUpload"] = $.bindFileUpload; //上传用的方法
        this.bindHtmlData();
    }

    bindHtml.prototype.bindHtmlData = function () {
        var that = this;
        var data = this.options.data;
        var options = that.options;

        $(options.$from.find("[data-bind='" + options.bindName + "']"))  //循环当前from表单中包含 data-bind值的dom元素
            .each(function (i) {
                var $this = $(this); //当前循环的对象 当前dom元素对象
                var $from = options.$from; //from表单对象
                var dataType = $this.data("type");
                var type = $this.attr("type");
                var name = $this.attr("name"); //获取当前对象 name

                // if (!options.status) { //如果当前为不可编辑，则先将当前html元素的禁用去除，等执行完后，在添加禁用标签，等单选、多选、下拉框等html标签触发完事件后再将其禁用
                if ($this.is("radio") || type == "checkbox")
                    $from
                        .find(" input[name='" + name + "']")
                        .removeAttr("disabled"); //如果当前html标签为单选框，则将其禁用去除
                else
                    $this.removeAttr("disabled"); //去除禁用标签 
                // }  

                if ($this.is("img")) {
                    if (data[name] == null || data[name] == "") {
                        $this.attr("src", that["notImage"]);
                    } else {
                        $this.attr("src", that.uploadUrl() + data[name]);
                        $this
                            .wrap("<a href='" + that.uploadUrl() + data[name] + "' target='_blank'></a>"); //img标签外层添加A标签
                    }

                } else if ($this.is("span")) { //附件 

                    var uploadEntity = { //上传按钮
                        $this: $this,  //当前span对象
                        value: "",  //绑定上传控件的值
                        status: options.status,  //状态
                        $from: $from,  //from表单对象
                        clearUpload:options.clearUpload

                    };

                    $(".fileinput-remove", $from).click(); //先移除该上传按钮

                    if (dataType == "uploadFile") { //上传多个文件，初始化

                        if (options.status) { //如果当前为可以编辑，显示上传按钮 
                            $from.find(".file-input").show();

                        } else { //不可编辑，则隐藏上传按钮
                            $from.find(".file-input").hide();
                        }

                        if (data[name] != null) {
                            $this.html("");

                            if (data[name].indexOf(",") > -1) {
                                var strList = data[name].split(","); 

                                for (var j = 0; j < strList.length; j++) {
                                    if (strList[j] != "") { 
                                        uploadEntity["value"] = strList[j];
                                        options.formatUpload.init(uploadEntity);
                                    }
                                }
                            } else if (data[name] != "") { 
                                uploadEntity["value"] = data[name];
                                options.formatUpload.init(uploadEntity);
                            }  
                        }


                    } else if (dataType == "a") {
                        $this.text(data[name]);
                    } else {
                        $this.text(data[name]);
                        $this.wrap("<a href='" + data[name] + "' target='_blank'></a>");
                    }
                } else { // 绑定数据 
                    if ($this.is("label")) {
                        $this.html(data[name]);
                        $this.attr("title", data[name]);
                    } else if ($this.is("input") || $this.is("select")) {
                        if (type == "radio") {
                            $("input[name='" + name + "'][value='" + data[name] + "']", $(that.options.$from)).prop("checked", true);

                        } else if (type == "checkbox") {
                            $("input[name='" + name + "']", $(that.options.$from))
                                .each(function () {
                                    $(this).prop("checked", false);
                                    if (data[name].indexOf($(this).val()) > -1)
                                        $(this).prop("checked", true);

                                });
                        }
                        else
                            $this.val(data[name]);


                        if (dataType == "downlist") { //绑定单选下拉框
                            //var downLisEntity = $("#" + id + " select[name='" + name + "']", widget);
                            $this.select3();

                        } else if (dataType == "numberSet") { //绑定编号集合
                            //因为多选下拉框，不需要指定data-bind和name 所以，只能根据id获取该下拉框所绑定的input框的对象
                            //tool.js 中 统一进行了绑定change事件 事件名称：newBindNumberSet
                            var selectId = $this.attr("id"); //获取当前下拉框中的id，用来和下面的input框中的name进行匹配
                            if (data[selectId] != null) {
                                var ids = new Array();
                                if ((data[selectId] + "").indexOf(",") == -1) {
                                    ids.push(data[selectId]);
                                } else {
                                    ids = data[selectId].split(","); //多选下拉框人员序号以逗号分开转为数组
                                }

                                $this.val(ids); //ids为数组
                                $this.change();
                            } else {
                                $this.val(""); //ids为数组
                                $this.change();
                            }

                            $this.attr("title", data[name]); //所有html标签添加显示全称属性

                        }

                    } else if ($this.is("textarea") || $this.is("label") || $this.is("span")) {
                        $this.html(data[name]);
                        $this.val(data[name]);
                    }
                }

                if (!options.status) {
                    if ($this.is("radio") || type == "checkbox")
                        $from.find(" input[name='" + name + "']").attr("disabled", "disabled"); //添加禁用标签
                    else
                        $this.attr("disabled", "disabled"); //添加禁用标签 
                }
            });
        if (options.rollback) {
            options.rollback();
        }

    }


})(jQuery);

