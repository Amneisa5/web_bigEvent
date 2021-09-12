$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#logOut').on('click',function(){
        layer.confirm('确定退出登录？',{icon:3,title:'提示'},function(index){
            localStorage.removeItem('token');
            location.href = '/大事件/login.html';
            layer.close(index);
        });
    });
});
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: 'my/userinfo',
        success: function (res) {
            if(res.status!=0){
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        },
        complete:function(res){
            if(res.responseJSON.status == 1){
                localStorage.removeItem('token');
                location.href = '/大事件/login.html';
            }
        }
    });
};
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name);
    if(user.user_pic!=""){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $(".text-avatar").hide();
    }
    else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
};
