$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    //初始化功能
    mui('.mui-numbox').numbox()
    var key = tools.getParam('key')
//渲染
    $.ajax({
        type: 'get',
        url: url + '/api/api-bin/wjcm/entry/datalist/queryOneGoods.action?shopcode=10000000&barcode=' + key,
        data: {
            userid: userid
        },
        success: function (data) {
            console.log(data)
            if (data.success == 1) {
                var iscollection = data.result.goods.iscollection;
                console.log(iscollection)
                var pro_img = data.result.goods.commoditysmallpic;
                pro_img = pro_img.split(';');
                data.pro_img = pro_img;
                var morespec = data.result.goods.morespec;
                var barcode = data.result.goods.barcode;
                var defaultspec = data.result.defaultspec
                var commoditypic = data.result.goods.commoditypic;
                var com_arr = commoditypic.split('com')[1];
                var marketprice = data.result.goods.saleprice;
                var goodsprice = data.result.goods.buyprice;
                var morespec = data.result.goods.morespec;
                var spec = data.result.goods.spec;
                var html = template('tpl', data);
                $('.container').html(html);
                //var html1 = template('tpl1',data)
                //$('.pro_tpl2').html(html1)
                var html1 = '';
                if (morespec == 1) {
                    if (data.result.goods.storage == 0) {
                        html1 += '<p>价格<span style="margin-left: 10px;">' + data.result.goods.buyprice + '</span></p>';
                        html1 += '<p>库存 <span class="storecount" style="margin-left: 10px;font-size: 16px;">缺货</span></p>';
                        $('.car_button,.car_fast_buy').attr('disabled', 'disabled')
                    } else {
                        html1 += '<p>价格:<span style="margin-left: 10px;">' + data.result.goods.buyprice + '</span></p>';
                        html1 += '<p>库存: <span class="storecount" style="margin-left: 10px;">' + data.result.goods.storage + '</span></p>';
                        $('.car_button,.car_fast_buy').removeAttr('disabled', 'disabled')
                    }
                } else if (morespec == 0) {
                    if (data.result.defaultspec.storecount == 0) {
                        html1 += '<p>价格<span style="margin-left: 10px;">' + data.result.goods.buyprice + '</span></p>';
                        html1 += '<p>库存 <span class="storecount" style="margin-left: 10px;font-size: 16px;">缺货</span></p>';
                        $('.car_button,.car_fast_buy').attr('disabled', 'disabled')
                    } else {
                        html1 += '<p>价格:<span style="margin-left: 10px;">' + data.result.goods.buyprice + '</span></p>';
                        html1 += '<p>库存: <span class="storecount" style="margin-left: 10px;">' + data.result.defaultspec.storecount + '</span></p>';
                        $('.car_button,.car_fast_buy').removeAttr('disabled', 'disabled')
                    }
                }

                $('.pro_tpl2').html(html1);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
//layer弹框事件
                function layertrue() {

                }

                $('body').on('click', '.layer_open,.pro_button,.fast_buy', function (e) {
                    $.ajax({
                        type: 'get',
                        url: url + "/api/api-bin/wjcm/entry/datalist/queryGoodsSpec.action?barcode=" + barcode,
                        success: function (data) {
                            console.log(data);
                            data.barcode = barcode;
                            data.morespec = morespec;
                            data.defaultspec = defaultspec;

                            var layer_arr = [];
                            for (k in defaultspec) {
                                layer_arr.push(defaultspec[k]);
                            }
                            data.layer_arr = layer_arr;
                            var layer = '';

                            if (data.morespec == 0) {
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
                                layer += '<p>数量</p>';
                                layer += '<div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" data-numbox-max="100" style="margin-left: 10px;">';
                                layer += '<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>';
                                layer += '<input class="mui-numbox-input" type="number" class="pro_number"  />';
                                layer += '<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>';
                                layer += '</div>';
                                layer += '</div>';
                            } else {
                                layer += '<div class="layer">';
                                //layer += '<div style="display: flex; margin-top: 3px;">';
                                //layer += '<p>颜色</p>';
                                //layer += '<div class="pro_color"><span class="now">蓝色</span><span>黑色</span><span>黄色</span></span></div>';
                                //layer += '</div>'
                                layer += '<p>数量</p>';
                                layer += '<div class="mui-numbox" data-numbox-step="1" data-numbox-min="1" data-numbox-max="100" style="margin-left: 10px;">';
                                layer += '<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>';
                                layer += '<input class="mui-numbox-input" type="number" class="pro_number"  value=1/>';
                                layer += '<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>';
                                layer += '</div>';
                                layer += '</div>';
                                layer += '<div>';
                                layer += '</div>';
                            }
                            $('.pro_tpl1').html(layer);

                            $('.pro_layer').animate({
                                'bottom': 0
                            }, 200)
                            e.stopPropagation();
                            $(document).one('click', function () {
                                $('.pro_layer').animate({
                                    'bottom': -400
                                })
                            })
                            $('body').on('click', '.pro_layer', function (e) {
                                e.stopPropagation();
                            })
                            mui('.mui-scroll-wrapper').scroll({
                                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                            });
                            mui('.mui-numbox').numbox();//数字初始化
                            $('.layer').on('click', 'span', function (e) {
                                $(this).addClass('now').siblings().removeClass('now');
                                var str_arr = [];
                                for (var i = 0; i < $('span.now').length; i++) {
                                    var str = $('span.now').eq(i).text();
                                    str_arr.push(str);
                                }
                                str_arr = str_arr.join(',')
                                console.log(str_arr)
                                var pamas = {
                                    keyname: str_arr,
                                    barcode: data.barcode
                                }
//更改价格库存
                                updatespec()
                                function updatespec() {
                                    $.ajax({
                                        type: 'get',
                                        url: url + '/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
                                        data: pamas,
                                        success: function (data) {
                                            if (data.success == 1) {
                                                console.log(data);
                                                var html2 = '';
                                                if (data.result.goodspec) {
                                                    html2 += '<p>价格:<span style="margin-left: 10px;">' + data.result.goodspec.price + '</span></p>';
                                                    html2 += '<p>库存:<span class="storecount" style="margin-left: 10px;">' + data.result.goodspec.storecount + '</span></p>';
                                                    $('.car_button,.car_fast_buy').removeAttr('disabled', 'disabled')

                                                } else {
                                                    html2 += '<p>价格<span style="margin-left: 10px;"></span></p>';
                                                    html2 += '<p>库存 <span style="margin-left: 10px;font-size: 16px;">缺货</span></p>';
                                                    $('.car_button,.car_fast_buy').attr('disabled', 'disabled')
                                                }
                                                $('.pro_tpl2').html(html2);
                                                var sku = data.result.goodspec.sku;
                                                if (sku) {
                                                    $('.car_button').data('sku', sku)
                                                }
                                                $('.car_button').data('price', data.result.goodspec.price)
                                            } else {
                                                mui.toast('操作失败，请重新进行操作')
                                            }
                                        },
                                        error: function () {
                                            mui.toast('网络错误，请重新进行操作')
                                        }
                                    })
                                }
                            })
//添加购物车事件
                            if (access_code) {
                                var sku1 = data.defaultspec.sku || 0
                                $('.car_button').data('sku')
                                $('.car_button').on('click', '', function (e) {
                                    var sku = $(this).data('sku')
                                    var size = $('.pro_color').find('span.now').text();
                                    var speckeyname = morespec == 0 ? size : spec
                                    var number = mui('.mui-numbox').numbox().getValue();
                                    console.log(number)
                                    var storeage = $('.storecount').text()
                                    console.log(storeage);
                                    var commodityname = $('.pro_name').text();
                                    if (number > storeage) {
                                        mui.toast('库存不足');
                                        return false;
                                    }
                                    var data = {
                                        userid: userid,
                                        barcode: key,
                                        commodityname: commodityname,
                                        commoditypic: com_arr,
                                        marketprice: marketprice,
                                        goodsprice: $('.car_button').data('price') || goodsprice,
                                        goodsnum: number,
                                        speckeyname: speckeyname,
                                        sku: sku || sku1,
                                        morespec: morespec,
                                        defaultspec: defaultspec,
                                        access_code: access_code
                                    }
                                    console.log(data)
                                    $.ajax({
                                        type: 'post',
                                        url: url + '/api/api-bin/wjcm/datalist/addCarGoods.action',
                                        data: data,
                                        success: function (data) {
                                            console.log(data);
                                            if (data.success == 1) {
                                                mui.toast('添加成功');
                                                setTimeout(function () {
                                                    //window.location.href = "cart.html"
                                                }, 500)
                                            } else {
                                                mui.toast('添加失败');
                                            }
                                        },
                                        error: function () {
                                            mui.toast('请稍后再试');
                                        }
                                    })
                                })
                            } else {
                                mui.toast('你没有登陆')
                                setTimeout(function () {
                                    window.top.location = "landing.html"
                                }, 1000)
                            }

                        }
                    })
                })
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000
//自动轮播周期，若为0则不自动播放，默认为0；
                });
//加入购物车事件
//切割图片存入购物车


//    收藏功能
                collect()
                function collect() {
                    if (access_code) {
                        var data2 = {
                            userid: userid,
                            collectiontype: data.result.goods.categorycode,
                            useraccount: 'feifei',
                            collectioncontent: data.result.goods.barcode,
                            contentname: data.result.goods.commodityname,
                            contentpicture: com_arr,
                            contentprice: data.result.goods.buyprice,
                            access_code: access_code
                        }
                        $('.collect').on('click', function () {
                            $this = $(this);
                            $this.toggleClass('now');
                            if ($('.collect').hasClass('now')) {
                                $.ajax({
                                    type: 'get',
                                    url: url + '/api/api-bin/wjcm/collect/shop/collect.action?shopcode=10000000',
                                    data: data2,
                                    success: function (data) {
                                        if (data.success == 1) {
                                            console.log(data);
                                            mui.toast('添加成功')
                                        } else {
                                            mui.toast('添加失败')
                                        }
                                    },
                                    error: function () {
                                        mui.toast('网络错误，请重新进行操作')
                                    }
                                })
                            } else {
                                $.ajax({
                                    type: 'get',
                                    url: url + '/api/api-bin/wjcm/collect/shop/deleteUserCollection.action',
                                    data: {
                                        userid: userid,
                                        collectioncontent: data.result.goods.barcode,
                                        access_code: access_code
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        if (data.success == 1) {
                                            mui.toast('取消收藏成功')
                                        } else {
                                            mui.toast('取消收藏失败')
                                        }
                                    },
                                    error: function () {
                                        mui.toast('网络错误，请重新进行操作')
                                    }
                                })
                            }
                        })
                    } else {
                        mui.toast('你没有登陆')
                        setTimeout(function () {
                            window.top.location = "landing.html"
                        }, 1000)
                    }
                }

//浏览记录
                history()
                function history() {
                    var data3 = {
                        userid: userid,
                        historytype: data.result.goods.categorycode,
                        useraccount: 'feifei',
                        historycontent: data.result.goods.barcode,
                        contentname: data.result.goods.commodityname,
                        contentpicture: com_arr,
                        contentprice: data.result.goods.buyprice,
                        access_code: access_code
                    }
                    //console.log(data3);
                    $.ajax({
                        type: 'get',
                        url: url + '/api/api-bin/wjcm/history/shop/insertBrowsingHistory.action?shopcode=10000000',
                        data: data3,
                        success: function (data) {
                            //console.log(data)
                        }
                    })
                }
            } else {
                mui.toast('加载失败，请重新进行操作')
            }
        },
        error: function () {
            mui.toast('网络错误，请重新进行操作')
        }
    })

