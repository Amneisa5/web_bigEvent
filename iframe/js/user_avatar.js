$(function(){
    var $image = $('#image');
    const options = {
        aspectRatio:1,
        preview:'.img-preview'
    };
    $image.cropper(options);
    $('#chooseImg').on('click',function(){
        $('#file').click();
    });
    $('#file').on('change',function(e){
        var fileList = e.target.files;
        if(fileList.length === 0){
            return layui.layer.msg('请选择照片')
        }
        var newImgUrl = URL.createObjectURL(fileList[0]);
        $image.cropper('destroy').attr('src',newImgUrl).cropper(options);  
    });
    $('#putImg').on('click',function(){
        var dataUrl = $image.cropper('getCroppedCanvas',{
            width:100,
            heigth:100
        }).toDataURL('image/png');
        $.ajax({
            method:'post',
            url:'my/update/avatar',
            data:{
                avatar:dataUrl
            },
            success:function(res){
                if(res.status!=0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新头像成功！');
                window.parent.getUserInfo();
            }
        })
    });
});
