$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    console.log(access_code)
    if (access_code) {
        site()
        $('.sitesave').on('click', function () {
            var site_city = $('.site_city').val();
            var Indetail = $('.Indetail').val();
            var siteName = $('.siteName').val();
            var number = $('.site_number').val()
            var index = $('.radioclass').is(":checked") ? 0 : 1;
            var data = {
                userid: userid,
                consignee: siteName,
                country: '中国',
                provincialurbanarea: site_city,
                address: Indetail,
                mobile: number,
                isdefault: index,
                access_code: access_code
            }
            console.log(data)
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/addUserAddressInformation.action',
                data: data,
                success: function (data) {
                    console.log(data)
                    if (data.success == 1) {
                        window.top.location = 'querysite.html'
                        //location.href = "querysite.html?retUrl="+location.href;
                    } else {
                        mui.toast('操作失败，请重新进行操作')
                    }
                },
                error: function () {
                    mui.toast('请稍后再试')
                }
            })
        })
    } else {
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }
})




