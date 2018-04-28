$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if(access_code){
        render()
        function render() {
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/queryOrdersOkshipped.action',
                data: {
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data);
                    if(data.success == 1){
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
                                    order_state += '<span class="price" style="color: red;">合计¥<span class="state_price">' + data.result.record[i].total + '</span></span>'
                                    order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[j].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[j].speckeyname + '</span>&nbsp;X'+data.result.record[i].goods[0].goodsnum +'</p>'
                                    order_state += '</div>'
                                    order_state += '</div>'
                                    order_state += '<div ></div>'
                                    order_state += '</div>'
                                    order_state += '<div class="state_button">'
                                    order_state += '<button class="true_goods" id="contrue"  data-id="' + data.result.record[i].orderid + '">确认收货</button>'
                                    order_state += '<button class="see_goods" data-shipsn="' + data.result.record[i].shipsn + '" data-shipcode ="' + data.result.record[i].shippingcode + '" data-ordersn ="' + data.result.record[i].ordersn + '" data-shippingname ="' + data.result.record[i].shippingname + '">查看物流</button>'
                                    order_state += '</div>'
                                    order_state += '</li>'
                                }
                            } else if (data.result.record[i].goods.length == 1) {
                                    order_state += '<li class="mui-table-view-cell mui-transitioning state_li" >'
                                    order_state += '<div class="mui-slider-handle">'
                                    order_state += ' <div class="mui-table-cell state_flex" data-id="' + data.result.record[i].orderid + '">'
                                    order_state += '<div class="state_img" >'
                                    order_state += '<img src="' + data.result.record[i].goods[0].commoditypic + '" alt="">'
                                    order_state += '</div>'
                                    order_state += '<div class="state_right">'
                                    order_state += '<span class="price" style="color: red;">合计¥<span class="state_price">' + data.result.record[i].total + '</span></span>'
                                    order_state += '<p class="state_proName mui-ellipsis-2">' + data.result.record[i].goods[0].commodityname + '<span class="state_size_g">' + data.result.record[i].goods[0].speckeyname + '</span>&nbsp;X'+data.result.record[i].goods[0].goodsnum +'</p>'
                                    order_state += '</div>'
                                    order_state += '</div>'
                                    order_state += '<div ></div>'
                                    order_state += '</div>'
                                    order_state += '<div class="state_button">'
                                    order_state += '<button class="true_goods" id="contrue" data-id="' + data.result.record[i].orderid + '" >确认收货</button>'
                                    order_state += '<button class="see_goods" data-shipsn="' + data.result.record[i].shipsn + '" data-shipcode ="' + data.result.record[i].shippingcode + '" data-ordersn ="' + data.result.record[i].ordersn + '" data-shippingname ="' + data.result.record[i].shippingname + '">查看物流</button>'
                                    order_state += '</div>'
                                    order_state += '</li>'
                            } else if (data.result.record.length == 0){
                                mui.toast('你还没有商品哦');
                            }
                        }
                        $('.goods-list').html(order_state)
                    }
                },
                error: function (){
                    mui.toast('网络错误，请重新进行操作')
                }
            })
        }
        $('body').on('click','.true_goods', function() {
            var orderid = $(this).data('id');
            var btnArray = ['否', '是'];
            mui.confirm('确认收货吗？', '', btnArray, function(e) {
                if (e.index == 1) {
                    $.ajax({
                        url:url+'/api/api-bin/wjcm/datalist/orderConfirmReceipt.action',
                        data:{
                            orderid:orderid,
                            access_code: access_code
                        },
                        success: function (data) {
                            console.log(data);
                            if(data.success == 1){
                                render()
                                mui.toast('已确认收货')
                            }
                        }
                    })
                } else {

                }
            })
        });
        $('body').on('click','.see_goods', function () {
            var shipsn = $(this).data('shipsn');
            var shipcode = $(this).data('shipcode');
            var ordersn = $(this).data('ordersn');
            var shippingname = $(this).data('shippingname')
            window.top.location = "express.html?shipsn="+shipsn+"&shipcode="+shipcode+"&ordersn="+ordersn+"&shippingname="+shippingname;
        })
        $('body').on('click', '.state_flex', function () {
            var orderid = $(this).data('id');
            window.top.location = "order_info.html?key=" + orderid
        })
    }else{
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }

})