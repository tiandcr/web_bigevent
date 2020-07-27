$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });


    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });


    //从layui中获取form属性
    var form = layui.form;

    //通过 form.verify() 函数自定义校验规则：
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) { //value是拿到的当前用户输入的值
            var pwd = $('#pwd').val();
            if (value !== pwd) {
                return '两次密码不一样'
            }
        }
    });

    //监听注册表单提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        };
        //发起ajax请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message);
            // console.log(res);
            //提交之后成功的化进行自动跳转到登录页面
            $('#link_login').click();
        })
    })

    //发起登录的ajax请求

    //监听提交事件
    $('#form_login').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function(res) {
            if (res.status !== 0) return layer.msg('登录失败')
            layer.msg('登录成功');
            localStorage.setItem('token', res.token);
            location.href = '/index.html';
            //  console.log(res.token);
        })
    })

})