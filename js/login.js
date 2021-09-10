$(function () {
    var form = layui.form;
    var layer = layui.layer;
    $("#link-reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link-login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    layui.use('form',function(){
        form.verify({
            // 校验两次密码是否一致
            repwd: function (value) {
                var pwd = $('#pwd').val();
                if (value !== pwd) {
                    return "两次输入的密码不一致!"
                }
            },
            // 自定义密码校验规则
            pwd: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
        });
    });
    // 监听登录表单事件
    $("#form-login").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'http://api-breakingnews-web.itheima.net/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("登录失败!")
                }
                layer.msg(res.message);
                localStorage.setItem('token',res.token);
                location.href = '/大事件/index.html';
            }
        });
    });
    // 监听注册表单事件
    $('#reg-form').on('submit',function(e){
        e.preventDefault();
        // 发送请求
        $.ajax({
            method:'post',
            url:'http://api-breakingnews-web.itheima.net/api/reguser',
            data:{
                username:$('#reg-form input[name=username]').val(),
                password:$('#reg-form input[name=password]').val()
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录!");
                $('#link-login').click();
            }
        });

    });
});