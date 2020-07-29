$(function() {
    getUserInfo()
    var layer = layui.layer;
    //获取用户信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                renderAvatar(res.data)
            },
            complete: function(res) {
                // console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                    localStorage.removeItem('token');
                    location.href = '/login.html'
                }
            }
        });

    }

    //渲染用户头像 和头像中的文字
    function renderAvatar(user) {
        var name = user.username || user.nickname;
        $('#welcome').html('欢迎&nbsp; ' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').text(first).show();
        }
    };
    //点击退出
    $('#btnLogout').on('click', function() {
        layer.confirm('确定要退出吗?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })









})