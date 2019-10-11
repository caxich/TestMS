layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/LayuiCMS/getTable',
        cellMinWidth: 95,
        page: true,
        //height: 400,
        height: 'full-50',//隐藏table滚动条
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "newsListTable",
        cols: [[
            { type: "checkbox", fixed: "left", width: 50 },
            { field: 'newsId', title: 'ID', width: 60, align: "center" },
            { field: 'newsName', title: '文章标题', width: 350 },
            { field: 'newsAuthor', title: '发布者', align: 'center' },
            //{ field: 'newsStatus', title: '发布状态', align: 'center', templet: "#newsStatus" },
            //{ field: 'newsLook', title: '浏览权限', align: 'center' },
            //{
            //    field: 'newsTop', title: '是否置顶', align: 'center', templet: function (d) {
            //        return '<input type="checkbox" name="newsTop" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" ' + d.newsTop + '>'
            //    }
            //},
            {
                field: 'newsTime', title: '发布时间', align: 'center', minWidth: 110, templet: function (d) {
                    return d.newsTime.substring(0, 10);
                }
            },
            //{ title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center" }
        ]]
    });

    function addNews() {
        var index = layui.layer.open({
            title: "添加",
            type: 2,
            area: ['900px', '500px'],
            content: "/LayuiCMS/LayerAdd",
            success: function (layero, index) {
                //var body = layui.layer.getChildFrame('body', index);
            }
        });
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    $(".addNews_btn").click(function () {
        addNews();
    })

    form.on('submit(search)', function (data) {
        tableIns.reload({
            where: {
                "search": $('#search').val()
            }
        });

        //$.get("/LayuiCMS/getTable", {
        //    "search": $('#search').val(),
        //    "page": 1,
        //    "limit": 20
        //}, function (res) {
        //    console.log('getTable:');
        //    console.log(res);
        //    if (res.code == 0) {
        //        tableIns.reload();
        //    }
        //})
        return false;
    })
})