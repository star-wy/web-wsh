$(function () {
    $('#to-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#to-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })



    // 添加校监规则
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()

            if (pwd !== value) {
                return '两次密码不一致'

            }
        }



    })
    // 发起post请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 7 });

                }
                layer.msg(res.message, { icon: 6 });
                $('#to-login').click()

            }

        )
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_login [name="username"]').val(),
            password: $('#form_login [name="password"]').val()
        }
        $.post('/api/login', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 7 });

                }
                layer.msg(res.message, { icon: 6 });
                // 将登陆成功后的token值，保存到localStorage中
                localStorage.setItem('tolen',res.token)


                location.href = '/index.html'
            }

        )
    })


})


