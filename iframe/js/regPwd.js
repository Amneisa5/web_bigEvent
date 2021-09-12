$(function () {
    form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value == $('#oldPwd').val()) {
                return "新旧密码不能一致"
            }
        },
        regpwd: function (value) {
            if (value !== $('#newPwd').val()) {
                return "两次输入密码不一致"
            }
        }
    });
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("密码重置成功!");
                $('.layui-form')[0].reset();
            }
        });
    });
    $('#reset01').on('click',function(e){
        e.preventDefault();
        $('.layui-form')[0].reset();
    })
});