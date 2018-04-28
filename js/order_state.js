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
                url: url + '/api/api-bin/wjcm/datalist/queryOrdersAll.action',
                data: {
                    userid: userid,
                    access_code: access_code,
                    pageApp: pageApp
                },
                success: function (data) {
                    if (data.success == 1) {
                        thisgoods = thisgoods.concat(data.result.record)

                        console.log(thisgoods);
                        var order_state = "";
                        for (var i = 0; i < thisgoods.length; i++) {
                            if (thisgoods[i].goods.length > 1) {
                                for (var j = 0; j < thisgoods[i].goods.length; j++) {
                                    order_state += '<li class="mui-table-view-cell mui-transitioning state_li" data-id="' + thisgoods[i].orderid + '">'
                                    order_state += '<div class="mui-slider-handle">'
                                    order_state += ' <div class="mui-table-cell state_flex" data-id="' + thisgoods[i].orderid + '">'
                                    order_state += '<div class="state_img" >'
                                    order_state += '<img src="' + thisgoods[i].goods[j].commoditypic + '" alt="">'
                                    order_state += '</div>'
                                    order_state += '<div class="state_right">'
                                    function accMul(arg1, arg2) {
                                        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                                        try {
                                            m += s1.split(".")[1].length
                                        } catch (e) {
                                        }
                                        try {
                                            m += s2.split(".")[1].length
                                        } catch (e) {
                                        }
                                        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
                                    }

                                    var total = thisgoods[i].goods[j].goodsnum + '*' + thisgoods[i].goods[j].goodsprice
                                    order_state += '<span class="price" style="color: red;"><span></span>¥<span class="state_price">' + accMul(thisgoods[i].goods[j].goodsnum, thisgoods[i].goods[j].goodsprice) + '</span></span>'
                                    order_state += '<p class="state_proName mui-ellipsis-2">' + thisgoods[i].goods[j].commodityname + '<span class="state_size_g">' + thisgoods[i].goods[j].speckeyname + '</span>&nbsp;X' + thisgoods[i].goods[j].goodsnum + '</p>'
                                    order_state += '</div>'
                                    order_state += '</div>'
                                    order_state += '<div ></div>'
                                    order_state += '</div>'

                                    order_state += '</li>'
                                }
                                order_state += '<div class="state_buttons">'
                                if (thisgoods[i].paystatus == 1) {
                                    order_state += '<span style="display:inline-block;margin-top: 12px;font-size: 15px; ">实付款:'+thisgoods[i].total+'<span></span></span>'
                                    order_state += '<button class="pay" data-id="' + thisgoods[i].orderid + '" data-ordersn = "' + thisgoods[i].ordersn + '" data-total="' + thisgoods[i].total + '" data-goodsname="' + thisgoods[i].goods[0].commodityname + '">付款</button>'
                                    order_state += '<button class="remover_order" data-id="' + thisgoods[i].orderid + '">取消订单</button>'
                                } else if (thisgoods[i].shippingstatus == 0 && thisgoods[i].paystatus == 0) {
                                    //order_state += '<button class="true_goods" id="contrue" data-id="' + thisgoods[i].orderid + '" >确认收货</button>'
                                    order_state += '<button class="see_wl"> 查看物流</button>'
                                } else if (thisgoods[i].orderstatus == 2) {
                                    order_state += '<button class="remover_order">删除订单</button>'
                                } else if (thisgoods[i].orderstatus == 3) {
                                    order_state += '<button class="complete_order">完成订单</button>'
                                } else if (thisgoods[i].shippingstatus == 1 && thisgoods[i].paystatus == 0) {
                                    order_state += '<button class="loader_goods">等待发货</button>'
                                }
                                order_state += '</div>'
                            } else if (thisgoods[i].goods.length == 1) {
                                order_state += '<li class="mui-table-view-cell mui-transitioning state_li" >'
                                order_state += '<div class="mui-slider-handle">'
                                order_state += ' <div class="mui-table-cell state_flex" data-id="' + thisgoods[i].orderid + '">'
                                order_state += '<div class="state_img" >'
                                order_state += '<img src="' + thisgoods[i].goods[0].commoditypic + '" alt="">'
                                order_state += '</div>'
                                order_state += '<div class="state_right">'
                                function accMul(arg1, arg2) {
                                    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                                    try {
                                        m += s1.split(".")[1].length
                                    } catch (e) {
                                    }
                                    try {
                                        m += s2.split(".")[1].length
                                    } catch (e) {
                                    }
                                    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
                                }

                                order_state += '<span class="price" style="color: red;">实付款: ¥<span class="state_price">' + accMul(thisgoods[i].goods[0].goodsnum, thisgoods[i].goods[0].goodsprice) + '</span></span>'
                                order_state += '<p class="state_proName mui-ellipsis-2">' + thisgoods[i].goods[0].commodityname + '<span class="state_size_g">' + thisgoods[i].goods[0].speckeyname + '</span>&nbsp;X' + thisgoods[i].goods[0].goodsnum + '</p>'
                                order_state += '</div>'
                                order_state += '</div>'
                                order_state += '<div ></div>'
                                order_state += '</div>'
                                order_state += '<div class="state_button">'
                                if (thisgoods[i].paystatus == 1) {
                                    order_state += '<button class="remover_order" data-id="' + thisgoods[i].orderid + '">取消订单</button>'
                                    order_state += '<button class="pay" data-id="' + thisgoods[i].orderid + '" data-ordersn = "' + thisgoods[i].ordersn + '" data-total="' + thisgoods[i].total + '" data-goodsname="' + thisgoods[i].goods[0].commodityname + '">付款</button>'
                                } else if (thisgoods[i].shippingstatus == 0 && thisgoods[i].paystatus == 0) {
                                    //order_state += '<button class="true_goods" id="contrue" data-id="' + thisgoods[i].orderid + '" >确认收货</button>'
                                    order_state += '<button class="see_wl">查看物流</button>'
                                } else if (thisgoods[i].orderstatus == 2) {
                                    order_state += '<button class="remover_order">删除订单</button>'
                                } else if (thisgoods[i].orderstatus == 3) {
                                    order_state += '<button class="complete_order">完成订单</button>'
                                } else if (thisgoods[i].shippingstatus == 1 && thisgoods[i].paystatus == 0) {
                                    order_state += '<button class="loader_goods">等待发货</button>'
                                }
                                order_state += '</div>'
                                order_state += '</li>'
                            } else if (thisgoods.length == 0) {
                                mui.toast('没有商品了哦');
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
        //确认收货
        //$('body').on('click','.true_goods', function() {
        //    var orderid = $(this).data('id');
        //    var btnArray = ['否', '是'];
        //    mui.confirm('确认收货吗？', '', btnArray, function(e) {
        //        if (e.index == 1) {
        //            $.ajax({
        //                url:url+'/api/api-bin/wjcm/datalist/orderConfirmReceipt.action',
        //                data:{
        //                    orderid:orderid,
        //                    access_code: access_code
        //                },
        //                success: function (data) {
        //                    console.log(data);
        //                    if(data.success == 1){
        //                        mui.toast('已确认收货')
        //                    }
        //                }
        //            })
        //        } else {
        //
        //        }
        //    })
        //});
        //取消订单
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
                        window.top.location = window.location.href
                    }
                }
            })
        })
        //支付
        $('body').on('click', '.pay', function () {
            var ordersn = $(this).data('ordersn');
            var total = $(this).data('total');
            var goodsname = $(this).data('goodsname');
            window.top.location = 'order_pay.html?key=' + ordersn + '&price=' + total + '&goodsname=' + goodsname;
        })
        //查看订单信息事件
        $('body').on('tap', '.state_flex', function () {
            var orderid = $(this).data('id');
            window.top.location = "order_info.html?key=" + orderid
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})
