$(function () {
    var layer = layui.layer

    var form = layui.form


    // 定义获取文章列表信息
    initList()

    // 初始化富文本编辑器
    initEditor()
    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')

                }
                // console.log(res);

                var htmlList = template('tpl_pub', res)
                // console.log(htmlList);
                $('[name=cate_id]').html(htmlList)
                form.render()

            },

        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)



    // 拿到用户选择的文件
    $('#chooseImage').on('click', function () {
        $('#up_files').click()

    })
    // 选择文件上传
    $('#up_files').on('change', function (e) {

        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    // 设置一个默认状态值
    var btn_status = '已发布'
    $('#btn_status').on('click', function () {
        btn_status = '草稿'


    })

    $('#form_data').on('submit', function (e) {

        e.preventDefault()
        var formdata = new FormData($(this)[0])

        formdata.append('state', btn_status)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {

                formdata.append('cover_img', blob)
                publishArticle(formdata)
            })

        function publishArticle(formdata) {
            console.log(formdata);
            $.ajax({
                method: 'post',
                url: '/my/article/add',
                data: formdata,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        // console.log(res);
                        
                        return layer.msg('发布文章失败')

                    }
                    // console.log(res);
                    layer.msg('发布文章成功')
                    // console.log(res);

                },

            })
        }



    })


})