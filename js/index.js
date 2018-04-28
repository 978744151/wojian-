//页面开始进行的函数

$(document).ready(function(){
    refreshPage();
    banner()
    render()
    //首页轮播图
    //商品列表参数
    var pageApp = 1;
    var thisgoods = []
    function render(){
        $.ajax({
            type:'get',
            url:url+'/api/api-bin/wjcm/entry/datalist/queryAllGoods.action?shopcode=10000000',
            data:{
                pageApp : pageApp
            },
            success:function (data) {
                console.log(data)
                if(data.success == 1){
                    thisgoods = thisgoods.concat(data.result.goods)
                    console.log(thisgoods);
                    var createFragment = function() {
                        var html = "";
                        for(var i = 0;i<thisgoods.length;i++){
                            html += "<div class='goods-item' data-id='"+thisgoods[i].barcode+"'>"
                            html += "<div class='items_img'>"
                            html += "<img  src ="+thisgoods[i].commoditypic+"  class='MUI_Lazy' alt='' >"
                            html += "</div>"
                            html += "<div class='info'>"
                            html += "<p class='price'>"+thisgoods[i].commodityname+"</p>"
                            html += "<p class='sale'>"
                            html += "<span>价格"+thisgoods[i].buyprice+"</span>"
                            html += "<span>销量"+parseInt(thisgoods[i].totalsale)+"件</span>"
                            html += "</p>"
                            html += "</div>"
                            html += "</div>"
                        }
                        $('.goods-list').html(html);
                    }
                    createFragment()
                }else{
                    mui.toast('加载失败，稍后进行操作')
                }
            },
            error: function () {
                mui.toast('加载失败，稍后进行操作')
            }
        })
    }

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
            mui('#pull').pullRefresh().endPullupToRefresh();
            pageApp++
            render()
        }, 700)
    }
})
function banner(){
    $.ajax({
        type:"get",
        url:url+'/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
        success: function (data) {
            if(data.success == 1){
                console.log(data);
                var html = template("tpl", data);
                $('.index_banner').html(html);
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            }else{
                mui.toast('操作失败，请重新进行操作')
            }
        },
        error: function (){
            mui.toast('网络错误，请重新进行操作')
        }
    })
}

$('body').on('tap','.goods-item', function () {
    var index = $(this).data('id');
    window.top.location = 'product.html?key='+index+'&time='+((new Date()).getTime());
})
$('body').on('tap','.in_banner', function () {
    console.log($(this))
    var index = $(this).data('id');
    window.top.location = 'product.html?key='+index+'&time='+((new Date()).getTime());
})





