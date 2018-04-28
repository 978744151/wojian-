$(function () {
    var access_code = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');
    if (access_code) {
        render()
        function render() {
            $.ajax({
                type: 'get',
                url: url + '/api/api-bin/wjcm/datalist/queryUserAddress.action',
                data: {
                    userid: userid,
                    access_code: access_code
                },
                success: function (data) {
                    console.log(data);
                    if (data.success == 1) {
                        var html = template('tpl', data)
                        $('.quertsite_list').html(html)
                    } else {
                        mui.toast('操作失败，请重新进行操作')
                    }
                },
                error: function () {
                    mui.toast('网络错误，请重新进行操作')
                }
            })
        }

//编辑
        $('body').on('click', '.qs_edit', function () {
            $this = $(this)
            var addressid = $(this).data('id')
            window.top.location = "queryone.html?id=" + addressid
        })
//删除
        $('body').on('click', '.qs_del', function () {
            $this = $(this)
            var addressid = $(this).data('id')
            console.log(addressid)
            var btnArray = ['否', '是'];
            mui.confirm('确认删除地址吗？', '', btnArray, function (e) {
                if (e.index == 1) {
                    $.ajax({
                        type: 'get',
                        url: url + '/api/api-bin/wjcm/datalist/delUserAddressInformation.action',
                        data: {
                            addressid: addressid,
                            access_code: access_code
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.success == 1) {
                                render()
                            } else {
                                mui.toast('操作失败，请重新进行操作')
                            }
                        },
                        error: function () {
                            mui.toast('网络错误，请重新进行操作')
                        }
                    })
                    mui.toast('删除成功')
                } else {

                }
            })
        })
//设为默认
        $('body').on('change', '.side_ck', function () {
            $this = $(this)
            var addressid = $(this).data('id')
            var index = $this.is(":checked") ? 0 : 1;
            $.ajax({
                type: 'post',
                url: url + '/api/api-bin/wjcm/datalist/defaultUserAddressInfo.action?',
                data: {
                    addressid: addressid,
                    userid: userid,
                    isdefault: index,
                    access_code: access_code
                },
                success: function (data) {
                    if (data.success == 1) {
                        mui.toast('设置成功')
                        render()
                    } else {
                        mui.toast('操作失败，请重新进行操作')
                    }
                },
                error: function () {
                    mui.toast('请稍后再试')
                }
            })
        })
    }
})
