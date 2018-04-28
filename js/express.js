$(function () {
    var access_code = localStorage.getItem('user');
	console.log(access_code)
    var userid = localStorage.getItem('userid');
    if (access_code) {
        var shipsn = tools.getParam('shipsn');
        console.log(shipsn)
        var shipcode = tools.getParam('shipcode')
        var shippingname = tools.getParam('shippingname');
        $.ajax({
            type: 'get',
            url: url + '/api/api-bin/wjcm/datalist/queryExpressLogisticsInfo.action',
            data: {
                shippercode: shipcode,
                logisticcode: shipsn,
				access_code:access_code
            },
            success: function (data) {
                //console.log(data)
                //console.log(data.result.LogisticsInfo)
                var LogisticsInfo = JSON.parse(data.result.LogisticsInfo)
                console.log(LogisticsInfo)
                var Traces = LogisticsInfo.Traces
                var html = "";
                for(var k in Traces){
                    html+='<li>'
                    html+='<p>'
                    html+='<span>'+Traces[k].AcceptTime+'</span>'
                    html+='<span>'+Traces[k].AcceptStation+'</span>'
                    html+='</p>'
                    html+='</li>'
                }
                $('.exp_info_ul').html(html)
                $('.order_bh').html(shipsn)
                $('.express').html(shippingname+":")
            },
            error: function () {
                mui.toast('网络错误，请重新进行操作')
            }
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})