
$(function () {
    getuserinfo()

    $('.outlogin').on('click', function () {

        var layer = layui.layer

        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('tolen')
            location.href = '/login.html'

            layer.close(index);
        });

    })
})

function getuserinfo() {
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
            
            readeuser(res.data)
        },

    })
}

function readeuser(user) {

    var name = user.nickname || user.username

    $('.text-avatar').html('欢迎&nbsp;&nbsp' + name).show()

    if (user.user_pic !== null) {
        $('.welcome').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()

    }
    else {

        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.welcome').html(first).show()

    }
}

