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
        url: '/Enterprise/PageList',
        cellMinWidth: 95,
        page: true,
        //height: 400,
        height: 'full-50',//隐藏table滚动条
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "newsListTable",
        cols: [[
            { type: "checkbox", fixed: "left", width: 50 },
            { field: 'name', title: '企业名称', width: 260, align: "center" },
            { field: 'organCode', title: '组织机构代码', width: 150 },
            { field: 'address', title: '地址', align: 'center', width: 280 },
            {
                field: 'typeCode', title: '行业代码', align: 'center', minWidth: 110
            },
            //{ title: '操作', width: 170, templet: '#newsListBar', fixed: "right", align: "center" }
        ]]
    });

    function addNews() {
        var index = layui.layer.open({
            title: "添加",
            type: 2,
            area: ['900px', '500px'],
            content: "/Enterprise/AddIndex",
            success: function (layero, index) {
                //var body = layui.layer.getChildFrame('body', index);
            }
        });
        localStorage.setItem('addIndex', index);
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