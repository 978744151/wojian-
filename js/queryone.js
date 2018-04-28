$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if(access_code){
        site()
        var id = tools.getParam('id')//地址id
        $.ajax({
            type:'get',
            url:url+'/api/api-bin/wjcm/datalist/queryUserOneAddress.action',
            data:{
                addressid:id,
                access_code: access_code
            },
            success: function (data) {
                if(data.success == 1){
                    $('.site_city').val(data.result.UserOneAddress.provincialurbanarea)
                    $('.Indetail').val(data.result.UserOneAddress.address)
                    $('.siteName').val(data.result.UserOneAddress.consignee)
                    $('.site_number').val(data.result.UserOneAddress.mobile)
                }else{
                    mui.toast('操作失败，请重新进行操作')
                }
            },
            error: function(){
                mui.toast('请稍后再试')
            }
        })
        $('.sitesave').on('click', function () {
            var site_city = $('.site_city').val();
            var Indetail = $('.Indetail').val();
            var siteName = $('.siteName').val();
            var number = $('.site_number').val()
            var index = $('.radioclass').is(":checked") ? 0 : 1;
            var data = {
                addressid : id,
                userid : userid,
                consignee : siteName,
                country : '中国',
                provincialurbanarea : site_city,
                address : Indetail,
                mobile : number,
                isdefault : index,
                access_code: access_code
            }
            $.ajax({
                type:'get',
                url:url+'/api/api-bin/wjcm/datalist/editUserAddressInformation.action',
                data:data,
                success: function (data) {
                    console.log(data);
                    if(data.success == 1){
                        window.top.location = "querysite.html"
                    }else{
                        mui.toast('操作失败，请重新进行操作')
                    }
                },
                error: function (){
                    mui.toast('网络错误，请重新进行操作')
                }
            })
        })
    }else{
        mui.toast('你没有登陆')
        setTimeout(function () {
            window.top.location = "landing.html"
        }, 1000)
    }

})
