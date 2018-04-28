var id = tools.getParam('key');
var name = tools.getParam('name');
var level= tools.getParam('level');
var pageApp = 1
//渲染页面
var thisgoods = []
function render(){
    $.ajax({
        type:'get',
        url:url+'/api/api-bin/wjcm/entry/datalist/queryGoodsByType.action?shopcode=10000000',
        data:{
            categorycode : '02',
            categoryname : "电视机",
            level : 1,
            pageApp : pageApp
        },
        success: function (data) {
            console.log(data);
            if(data.success == 1){
                thisgoods = thisgoods.concat(data.result.goodsbycat)
                console.log(thisgoods);
                var html = ""
                if(thisgoods.length == 0){
                    html +="<p style='margin-left: 10px; margin-top: 10px;'>没有找到相关的宝贝</p>"
                }else{
                    for(var i =0;i<thisgoods.length;i++) {
                        html += ' <div class="mui-card goods-list" data-id="'+thisgoods[i].barcode+'">'
                        html += ' <div class="mui-card-content">'
                        html += '<div class="mui-card-content-inner">'
                        html += '<img src="'+thisgoods[i].commoditypic+'" class="thumb_img">'
                        html += ' <div class="info"><span>'+thisgoods[i].commodityname+'</span>'
                        html += '<div class="box">'
                        html += ' <span class="price">$'+thisgoods[i].buyprice+'</span>'
                        html += '<span href="#">销量:'+thisgoods[i].totalsale+'</span>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                    }
                }
                //var html = template('tpl',data);
                $('.sear_list').html(html)
            }else{
                mui.toast('加载失败，请重新进行操作');
            }
        },
        error: function () {
            mui.toast('网络错误，请重新进行操作');
        }
    })
}
render()
mui.init({
    swipeBack: false,
    pullRefresh : {
        container:'#pull',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
        up: {
            //auto : true,
            height:100,
            contentrefresh: '正在加载...',
            contentnomore:'没有更多数据了',
            callback: pullupRefresh
        }
    }
});
function pullupRefresh() {
    setTimeout(function () {
        pageApp++
        render()
        mui('#pull').pullRefresh().endPullupToRefresh();
    }, 1000)
}
//排序页面
$('.lt_sort').on('click','.lt_sort>a',function () {
    var $span = $(this).find('span')
    $(this).addClass('on').siblings().removeClass('on')
    if($span.hasClass('fa-angle-down')){
        $span.removeClass('fa-angle-down').addClass('fa-angle-up')
    }
    else if($span.hasClass('fa-angle-up')){
        $span.removeClass('fa-angle-up').addClass('fa-angle-down')
    }
    var val = $(this).data('type')
    var order = $span.hasClass('fa-angle-down') ? "desc" : "asc";
    console.log(order)
    console.log(val)
    date.orderkey = val
    date.orderdesc = order
    console.log(date)
    render(date)
})
//跳转商品页面
$('body').on('click','.goods-list', function () {
    console.log($(this));
    var id = $(this).data('id')
    console.log(id)
    window.top.location = 'product.html?key='+id
})