//    评论功能表头
    $('body').on('click', '.pro_header h4', function () {
        $(this).addClass('on').siblings().removeClass('on')
    })
    $('body').on('click', '.pro_header_h1', function () {
        $(this).parents().siblings('.pro_content').fadeIn().siblings('.pro_comment').fadeOut()
    })
    $('body').on('click', '.pro_header_h2', function () {
        $(this).parents().siblings('.pro_comment').fadeIn().siblings('.pro_content').fadeOut()
        rendercomment()
    })
    //评论ajax

    function rendercomment() {
        var thisgoods = []
        var barcode = tools.getParam('key')
        $.ajax({
            url: url + '/api/api-bin/wjcm/entry/datalist/queryGoodsComment.action',
            data: {
                barcode: barcode,
                pageApp: 1,
            },
            success: function (data) {
                console.log(data);
                if (data.success == 1) {
                    thisgoods = thisgoods.concat(data.result.queryGoodsComment)
                    var html = ''
                    if (thisgoods.length == 0) {
                        html += ' <p>此商品暂时没有评论</p> '
                    } else {
                        for (var i = 0; i < thisgoods.length; i++) {
                            html += ' <li>'
                            html += '<div class="mui-table-view-cell mui-media">'
                            html += '<img class="mui-media-object mui-pull-left" src="../images/zhifubao.png">'
                            html += '<div class="mui-media-body">'
                            html += '<span>' + thisgoods[i].username + '</span>'
                            html += '<p class="pro_time">' + thisgoods[i].createtime.substr(0, 11) + '</span>'
                            //html += '<div id="raty" data-score = "'+queryGoodsComment[i].goodsrank+'" ></div>'
                            if (thisgoods[i].goodsrank == 1) {
                                html += '<div id="raty">'
                                html += '<img src="star-on.png" alt="1" title="bad">&nbsp;'
                                html += '<img src="star-off.png" alt="2" title="poor">&nbsp;'
                                html += '<img src="star-off.png" alt="3" title="regular">&nbsp;'
                                html += '<img src="star-off.png" alt="4" title="good">&nbsp;'
                                html += '<img src="star-off.png" alt="5" title="gorgeous">'
                                html += '</div>'
                            }
                            else if (thisgoods[i].goodsrank == 2) {
                                html += '<div id="raty">'
                                html += '<img src="star-on.png" alt="1" title="bad">&nbsp;'
                                html += '<img src="star-on.png" alt="2" title="poor">&nbsp;'
                                html += '<img src="star-off.png" alt="3" title="regular">&nbsp;'
                                html += '<img src="star-off.png" alt="4" title="good">&nbsp;'
                                html += '<img src="star-off.png" alt="5" title="gorgeous">'
                                html += '</div>'
                            }
                            else if (thisgoods[i].goodsrank == 3) {
                                html += '<div id="raty">'
                                html += '<img src="star-on.png" alt="1" title="bad">&nbsp;'
                                html += '<img src="star-on.png" alt="2" title="poor">&nbsp;'
                                html += '<img src="star-on.png" alt="3" title="regular">&nbsp;'
                                html += '<img src="star-off.png" alt="4" title="good">&nbsp;'
                                html += '<img src="star-off.png" alt="5" title="gorgeous">'
                                html += '</div>'
                            }
                            else if (thisgoods[i].goodsrank == 4) {
                                html += '<div id="raty">'
                                html += '<img src="star-on.png" alt="1" title="bad">&nbsp;'
                                html += '<img src="star-on.png" alt="2" title="poor">&nbsp;'
                                html += '<img src="star-on.png" alt="3" title="regular">&nbsp;'
                                html += '<img src="star-on.png" alt="4" title="good">&nbsp;'
                                html += '<img src="star-off.png" alt="5" title="gorgeous">'
                                html += '</div>'
                            }
                            else if (thisgoods[i].goodsrank == 5) {
                                html += '<div id="raty">'
                                html += '<img src="star-on.png" alt="1" title="bad">&nbsp;'
                                html += '<img src="star-on.png" alt="2" title="poor">&nbsp;'
                                html += '<img src="star-on.png" alt="3" title="regular">&nbsp;'
                                html += '<img src="star-on.png" alt="4" title="good">&nbsp;'
                                html += '<img src="star-on.png" alt="5" title="gorgeous">'
                                html += '</div>'
                            }
                            html += '<p data-commentid="' + thisgoods[i].commentid + '" class="pro_del" style="position: absolute; bottom: 11px; right: 10px;">删除</p>'

                            html += '</div>'
                            html += '<div class="cnt_content">'
                            html += '<p style="color:black">' + thisgoods[i].content + '</p>'
                            html += '<div class="cnt_img">'
                            //html += '<img src="'+thisgoods[i].img +'" alt="" width: 200px;height:200px;>'
                            html += '</div>'
                            html += '</div>'
                            html += '</li> '

                        }
                    }
                    $('.comment_list').html(html)
                }
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
            rendercomment()
        }, 700)
    }
    $('body').on('click','.pro_index',function () {
        //setInterval(function () {
        //    $('#load').show()
        //})
        //setInterval(function () {
            window.parent.location.href="iframe.html?page=index"
        //},500)
        //setInterval(function () {
        //    $('#load').hide()
        //},500)
    })
    $('body').on('click','.pro_href_cart',function () {
        //setInterval(function () {
        //    $('#load').show()
        //})
        //setInterval(function () {
            window.parent.location.href="iframe.html?page=cart"
        //},500)
        //setInterval(function () {
        //    $('#load').hide()
        //},500)
    })
    if (access_code) {
        $('body').on('click', '.pro_del', function () {
            var commentid = $(this).data('commentid')
            console.log(commentid)
            $.ajax({
                url: url + '/api/api-bin/wjcm/datalist/deleteGoodsComment.action',
                data: {
                    commentid: commentid,
                    access_code: access_code,
                    userid: userid
                },
                success: function (data) {
                    if(data.success == 1){
                        rendercomment()
                    }
                }
            })
        })
    }

})
