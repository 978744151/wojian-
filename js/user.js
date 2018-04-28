    $(function () {
        refreshPage();
    })
    var username = localStorage.getItem('username');
    var portraiturl = localStorage.getItem('portraiturl');
    $('.user_img').attr('src',portraiturl);
    $('.username').html(username)
