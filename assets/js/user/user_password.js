

$(function () {


    // 添加校监规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.layui-input-block [name=newPwd]').val()

            if (pwd !== value) {
                return '两次密码不一致'

            }
        }



    })
    $('.layui-form').on('submit', function (e) {

        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                

                // 验证通过后重置表单
                

                $('.layui-form')[0].reset()
                layer.msg('请重新登录!')

                setTimeout(() => {
                    top.location.href='../login.html'
                }, 500);
                
                
                

            }
        })

    })



})