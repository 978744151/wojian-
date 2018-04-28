$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        render();
        function render() {
            $.ajax({
                type: 'get',
                url: url +'/api/api-bin/wjcm/datalist/queryOrdersOk.action',
                data: {
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data);
                    if (data.success == 1) {
                        var order_state = "";
                        for (var i = 0; i < data.result.record.length; i++) {
                            if (data.result.record[i].goods.length > 1) {
                                for (var j = 0; j < data.result.record[i].goods.length; j++) {
                                    order_state += '<li class="mui-table-view-cell mui-transitioning state_li" data-id="' + data.result.record[i].orderid + '">'
                                    order_state += '<div class="mui-slider-handle">'
                                    order_state += ' <div class="mui-table-cell state_flex" data-id="' + data.result.record[i].orderid + '">'
                                    order_state += '<div class="state_img" >'
                                    order_state += '<img src="' + data.result.record[i].goods[j].commoditypic + '" alt="">'
                                    order_state += '</div>'
                                    order_state += '<div class="state_right">'
                                    order_state += '<span class="price" style="color: red;">实付款: ¥<span class="state_price">' + data.result.record[i].total + '</span></span>'
                                    order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[j].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[j].speckeyname + '</span>&nbsp;X' + data.result.record[i].goods[0].goodsnum + '</p>'
                                    order_state += '</div>'
                                    order_state += '</div>'
                                    order_state += '<div ></div>'
                                    order_state += '</div>'
                                    order_state += '</li>'
                                }
                                //order_state += '<div class="state_buttons">'
                                //order_state += '<button class="loader_goods">等待发货</button>'
                                //order_state += '</div>'
                            } else if (data.result.record[i].goods.length == 1) {
                                order_state += '<li class="mui-table-view-cell mui-transitioning state_li" >'
                                order_state += '<div class="mui-slider-handle">'
                                order_state += ' <div class="mui-table-cell state_flex" data-id="' + data.result.record[i].orderid + '">'
                                order_state += '<div class="state_img" >'
                                order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '" alt="">'
                                order_state += '</div>'
                                order_state += '<div class="state_right">'
                                order_state += '<span class="price" style="color: red;">实付款: ¥<span class="state_price">' + data.result.record[i].total + '</span></span>'
                                order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[0].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[0].speckeyname + '</span>&nbsp;X' + data.result.record[i].goods[0].goodsnum + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '<div ></div>'
                                order_state += '</div>'
                                order_state += '<div class="state_button">'
                                //order_state += '<button class="loader_goods">等待发货</button>'
                                order_state += '</div>'
                                order_state += '</li>'
                            } else if (data.result.record.length == 0) {
                                mui.toast('你还没有商品哦');
                            }
                        }
                        $('.goods-list').html(order_state);
                    } else {
                        mui.toast('操作失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作');
                }
            })
        }
        $('body').on('tap', '.state_flex', function () {
            var orderid = $(this).data('id');
            window.top.location = "order_info.html?key=" + orderid
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }
})