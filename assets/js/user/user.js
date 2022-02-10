$(function () {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的密码必须在1~6位'
            }
            
        }
    })

    getUserinfo()
    function getUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('tolen') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')

                }
                form.val('userForminfo', res.data)



            },

        })
    }

    // 重置按钮设置
    $('#regout').on('click', function (e) {
        e.preventDefault()

        getUserinfo()

    })

    // 提交修改后的用户信息
        $('.layui-form').on('submit', function (e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/userinfo',
                data: {
                    id: $('#logname').val(),
                    nickname: $('#lognickname').val(),
                    email: $('#getemail').val()
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('更新用户信息失败')
    
                    }
                    layer.msg('更新用户信息成功')
                  
                    // 调用当前窗口的父元素中的函数
                    
                    window.parent.getuserinfo()
    
                }
    
            })
    
        })
    
    

})