$(function () {

    var layer = layui.layer

    var form = layui.form

    article()
    function article() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',

            success: function (res) {


                var resHtml = template('tpl-table', res)


                $('#table_article').html(resHtml)
            },

        })
    }
    var index = null
    $('#addCate').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#htmlAddarticle').html()
        });

    })

    // 确认添加文章分类，通过代理的方式调接口
    $('body').on('submit', '#addarticle', function (e) {

        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                article()
                layer.close(index)
            },

        })
    })


    // 通过代理的方式，绑定编辑按钮


    $('tbody').on('click', '#btn_change', function (e) {

        e.preventDefault()
        changeIndex = index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#htmlChangearticle').html()
        });
        var id = $(this).attr('data-id')


        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,

            success: function (res) {

                form.val('changeArticle', res.data)
            },

        })
    })
    // 通过代理的方式更新编辑的内容

    $('body').on('submit', '#changeArticle', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),

            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                // console.log(res);
                layer.msg('修改成功')
                layer.close(changeIndex)

                article()
            },

        })

    })

    // 删除内容

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            

            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,

                success: function (res) {

                    if(res.status!==0){
                        return layer.msg('仅管理员可删除此项')
                    }
                    layer.msg('删除成功')
                    article()
                    layer.close(index);
                }

            });

        })
    })


})

