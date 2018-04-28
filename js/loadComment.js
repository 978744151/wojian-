$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        render();
        function render() {
            $.ajax({
                type: 'get',
                url: url +'/api/api-bin/wjcm/datalist/queryNoCommentGood.action',
                data: {
                    userid: userid,
                    access_code: access_code,
                },
                success: function (data) {
                    console.log(data);
                    if (data.success == 1) {
                        $('.goods-list').html(template('tpl',data))
                    } else {
                        mui.toast('操作失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作');
                }
            })
        }
        $('body').on('tap', '.go_comment', function () {
            var barcode = $(this).data('barcode');
            var orderid = $(this).data('orderid');
            var pic = $(this).data('pic');
            var name = $(this).data('name');
            window.top.location = "comment.html?key=" + barcode + "&order="+orderid+'&pic='+pic+'&name='+name
        })
        $('body').on('tap','.loadC_img', function () {
            var index = $(this).data('id');
            window.top.location = 'product.html?key='+index+'&time='+((new Date()).getTime());
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.location.href = "landing.html";
        }, 1000)
    }
})