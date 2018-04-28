$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var orderid = tools.getParam('key');
        console.log(orderid)
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryOneOrder.action',
            data: {
                orderid: orderid,
                access_code: access_code
            },
            success: function (data) {
                console.log(data)
                var footer = "";
                footer += '<div class="exp_order_status">'
                if (data.result.record.shippingstatus == 1 && data.result.record.paystatus == 0) {
                    footer += '<button >等待发货</button>'
                    footer += '<button class = "refund">退款</button>'
                } else if (data.result.record.shippingstatus == 0 && data.result.record.paystatus == 0) {
                    //footer += '<button>已发货</button>'
                    footer += '<button class="exp_info" data-shipsn="' + data.result.record.shipsn + '" data-shipcode ="' + data.result.record.shippingcode + '" data-ordersn ="' + data.result.record.ordersn + '" data-shippingname ="' + data.result.record.shippingname + '">查看物流</button>'
                    footer += '<button class = "refund">退款</button>'
                } else if (data.result.record.paystatus == 1) {
                    footer += '<button class="pay"  data-ordersn = "' + data.result.record.ordersn + '" data-total="' + data.result.record.total + '" data-goodsname="' + data.result.record.goods[0].commodityname + '">去付款</button>'
                    footer += '<button class="close_order">取消订单</button>'
                }
                 footer += '</div>'
                $('.exp_footer').html(footer)
                var html = "";
                    html += '<div class="order_status">'
                    if (data.result.record.shippingstatus == 1 && data.result.record.paystatus == 0) {
                        html += '<p class="exp_oder_status"><span>订单状态：</span><span>等待发货</span></p>'
                    } else if (data.result.record.shippingstatus == 0 && data.result.record.paystatus == 0) {
                        html += '<p class="exp_oder_status"><span>订单状态：</span><span>已发货</span></p>'
                    } else if (data.result.record.paystatus == 1) {
                        html += '<p class="exp_oder_status"><span>订单状态：</span><span >未付款</span></p>'
                    }
                    html += '</div>'
                    html += '<div class="exp_adress">'
                    html += '<div class="exp_name">'
                    html += '<p><span>收货人:</span><span>'+ data.result.record.consignee+'</span></p>'
                    html += '<p>'+data.result.record.mobile+'</p>'
                    html += '</div>'
                    html += '<div>'
                    html += '<p>收货地址: <span class="order_info_adress">'+ data.result.record.address +'</span></p>'
                    html += '</div>'
                    html += '</div>'
                    for (var i = 0; i < data.result.record.goods.length; i++) {
                        html += '<li class="order_cart" data-barcode = "'+data.result.record.goods[i].barcode+'">'
                        html += '<div class="mui-slider-handle collect_li">'
                        html += '<div class="mui-table-cell">'
                        html += '<div class="cart_left">'
                        html += '<img src='+data.result.record.goods[i].commoditypic+' alt="">'
                        html += '</div>'
                        html += '<div class="cart_right">'
                        html += '<p class="mui-ellipsis-2 white_order_price">'+data.result.record.goods[i].goodsprice+'</p>'
                        html += '<p class="white_order_name">'
                        html += '<span class="price">'+data.result.record.goods[i].commodityname+'</span>'
                        html += '<span class="size">'+data.result.record.goods[i].speckeyname+'</span>'
                        html += '</p>'
                        html += '</div>'
                        html += '</div>'
                        html += '<span class="order_num">X'+data.result.record.goods[i].goodsnum+'</span>'
                        html += '</div>'
                        html += '</li>'
                    }
                    html += '<div class="exp_total">'
                    html += '<p>实付款: <span style="color: red">'+data.result.record.total+'</span></p>'
                    html += '<p>订单编号: <span>'+data.result.record.ordersn+'</span></p>'
                    html += '<p>创建时间: <span>'+data.result.record.createtime+'</span></p>'
                    html += '</div>'

                $('.order_info').html(html);
            }
        })
        //跳转详情页
        $('body').on('click','.order_cart', function () {
            var barcode = $(this).data('barcode');
            window.top.location = "product.html?key="+barcode;
        })
        //付款
        $('body').on('click','.pay', function () {
            var ordersn = $(this).data('ordersn');
            var total = $(this).data('total');
            var goodsname = $(this).data('goodsname');
            window.top.location = 'order_pay.html?key=' + ordersn + '&price=' + total + '&goodsname=' + goodsname;
        })
        //关闭订单
        $('body').on('click','.close_order', function () {
            var barcode = $(this).data('barcode');
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/deleteOrdersDetails.action',
                data: {
                    userid: userid,
                    orderid: orderid,
                    access_code: access_code
                },
                success: function (data) {
                    if (data.success == 1) {
                        mui.toast('操作成功');
                        setTimeout(function () {
                            window.top.location ="loadpay.html"
                        },1000)
                    }
                }
            })
        })
        //物流信息
        $('body').on('click','.exp_info', function () {
            var shipsn = $(this).data('shipsn');
            var shipcode = $(this).data('shipcode');
            var ordersn = $(this).data('ordersn');
            var shippingname = $(this).data('shippingname')
            window.top.location = "express.html?shipsn="+shipsn+"&shipcode="+shipcode+"&ordersn="+ordersn+"&shippingname="+shippingname;
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})