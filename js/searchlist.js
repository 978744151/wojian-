var date = {
    name: '',
    shopcode: 10000000,
    pageApp: 1,
    orderkey: '',
    orderdesc: ''
}
function render(date) {
    $.ajax({
        type: 'get',
        url: url + '/api/api-bin/wjcm/entry/datalist/queryGoods.action',
        data: date,
        success: function (data) {
            console.log(data)
            if (data.success == 1) {
                var html = template('tpl', data);
                $('.sear_list').html(html)
            } else {
                mui.toast('操作失败，请重新进行操作')
            }
        },
        error: function () {
            mui.coast('服务器出错请重试')
        }
    })
}
$('body').on('click', '.goods-list', function () {
    console.log($(this));
    var id = $(this).data('id')
    console.log(id)
    window.top.location = 'product.html?key=' + id
})
var name = tools.getParam('key')
date.name = name
render(date)
//排序功能
$('.lt_sort').on('click', '.lt_sort>a', function () {
    var $span = $(this).find('span')
    $(this).addClass('on').siblings().removeClass('on')
    if ($span.hasClass('fa-angle-down')) {
        $span.removeClass('fa-angle-down').addClass('fa-angle-up')
    }
    else if ($span.hasClass('fa-angle-up')) {
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
$('.search_text').on('focus', function () {
    window.top.location = 'search.html'
})
