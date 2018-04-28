$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var pageApp = 1;
        var thisgoods = []
        render()
        function render() {
            $.ajax({
                type: 'get',
                url: url + "/api/api-bin/wjcm/collect/shop/querycollect.action?shopcode=10000000",
                data: {
                    userid: userid,
                    pageApp: pageApp,
                    access_code:access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        thisgoods = thisgoods.concat(data.result.record)
                        var html = "";
                        if (thisgoods.length == 0) {
                            html += "<p style='margin-left: 10px; margin-top: 10px;'>快去收藏你喜欢的宝贝把</p>"
                        }
                        else if (thisgoods.length > 0) {
                            for (var i = 0; i < thisgoods.length; i++) {
                                html += '<li class="mui-table-view-cell mui-transitioning " >';
                                html += '<div class="mui-slider-right mui-disabled">';
                                html += '<a class="btn_delete mui-btn mui-btn-red mui-icon mui-icon-trash" data-id= "' + thisgoods[i].collectioncontent + '"></a>';
                                html += '</div>';
                                html += '<div class="mui-slider-handle collect_li"data-id="' + thisgoods[i].collectioncontent + '">';
                                html += '<div class="mui-table-cell">';
                                html += '<div class="cart_left">';
                                html += '<img src="https://wojianshop.oss-cn-shanghai.aliyuncs.com' + thisgoods[i].contentpicture + '">';
                                html += '</div>';
                                html += '<div class="cart_right">';
                                html += '<p class="proName mui-ellipsis-2">' + thisgoods[i].contentname + '</p>';
                                html += '<p class="price_info">';
                                html += '<span class="price">&yen;' + thisgoods[i].contentprice + '</span>';
                                html += '</p>';
                                html += '<p class="size"></p>';
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                html += '</li>';
                            }
                        }
                        //var html = template('tpl',data)
                        $('.goods-list').html(html)

                    } else {
                        mui.toast('加载失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作');
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                container: '#pull',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    //auto : true,
                    height: 100,
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了',
                    callback: pullupRefresh
                }
            }
        });
        function pullupRefresh() {
            setTimeout(function () {
                mui('#pull').pullRefresh().endPullupToRefresh();
                pageApp++
                render()
            }, 700)
        }
        $('body').on('tap', '.btn_delete', function () {
            console.log(1)
            var index = $(this).data('id');
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/collect/shop/deleteUserCollection.action',
                data: {
                    userid: userid,
                    collectioncontent: index,
                    access_code:access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.toast('删除成功')
                        render()
                        window.top.location = window.location.href
                    } else {
                        mui.toast('加载失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('网络错误,请稍后再试')
                }
            })
        })
        $('body').on('tap', '.collect_li', function () {
            var index = $(this).data('id')
            window.top.location = 'product.html?key=' + index;
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})


