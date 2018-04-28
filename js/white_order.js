$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if(access_code){
        render()
        function render() {
            var checked_arr = tools.getParam('key');
            var checked_price = tools.getParam('price');
            console.log(checked_arr)
            console.log(checked_price);
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/settlement.action',
                data: {
                    cartid: checked_arr,
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data)
                    data.checked_price = checked_price;
                    var goodsname = data.result.goods[0].commodityname;
                    console.log(goodsname)
                    if (data.success == 1) {
                        setTimeout(function () {
                            var site_layer = "";
                            if (data.result.userAddressList.length > 0) {
                                site_layer += "<div style='margin-bottom: 10px;'>";
                                site_layer += "<div class='qs_site_list'>";
                                site_layer += "<div class='qs_site_left'>";
                                site_layer += "<div class='qs_left'>";
                                site_layer += "<p class='qs_name'>" + data.result.userAddressList[0].consignee + "</p>";
                                site_layer += "<p>" + data.result.userAddressList[0].provincialurbanarea + data.result.userAddressList[0].address + "</p>";
                                site_layer += "</div>";
                                site_layer += "<div class='qs_right'>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "<div class='qs_site_right'>";
                                site_layer += "<p class='qs_number'>" + data.result.userAddressList[0].mobile + "</p>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "<div class='query_del'>";
                                site_layer += "<div>";
                                //site_layer += "<input type='checkbox' class='side_ck' checked='checked'>默认地址";
                                site_layer += "</div>";
                                site_layer += "<div>";
                                site_layer += "<i></i><span class='qs_edit'>编辑</span>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                            } else {
                                site_layer += "<div style='margin-bottom: 10px;'>";
                                site_layer += "<div class='qs_site_list'>";
                                site_layer += "<div class='qs_site_left'>";
                                site_layer += "<div class='qs_left '>";
                                site_layer += "<span>你还没有地址哦 请去添加地址 </span>";
                                site_layer += "</div>";
                                site_layer += "<div class='qs_right'>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "<div class='qs_site_right'>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "<div class='query_del'>";
                                site_layer += "<div>";
                                site_layer += "</div>";
                                site_layer += "<div>";
                                site_layer += "<span  class='add_site'>添加地址</span>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                                site_layer += "</div>";
                            }
                            $('.white_order_site').html(site_layer);
                            //window.location.reload()
                            $('.white_order_list').html(template('tpl', data));
                            $('.amount').html(template('tpl1', data));
                            //mui("#reload").pullRefresh().endPulldownToRefresh();

//点击编辑事件
                            $('body').on('click', '.qs_edit', function (e) {
                                //window.location.href = "querysite.html"
                                var layer = "";
                                layer += "<div class='header'>"
                                layer += "<span class='mui-icon mui-icon-back' style='margin-top: 10px;' onclick='history.go();'></span>";
                                layer += "<h4>选择收货地址</h4>";
                                layer += "<span style='position: absolute;top: 12px; right: 5px;' class='order_admin'>管理</span>";
                                layer += "</div>";
                                if (data.result.userAddressList.length > 0) {
                                    layer += "<div style='margin-top: 45px;'>";
                                    for (var i = 0; i < data.result.userAddressList.length; i++) {
                                        layer += "<div style='margin-top: 10px;' class='order_list'>";
                                        layer += "<div class='qs_site_list'>";
                                        layer += "<div class='qs_site_left'>";
                                        layer += "<div class='qs_left'>";
                                        layer += "<p class='qs_name'>" + data.result.userAddressList[i].consignee + "</p>";
                                        layer += "<p>" + data.result.userAddressList[i].provincialurbanarea + data.result.userAddressList[i].address + "</p>";
                                        layer += "</div>";
                                        layer += "<div class='qs_right'>";
                                        layer += "</div>";
                                        layer += "</div>";
                                        layer += "<div class='qs_site_right'>";
                                        layer += "<p class='qs_number'>" + data.result.userAddressList[i].mobile + "</p>";
                                        layer += "</div>";
                                        layer += "<div class='query_del'>";
                                        layer += "<div>";
                                        layer += "<span></span>";
                                        layer += "</div>";
                                        layer += "<div>";
                                        layer += "<i></i><span class='qs_edit'></span>";
                                        layer += "</div>";
                                        layer += "</div>";
                                        layer += "</div>";
                                        layer += "</div>";
                                    }
                                }
                                $('.order_tpl1').html(layer);
                                $('.order_layer').animate({
                                    'bottom': 0
                                }, 200)
                                //e.stopPropagation();
                                //$(document).one('click', function () {
                                //    $('.order_layer').animate({
                                //        'bottom': -100+'%'
                                //    })
                                //})
                                //$('body').on('click','.order_layer', function (e) {
                                //    e.stopPropagation();
                                //})
                            })
                        }, 300)

// 点击更换地址事件
                        $('body').on('click', '.order_list', function () {
                            var index = $(this).index();
                            console.log(index);
                            var order_layer = "";
                            order_layer += "<div style='margin-bottom: 10px;'>";
                            order_layer += "<div class='qs_site_list'>";
                            order_layer += "<div class='qs_site_left'>";
                            order_layer += "<div class='qs_left'>";
                            order_layer += "<p class='qs_name'>" + data.result.userAddressList[index].consignee + "</p>";
                            order_layer += "<p>" + data.result.userAddressList[index].provincialurbanarea + data.result.userAddressList[index].address + "</p>";
                            order_layer += "</div>";
                            order_layer += "<div class='qs_right'>";
                            order_layer += "</div>";
                            order_layer += "</div>";
                            order_layer += "<div class='qs_site_right'>"
                            order_layer += "<p class='qs_number'>" + data.result.userAddressList[index].mobile + "</p>";
                            order_layer += "</div>";
                            order_layer += "</div>";
                            order_layer += "<div class='query_del'>";
                            order_layer += "<div>";
                            //order_layer += "<input type='checkbox' class='side_ck' checked='checked'>默认地址";
                            order_layer += "</div>";
                            order_layer += "<div>";
                            order_layer += "<i></i><span class='qs_edit'>编辑</span>";
                            order_layer += "</div>";
                            order_layer += "</div>";
                            order_layer += "</div>";
                            $('.cart_settle').data("id", data.result.userAddressList[index].addressid);
                            $('.white_order_site').html(order_layer);
                            $('.order_layer').animate({
                                'bottom': -100 + "%"
                            }, 200)
                        })
                        if (data.result.userAddressList.length > 0) {
                            var adressid = data.result.userAddressList[0].addressid;//用户地址
//结算点击页面
                            $('.cart_settle').on('click', function () {
                                var new_adressid = $(this).data('id');
                                console.log(new_adressid);
                                var usernote = $('.pay_text').val();//用户备注
                                var data = {
                                    userid: userid,
                                    loginuserfullname: '小胖',
                                    addressid: new_adressid || adressid,
                                    cartid: checked_arr,
                                    total: checked_price,
                                    shippingprice: 0,
                                    totalamount: checked_price,
                                    orderamount: checked_price,
                                    usernote: usernote,
                                    access_code: access_code
                                }
                                console.log(data);
                                $.ajax({
                                    type: 'post',
                                    url: url + '/api/api-bin/wjcm/datalist/SubmitUserOrder.action',
                                    data: data,
                                    success: function (data) {
                                        console.log(data);
                                        if (data.success == 1) {
                                            var ordersn = data.result.ordersn
//跳转支付页面
                                            window.top.location = 'order_pay.html?key=' + ordersn + '&price=' + checked_price + '&goodsname='+goodsname;
                                        } else {
                                            mui.toast('操作失败，请重新进行操作');
                                        }
                                    },
                                    error: function () {
                                        mui.toast('请重新进行操作');
                                    }
                                })
                            })

                        } else {
                            mui.toast('请亲添加地址哦');
                        }
                    } else {
                        mui.toast('操作失败，请重新进行操作');
                    }
                },
                error: function () {
                    mui.toast('请重新进行操作');
                }
            })
        }
    }else{
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html";
        }, 1000)
    }

    //mui.init({
//    pullRefresh: {
//        container: "#reload",
//        down: {
//            auto: true,
//            callback: function pullfresh() {
//渲染购物车功能

})
//            }
//        }
//    }
//});


//新增地址
$('body').on('click', '.add_site', function () {
    console.log(1)
    window.top.location = "site.html";
})
//商品点击跳转页面
$('body').on('click', '.order_cart', function () {
    var index = $(this).data('id');
    window.top.location = 'product.html?key=' + index;
})
//管理页面
$('body').on('click', '.order_admin', function () {
    window.top.location= "querysite.html";
})
//添加新地址页面
$('body').on('click', '.car_fast_buy', function () {
    window.top.location = "site.html";
})