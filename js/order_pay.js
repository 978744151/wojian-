$(function () {

    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    var ordersn = tools.getParam('key');
    var price = tools.getParam('price');
    var goodsname = tools.getParam('goodsname');
    if (access_code) {
        $('input').on('click', function () {
            console.log($(this))
            $(this).prop('checked',true).parents().siblings().find('input').prop('checked',false)
        })
        console.log(1)
        $('.pay_button').on('click', function () {
            console.log(1)
            if ($('.pay_zfb_check:checked').length > 0) {
                window.top.location = 'zfb_pay.html?key=' + ordersn + '&price=' + price + '&goodsname='+goodsname;
            }
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})
