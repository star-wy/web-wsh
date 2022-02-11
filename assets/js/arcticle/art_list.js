$(function () {
    // 定义一个查询参数

    var q = {
        pagenum: 1,//默认请求第一页数据
        pagesize: 2,//显示几条数据
        cate_id: '',
        state: ''
    }

    var layer = layui.layer
    var laypage = layui.laypage
    var form = layui.form
    initList()

    // 获取文章列表
    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')

                }

                var htmlList = template('art_list', res)
                //    console.log(htmlList);
                $('tbody').html(htmlList)

                renderPage(res.total)
            },

        })
    }

    // 获取文章分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')

                }

                var htmlList = template('tpl_cate', res)
                // console.log(htmlList);
                $('#art_cate').html(htmlList)
                form.render()//重新加载form表单
            },

        })

    }
    // 为筛选按钮绑定submit时间

    $('#sub_search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state
        initList()

    })
    // 渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox',
            count: total,//总数据
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//默认选择第几条
            jump: function (obj, first) {
                q.pagenum = obj.curr

                q.pagesize = obj.limit

                if (!first) {
                    initList()
                }

            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
        })

    }

    // 为删除按钮绑定事件

    $('tbody').on('click', '.btn_delete', function () {
        var id = $(this).attr('data-id')

        var len = $('.btn_delete').length

        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg('删除文章失败')

                    }
                    layer.msg('删除文章成功')

                    if(len===1){
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initList()
                },

            })
            layer.close(index);
        });
    
    })
    var num = 1
    $('tbody').on('click','.btn_change',function(){

        
        num++;
        console.log(num);
        if(num<=5){
            
            layer.msg('别点了,阿洋这个功能没写')
        }else{
            layer.msg('神经病吧,都说了没写,还点')
        }
       
        
    })
})