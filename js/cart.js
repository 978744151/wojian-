$(function () {
    //setTimeout(function () {
    //        $('#load').show()
    //})
    //setTimeout(function () {
        refreshPage();
        var access_code = localStorage.getItem('user');
        var userid = localStorage.getItem('userid');
        if (access_code) {
            render()
            spaetrue()
            update()
            delcart()
            updatechange()
            upatecheck()
            skip()
            function render() {
                $.ajax({
                    url: url + "/api/api-bin/wjcm/datalist/queryUserCarGoods.action",
                    data: {
                        userid: userid,
                        access_code: access_code
                    },
                    success: function (data) {
                        if (data.success == 1) {
                            console.log(data)
                            var html = template('tpl', data)
                            $('.goods-list').html(html)
                            var newprice = $('.cart_all').text()
                            data.price = newprice
                            mui('.mui-numbox').numbox()
                            $('.cart_all').text(' ')
                            $(':checked').prop('checked', false)
                            //修改购物车功能
                            $('body').on('click', '.btn_edit', function (e) {
                                var barcode = $(this).data('id');
                                var morespec = $(this).data('morespec');
                                var cardid = $(this).data('cardid')
                                var goodsnum = $(this).data('number')
                                $.ajax({
                                    type: 'get',
                                    url: url + '/api/api-bin/wjcm/datalist/queryCarGoodsSpec.action',
                                    data: {
                                        userid: userid,
                                        cartid: cardid,
                                        access_code: access_code
                                    },
                                    success: function (data) {
                                        console.log(data)
                                        //价格渲染
                                        //layer渲染
                                        var layer = '';
                                        var layer_arr = [];
                                        for (k in data.defaultspec) {
                                            layer_arr.push(data.defaultspec[k]);
                                        }
                                        if (morespec == 0) {
                                            var html1 = '';
                                            html1 += '<p>价格:<span style="margin-left: 10px;">' + data.defaultspec.price + '</span></p>';
                                            html1 += '<p>库存: <span style="margin-left: 10px;">' + data.defaultspec.storecount + '</span></p>';
                                            $('.pro_tpl2').html(html1);
                                            layer += '<div class="layer">';
                                            for (var k in data.goodspec) {
                                                layer += '<div style="display: flex; margin-top: 3px;">';
                                                layer += '<p>' + k + '</p>';
                                                layer += '<div class="pro_color">';
                                                for (var i in data.goodspec[k]) {
                                                    var index = layer_arr.indexOf(data.goodspec[k][i]);
                                                    if (index != -1) {
                                                        layer += '<span class="now">' + data.goodspec[k][i] + '</span>';
                                                    } else {
                                                        layer += '<span class="">' + data.goodspec[k][i] + '</span>';
                                                    }
                                                }
                                                layer += '</div>';
                                                layer += '</div>';
                                            }
                                            layer += '</div>';
                                            $('.pro_tpl1').html(layer);
                                            changespan()
                                            function changespan(){
                                                $('.layer').on('click', 'span', function (e) {
                                                    $(this).addClass('now').siblings().removeClass('now');
                                                    var str_arr = [];
                                                    for (var i = 0; i < $('span.now').length; i++) {
                                                        var str = $('span.now').eq(i).text();
                                                        str_arr.push(str);
                                                    }
                                                    str_arr = str_arr.join(',')//拼接规格参数
                                                    console.log(str_arr)
                                                    var pamas = {
                                                        keyname: str_arr,
                                                        barcode: barcode,
                                                    }
                                                    $.ajax({
                                                        type: 'get',
                                                        url: url + '/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
                                                        data: pamas,
                                                        success: function (data) {
                                                            if (data.success == 1) {
                                                                console.log(data);
                                                                var html2 = '';
                                                                if (data.result.goodspec) {
                                                                    html2 += '<p>价格:<span style="margin-left: 10px;" class="cart_layer_price">' + data.result.goodspec.price + '</span></p>';
                                                                    html2 += '<p>库存 <span style="margin-left: 10px;" class="storeage">' + data.result.goodspec.storecount + '</span></p>';
                                                                    $('.cart_true,.cart_detail').removeAttr('disabled', 'disabled');
                                                                } else {
                                                                    html2 += '<p>价格<span style="margin-left: 10px;"></span></p>';
                                                                    html2 += '<p>库存 <span style="margin-left: 10px;font-size: 16px;">缺货</span></p>';
                                                                    $('.cart_true,.cart_detail').attr('disabled', 'disabled');
                                                                }
                                                                $('.pro_tpl2').html(html2);

                                                                console.log(str_arr)
                                                                if (str_arr) {
                                                                    $('.cart_true').data('str_arr', str_arr);
                                                                }
                                                                var storeage = $(".storeage").text();
                                                                console.log(storeage);
                                                                $('.cart_true').data('storeage', storeage);
                                                                var layer_price = $(".cart_layer_price").text();
                                                                $('.cart_true').data('layer_price', layer_price);
                                                                $('.cart_true').data('barcode', barcode);
                                                                $('.cart_true').data('cardid', cardid);
                                                                $('.cart_true').data('goodsnum', goodsnum);
                                                                $('.cart_true').data('layer_price', layer_price);
                                                                if (storeage == 0) {
                                                                    $('.cart_true').attr('disabled', 'disabled')
                                                                } else {
                                                                    $('.cart_true').removeAttr('disabled', 'disabled')
                                                                }
                                                            } else {
                                                                mui.toast('加载失败，请重新进行操作或登陆');
                                                            }
                                                        },
                                                        error: function () {
                                                            mui.toast('网络错误，请重新进行操作');
                                                        }
                                                    })
                                                })
                                            }
                                            $('.pro_layer').animate({
                                                'bottom': 0
                                            }, 200)
                                            e.stopPropagation();
                                            $(document).one('click', function () {
                                                //console.log(1)
                                                $('.pro_layer').animate({
                                                    'bottom': -400
                                                }, function () {

                                                })
                                            })
                                            $('body').on('click', '.pro_layer', function (e) {
                                                e.stopPropagation();
                                            })
                                            mui('.mui-scroll-wrapper').scroll({
                                                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                                            });
                                            mui('.mui-numbox').numbox();//数字初始化
                                        } else {
                                            mui.toast('没有更多规格哦')
                                        }

                                    },
                                    error: function () {
                                        mui.toast('加载失败，请重新进行操作或登陆');
                                    }
                                })
                            })
                        } else {
                            mui.toast('加载失败，请重新进行操作或登陆');
                        }
                    }
                })
            }
            //结算购物车功能
            function totle() {
                var price = 0;
                $(".ck:checked").each(function (e, i) {
                    var morespec = $(this).data('morespec')
                    console.log(morespec)
                    var specstorage = $(this).data('specstorage');
                    console.log(specstorage)
                    var goodprice = $(this).data('price');
                    console.log(goodprice)
                    var goodsnumber = $(this).parent().parent().find('.mui-numbox-input').val();
                    var storage = $(this).data('storage')
                    price += goodprice * goodsnumber
                    console.log(price)
                    if (morespec == 1) {
                        if (parseInt(goodsnumber) > parseInt(storage)) {
                            mui.toast('你所选的数量大于库存')
                            $('.cart_settle').attr('disabled', 'disabled')
                        } else {
                            $('.cart_settle').removeAttr('disabled', 'disabled')
                        }
                    } else {
                        if (parseInt(goodsnumber) > parseInt(specstorage)) {
                            mui.toast('你所选的数量大于库存')
                            $('.cart_settle').attr('disabled', 'disabled')
                        } else {
                            $('.cart_settle').removeAttr('disabled', 'disabled')
                        }
                    }

                })
                $('.cart_all').html(price.toFixed(2));
            }

            //规格确认
            function spaetrue(){
                var $that = $(this);
                $('.cart_true').on('click', function () {
                    var str_array = $(this).data('str_arr');
                    var cardid = $(this).data('cardid');
                    var goodsnum = $(this).data('goodsnum')
                    var barcode = $(this).data('barcode')
                    var data = {
                        barcode: barcode,
                        keyname: str_array,
                        userid: userid,
                        goodsnum: goodsnum,
                        cartid: cardid,
                        access_code: access_code
                    }
                    console.log(data)
                    $.ajax({
                        url: url + '/api/api-bin/wjcm/datalist/updateCartSpec.action',
                        data: data,
                        success: function (data) {
                            if(data.success == 1){
                                render()
                            }
                        }
                    })
                    $('.pro_layer').animate({
                        'bottom': -400
                    });
                })
            }


//用户修改数量
            function update(){
                $('body').on('change', '.mui-numbox-input', function () {
                    var price = 0;
                    var sku = $(this).data('stu')
                    var index = $(this).data('id')
                    var number = $(this).val()
                    $.ajax({
                        type: 'get',
                        url: url + '/api/api-bin/wjcm/datalist/updateUserCarGoods.action',
                        data: {
                            userid: userid,
                            cartid: index,
                            goodsnum: number,
                            sku: sku,
                            access_code: access_code
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success == 1) {
                                $('#loader').shCircleLoader();
                                totle();
                            }
                        },
                        error: function () {
                            mui.toast('请稍后再试');
                        }
                    })
                })
            }

//删除购物车功能
            function delcart(){
                $('body').on('click', '.btn_delete', function () {
                    console.log(1)
                    var index = $(this).data('id');
                    console.log(index);
                    $.ajax({
                        type: 'get',
                        url: url + '/api/api-bin/wjcm/datalist/deleteUserCarGood.action',
                        data: {
                            userid: userid,
                            cartid: index,
                            access_code: access_code
                        },
                        success: function (data) {
                            if (data.success == 1) {
                                mui.toast('删除成功');
                                render();
                            }
                        },
                        error: function () {
                            mui.toast('请稍后再试');
                        }
                    })
                })
            }

//改变购物车按钮功能
            function upatecheck(){
                $('body').on('change', '.ck', function () {
                    var ck_length = $(".ck:checked").length;
                    console.log(ck_length)
                    var checked = $(".ck").length;

                    if (ck_length == checked) {
                        $('.foot_ck').prop("checked", true);
                    } else {
                        $('.foot_ck').prop("checked", false);
                    }
                    totle()
                })
            }
//改变购物车按钮功能
            function updatechange(){
                $('.foot_ck').on('change', function () {
                    if ($(this).prop('checked')) {
                        $('.ck').prop("checked", true);
                    } else {
                        $('.ck').prop("checked", false);
                    }
                    totle();
                })
            }
//跳转事件
            function skip(){
                $('body').on('click', '.car_li', function () {
                    var index = $(this).data('id');
                    window.top.location = 'product.html?key=' + index;
                })

                $('body').on('click', '.cart_settle', function () {
                    if ($(".ck:checked").length == 0) {
                        mui.toast('亲,还没有选择商品哦')
                    } else {
                        var checked_arr = [];
                        var checked_price = $('.cart_all').text()
                        for (var i = 0; i < $(".ck:checked").length; i++) {
                            var checked = $('.ck:checked').eq(i).data('id')
                            checked_arr.push(checked)
                        }
                        checked_arr = checked_arr.join(',')
                        console.log(checked_arr)
                        window.top.location = 'white_order.html?key=' + checked_arr + '&price=' + checked_price;
                    }
                })
            }
        } else {
            mui.toast('你没有登陆')
            setTimeout(function () {
                window.top.location = "landing.html"
            }, 1000)
        }
    //},400)
    //setTimeout(function () {
    //    $('#load').hide()
    //},400)
})

