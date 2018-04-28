
$(function () {
    var tools = {
        getParamObj: function () {
            var obj = {};
            var search = location.search;
            search = search.slice(1);
            var arr = search.split("&");
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i].split("=")[0];
                var value = decodeURI(arr[i].split("=")[1]);
                obj[key] = value;
            }
            return obj;
        },
        getParam:function (key) {
            return this.getParamObj()[key];
        },
        checkLogin:function (data) {
            if(data.success != 1){
                window.top.location = "login.html";
            }
        }
    }
    function errorMsg(msg){
        var randomId = parseInt(Math.random()*1000000+1);
        $('body').append("<div class='error_box' id='"+randomId+"'><span>"+msg+"</span></div>");
        $('#'+randomId).fadeIn(200);
        setTimeout(function(){
            $('#'+randomId).fadeOut(200);
        },1200);
    }
    var barcode = tools.getParam('key');
    var orderid = tools.getParam('order');
    var pic = tools.getParam('pic');
    var name = tools.getParam('name');
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    var username = localStorage.getItem('username');
    var portraiturl = localStorage.getItem('portraiturl');
    var url = 'https://mall.wojianwang.com';
    $('.com_name').html(name)
    $('.com_pic').attr('src',pic)
    //提醒项

    //获取地址栏中所有的参数

    if (access_code) {
        //layui上传图片方法
        //layui.use('upload', function(){
        //    var upload = layui.upload;
        //
        //    //执行实例
        //    var uploadInst = upload.render({
        //        elem: '#test1' //绑定元素
        //        ,url: '/upload/' //上传接口
        //        ,multiple: true
        //        ,allDone: function(obj){ //当文件全部被提交后，才触发
        //            console.log(obj.total); //得到总文件数
        //            console.log(obj.successful); //请求成功的文件数
        //            console.log(obj.aborted); //请求失败的文件数
        //        }
        //        ,done: function(res, index, upload){
        //            //上传完毕回调
        //        }
        //        ,error: function(){
        //            //请求异常回调
        //        }
        //    });
        //});
        //初始化
        $('.raty').raty({score: 5});
        function commentajax(date) {
            $.ajax({
                url: url + '/api/api-bin/wjcm/datalist/insertComment.action',
                data: date,
                success: function (data) {
                    console.log(data);
                    if(data.success == 1){
                        setTimeout(function () {
                            window.top.location = "user.html";
                        },300)
                    }
                },
                error: function () {
                    errorMsg('等待图片上传成功或请选择png格式的图片')
                    setTimeout(function () {
                        window.top.location = window.location.href;
                    },1200)
                }
            })
        }
        $('.comment_commit').on('click', function () {
            var goodsrank = $('.raty>input').val();
            //if($('.text_content').val().trim() == false){
            //    errorMsg('请输入内容')
            //    return false
            //}
            var date = {
                barcode: barcode,
                orderid: orderid,
                userid: userid,
                username: username,
                content: $('.text_content').val(),
                access_code: access_code,
                portraiturl: portraiturl,
                goodsrank: goodsrank,
                img:$('.upfileimg').attr('src')
            }
            console.log(date.img)
            commentajax(date)
        })
        //图片上传
        //$("input[type='file']").on('change', function () {
        //    var self = this;
        //    var fileName = $(this).attr("name");
        //    var file = self.files[0];
        //    var r = new FileReader();
        //    r.readAsDataURL(file);
        //    console.log(r)
        //    $(r).on('load',function () {
        //        var fileStream = this.result;//base64图片流
        //        var URL = window.URL || window.webkitURL,
        //            canvas = document.createElement('canvas'),
        //            ctx = canvas.getContext('2d');
        //        if (URL && File && ctx) {
        //            var fileURL = URL.createObjectURL(file),
        //                img = new Image();
        //            img.src = fileURL;
        //            img.onload = function () {
        //                var orientation;
        //                EXIF.getData(img, function () {
        //                    orientation = EXIF.getTag(this, "Orientation");
        //                    var degree = 0, drawWidth = img.width, drawHeight = img.height, width, height;
        //                    //以下改变一下图片大小
        //                    var maxSide = Math.max(drawWidth, drawHeight);
        //                    var tarSize = 200;
        //                    if (maxSide > tarSize) {
        //                        var minSide = Math.min(drawWidth, drawHeight);
        //                        minSide = minSide / maxSide * tarSize;
        //                        maxSide = tarSize;
        //                        if (drawWidth > drawHeight) {
        //                            drawWidth = maxSide;
        //                            drawHeight = minSide;
        //                        } else {
        //                            drawWidth = minSide;
        //                            drawHeight = maxSide;
        //                        }
        //                    }
        //                    canvas.width = width = drawWidth;
        //                    canvas.height = height = drawHeight;
        //                    switch (orientation) {//横屏竖屏转化
        //                        //横屏拍摄，此时home键在左侧
        //                        case 3:
        //                            degree = 180;
        //                            drawWidth = -width;
        //                            drawHeight = -height;
        //                            break;
        //                        //竖屏拍摄，此时home键在下方(正常拿手机的方向)
        //                        case 6:
        //                            canvas.width = height;
        //                            canvas.height = width;
        //                            degree = 90;
        //                            drawWidth = width;
        //                            drawHeight = -height;
        //                            break;
        //                        //竖屏拍摄，此时home键在上方
        //                        case 8:
        //                            canvas.width = height;
        //                            canvas.height = width;
        //                            degree = 270;
        //                            drawWidth = -width;
        //                            drawHeight = height;
        //                            break;
        //                    }
        //                    //使用canvas旋转校正
        //                    ctx.rotate(degree * Math.PI / 180);
        //                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        //                    var base64 = canvas.toDataURL('image/jpeg');
        //                    console.log(base64)
        //                    $('.upfileimg').attr('src',base64)
        //                    //上传图片
        //                    //uploadFile(fileName, base64, fileStream);
        //                    canvas = null;
        //                    img = null;
        //                });
        //            }
        //        } else {
        //            //uploadFile(fileName, fileStream, fileStream);
        //            $('.upfileimg').attr('src','')
        //            errorMsg('上传失败')
        //        }
        //    });
        //});
    }
    else {
        errorMsg('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }

})