$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    console.log(access_code);
    if (access_code) {
        render()
        function render() {
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/queryOrdersAll.action',
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
                                    if (data.result.record[i].paystatus == 1) {
                                        order_state += '<li class="mui-table-view-cell mui-transitioning state_li" data-id="' + data.result.record[i].orderid + '">'
                                        order_state += '<div class="mui-slider-handle">'
                                        order_state += ' <div class="mui-table-cell state_flex">'
                                        order_state += '<div class="state_img" >'
                                        order_state += '<img src="' + data.result.record[i].goods[j].commoditypic + '" alt="">'
                                        order_state += '</div>'
                                        order_state += '<div class="state_right">'
                                        order_state += '<span class="price" style="color: red;">合计¥<span class="state_price">' + data.result.record[i].goods[j].goodsprice + '</span></span>'
                                        order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[j].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[j].speckeyname + '</span>&nbsp;X' + data.result.record[i].goods[0].goodsnum + '</p>'
                                        order_state += '</div>'
                                        order_state += '</div>'
                                        order_state += '<div ></div>'
                                        order_state += '</div>'
                                        order_state += '<div class="state_button">'
                                        order_state += '<button class="remover_order" data-id="' + data.result.record[i].orderid + '">取消订单</button>'
                                        order_state += '<button class="pay" data-id="' + data.result.record[i].orderid + '">付款</button>'

                                        //else if (data.result.record[i].shippingstatus == 0 && data.result.record[i].paystatus == 0) {
                                        //    order_state += '<button class="true_goods">确认收货</button>'
                                        //} else if (data.result.record[i].orderstatus == 2) {
                                        //    order_state += '<button class="remover_order">删除订单</button>'
                                        //} else if (data.result.record[i].orderstatus == 3) {
                                        //    order_state += '<button class="complete_order">完成订单</button>'
                                        //} else if (data.result.record[i].shippingstatus == 1 && data.result.record[i].paystatus == 0) {
                                        //    order_state += '<button class="loader_goods">等待发货</button>'
                                        //}
                                        order_state += '</div>'
                                        order_state += '</li>'
                                    }
                                }
                            } else if (data.result.record[i].goods.length == 1) {
                                if (data.result.record[i].paystatus == 1) {
                                    order_state += '<li class="mui-table-view-cell mui-transitioning state_li" >'
                                    order_state += '<div class="mui-slider-handle">'
                                    order_state += ' <div class="mui-table-cell state_flex">'
                                    order_state += '<div class="state_img" >'
                                    order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '" alt="">'
                                    order_state += '</div>'
                                    order_state += '<div class="state_right">'
                                    order_state += '<span class="price" style="color: red;">合计¥<span class="state_price">' + data.result.record[i].goods[0].goodsprice + '</span></span>'
                                    order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[0].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[0].speckeyname + '</span>&nbsp;X' + data.result.record[i].goods[0].goodsnum + '</p>'
                                    order_state += '</div>'
                                    order_state += '</div>'
                                    order_state += '<div ></div>'
                                    order_state += '</div>'
                                    order_state += '<div class="state_button">'

                                    order_state += '<button class="remover_order" data-id="' + data.result.record[i].orderid + '">取消订单</button>'
                                    order_state += '<button class="pay" data-id="' + data.result.record[i].orderid + '">付款</button>'

                                    //else if (data.result.record[i].shippingstatus == 0 && data.result.record[i].paystatus == 0) {
                                    //    order_state += '<button class="true_goods">确认收货</button>'
                                    //} else if (data.result.record[i].orderstatus == 2) {
                                    //    order_state += '<button class="remover_order">删除订单</button>'
                                    //} else if (data.result.record[i].orderstatus == 3) {
                                    //    order_state += '<button class="complete_order">完成订单</button>'
                                    //} else if (data.result.record[i].shippingstatus == 1 && data.result.record[i].paystatus == 0) {
                                    //    order_state += '<button class="loader_goods">等待发货</button>'
                                    //}
                                    order_state += '</div>'
                                    order_state += '</li>'
                                }
                            } else if (data.result.record[i].goods.length == 1) {
                                mui.toast('还没有商品哦')
                            }
                        }
                        $('.goods-list').html(order_state)
                    } else {
                        mui.toast('加载失败，请重新进行操作')
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作')
                }
            })
        }

        $('body').on('click', '.remover_order', function () {
            var orderid = $(this).data('id');
            console.log(orderid)
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/deleteOrdersDetails.action',
                data: {
                    userid: userid,
                    orderid: orderid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        mui.toast('操作成功')
                        render()
                    }
                }
            })
        })
        $('body').on('click', '.pay', function () {
            var orderid = $(this).data('id');
            console.log(orderid);
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/entry/datalist/payment.action',
                data: {
                    userid: userid,
                    orderid: orderid,
                },
                success: function (data) {
                    var result = data.result
                    console.log(result);
                    $.ajax({
                        type: 'get',
                        url: 'https://openapi.alipay.com/gateway.do',
                        data: result,
                        success: function (data) {
                            console.log(data)
                        }
                    })
                }
            })
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.location.href = "landing.html"
        }, 1000)
    }

})


