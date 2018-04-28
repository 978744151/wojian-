//初始化滚动效果
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false//去除滚动条
});
//轮播图效果

$(function() {
    FastClick.attach(document.body);
});
//下拉刷新

var tools = {
//获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        return obj;
    },
    getParam:function (key) {
        return this.getParamObj()[key];
    },
    checkLogin:function (data) {
        if(data.success != 1){
            location.href = "login.html";
        }
    }
}

var url = 'https://mall.wojianwang.com'

//登陆
function login(){
    $('.d_denglu').on('click', function () {
        var phonenum = $(".d_phone").val();
        var vericode =  $(".d_pass").val();
        var password = $('.d_pass').val()
        if(phonenum.toString().length != 11){
            mui.toast('请填写正确的手机号')
            return false
        }
        $.ajax({
            type:'get',
            url:url+'/api/api-bin/wyy/entry/userLogin.action',
            data:{
                phonenumber : phonenum,
                password : password,
                deviceid : '1111',
                type : 1
            },
            success: function (data) {
                console.log(data);
                if(data.success == 1){
                    localStorage.setItem('user',data.result.access_code);
                    localStorage.setItem('userid',data.result.user_info.userid);
                    localStorage.setItem('username',data.result.user_info.nickname);
                    localStorage.setItem('portraiturl',data.result.user_info.portraiturl);
                    mui.toast('登陆成功')
                    setTimeout(function () {
                        window.location.href = "iframe.html?page=index"
                    },500)
                }else{
                    mui.toast('密码或者手机号输入错误')
                }
            },
            error: function () {
                mui.toast('网络错误，请稍后再试')
            }
        })
    })
    $('.d_login').on('click', function () {
        window.top.location = "login.html"
    })
}

function navSetOn(op){
    /*
     $('.nav_li').removeClass('on');
     $('.nav_li').each(function(){
     var src = $(this).attr('off');
     $(this).find('img').attr('src',src);
     });
     */
    if($('#'+op).length>0){
        $('.lt_footer li').removeClass('on');
        $('.lt_footer li').each(function(){
            var src = $(this).attr('off');
            $(this).find('img').attr('src',src);
        });
        $('#'+op).addClass('on');
        var src = $('#'+op).attr('on');
        $('#'+op).find('img').attr('src',src);
    }

}

function refreshPage(){
    var sessionStorage=window.sessionStorage;
    var index=location.href.lastIndexOf("/");
    if(index!=-1){
        var href=location.href.substring(index+1);
        sessionStorage.setItem("refreshPage",href);
    }
}
//跳转页面
function locationview(viewname,page){
    window.parent.navSetOn(viewname);
    var url = page!='' ? viewname + '.html?page='+page : viewname + '.jsp';
    window.top.location = url;
    if(hasClass('.indexiframe')){

    }
}


//更换地址
function site(){
    $('body').on('click','.site_city',function () {
        console.log(1)
        var index = layer.open({
            type: 1
            ,index:2
            ,content: "<div id='target' data-toggle='distpicker' style='display:flex; justify-content: space-between'>" +
            "<div style='display: flex;'>" +
            '<select data-province="选择省" class="province"></select>' +
            '<select data-city="选择市" class="city"></select>' +
            '<select data-district="选择区" class="area"></select>' +
            "</div>" +
            "<div style='width: 50px;'>" +
            '<span class="site_true" >确定</span>' +
            "</div>" +
            '</div>'
            ,anim: 'up'
            ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 400px; padding:10px 0; border:none;'
            ,success: function(){
                $("#target").distpicker('reset', true);
                $('#target').on('change',function () {
                    console.log(1)
                    cityval = $('.city').val();
                    console.log(cityval)
                    province = $('.province').val();
                    console.log(province)
                    area = $('.area').val();
                    console.log(area)
                    $('.site_city').val(province+' '+cityval+' '+area);
                })
                $('.site_true').on('click', function () {
                    layer.close(index);
                })
            }
        });
    })
}
//尾部tab跳转


