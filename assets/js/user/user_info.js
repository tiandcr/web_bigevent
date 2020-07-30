$(function() {

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    initUserInfo();
    //获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }

    //表单重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });
    //修改后提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })












})