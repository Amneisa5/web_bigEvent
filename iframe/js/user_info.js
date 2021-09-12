$(function(){
    var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称必须在1~6个字符之间'
            }
        }
    });
    initUserInfo();
    $('#putData').on('click',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'my/userinfo',
            data:{
                id:$('#id').val(),
                nickname:$('#nickname').val(),
                email:$('#email').val()
            },
            success:function(res){
                if(res.status != 0 ){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("用户信息更新成功！");
                initUserInfo();
                window.parent.location.reload();
            }
        });
    });
    $('#reset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    });
});
function initUserInfo(){
    $.ajax({
        methos:'get',
        url:'my/userinfo',
        success:function(res){
            if(res.status != 0 ){
                return layui.layer.msg(res.message);
            }
            $('#id').val(res.data.id);
            $('#username').val(res.data.username);
            $('#nickname').val(res.data.nickname);
            $('#email').val(res.data.email);
        }
    })
}