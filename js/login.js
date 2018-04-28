var verifySecond = 60; //定时器时间
var yz_timer; //定时器
window.onload = function(){
    yz_m()
}
function yz_m(){
    $('.yz_m').on("click",function(){
        var phonenum = $(".d_phone").val();
        console.log(phonenum);
        var vericode =  $(".d_pass").val();
        if(phonenum == ""){
            mui.toast('请填写手机号')
            return false
        }
        else if(phonenum.toString().length != 11){
            mui.toast('请填写正确的手机号')
            return false
        }
        if(phonenum.toString().length == 11){
            $.ajax({
                url:url+'/api/api-bin/wyy/entry/sendYzm.action',
                type:'get',
                data:{
                    phonenumber: phonenum,
                    type : 1,
                },
                success:function(data){
                    console.log(data);
                    if(data.success == 1){
                        mui.toast("发送成功");
                        $('.d_code').val(data.result.yzm)
                        nowSecond = verifySecond;
                        $('.yz_m').unbind("click");
                        $('.yz_m').html('重新发送('+nowSecond+')');
                        yz_timer = setInterval(function(){
                            nowSecond--;
                            if(nowSecond <= 0){
                                $('.yz_m').bind("click");
                                $('.yz_m').html('获取验证码');
                                yz_m();
                                clearInterval(yz_timer)
                                yz_timer = null;
                            }else{
                                $('.yz_m').html('重新发送('+nowSecond+')');
                            }
                        },1000)
                    }else{
                        mui.toast("操作错误，请稍后再试")
                    }
                },
                error:function(){
                    mui.toast("网络错误，请稍后再试")
                }
            })
        }
    })
}
$('.checkbox').on('click', function () {
    $('.checkbox').prop('checked',false)
    $(this).prop('checked',true)
})
$('.d_Login').on('click', function () {
    console.log(1)
    var phonenum = $(".d_phone").val();
    var vericode =  $(".d_code").val();
    var password = $('.d_pass').val();
    var nike_name = $('.nike_name').val();
    var checked = $(':checked').val();
    var nike_age = $('.nike_age').val()
    if(password.toString().length < 6){
        mui.toast('密码不能小于六位数')
        return false
    }
    var data = {
        phonenumber:phonenum,
        yzm : vericode,
        password : password,
        nickname : nike_name,
        usersex : checked,
        age : nike_age
    }
    console.log(data)
    $.ajax({
        type:'post',
        url:url+'/api/api-bin/wyy/entry/reg.action',
        data:data,
        success: function (data) {
            console.log(data);
            if(data.success == 1){
                mui.toast('注册成功')
                window.location.href = "landing.html"
            }else{
                mui.toast('注册失败')
            }
        },
        error: function () {
            mui.toast('网络错误，请稍后再试')
        }
    })
})
$('.d_denglu').on('click', function () {
    window.top.location = "landing.html"
})