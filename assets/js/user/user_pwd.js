$(function() {

    var layer = layui.layer;
    var form = layui.form;
    //密码校验规则
    form.verify({
        Pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            console.log(value, $('[name=newPwd]').val());
            if (value !== $('[name=newPwd]').val()) return '两次密码不一致！'
        }

    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('.layui-form')[0].reset();
            }
        })
    })
})