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
            { title: '操作', width: 170, templet: '#enterpriseListTool', fixed: "right", align: "center" }
        ]]
    });

    function addNews(editData) {
        var url = "/Enterprise/AddIndex";
        //if (editData) { url = "/Enterprise/UpdateIndex" }
        //else {
        //    url = "/Enterprise/AddIndex";
        //}
        var index = layui.layer.open({
            title: "添加",
            type: 2,
            area: ['900px', '500px'],
            content: url,
            success: function (layero, index) {
                console.log(editData);
                var body = layui.layer.getChildFrame('body', index);
                if (editData) {
                    localStorage.setItem('isEdit', 2);//1新增状态2编辑状态
                    body.find('#idEnter').val(editData.id);
                    body.find('#name').val(editData.name);
                    body.find('#gPSLatitude').val(editData.gpsLatitude);
                    body.find('#gPSLongitude').val(editData.gpsLongitude);
                    body.find('#address').val(editData.address);
                    body.find('#bmapLatitude').val(editData.bmapLatitude);
                    body.find('#bmapLongitude').val(editData.bmapLongitude);
                    body.find('#concentration').val(editData.concentration);
                    body.find('#discharge').val(editData.discharge);
                    body.find('#organCode').val(editData.organCode);
                    body.find('#typeCode').val(editData.typeCode);
                }
                else {
                    localStorage.setItem('isEdit', 1);//1新增状态2编辑状态
                }
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

    //列表按钮操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event;
        var data = obj.data;
        if (layEvent == 'edit') {
            addNews(data);
        } else {
            layer.alter("无实现");
        }
    })

    $(".delAll_btn").click(function () {
        var checks = table.checkStatus('newsListTable'),
            data = checks.data,
            dels = [],
            querystring="?";
        if (data.length > 0) {
            for (var i in data) {
                dels.push(data[i].id);
                if (i > 0) {
                    querystring += "&Ids=" + data[i].id;
                }
                else {
                    querystring += "Ids=" + data[i].id;
                }
            }

            layer.confirm('确定删除选中的记录？', { icon: 3, title: '提示信息' }, function (index) {
                $.get("/Enterprise/Delete" + querystring, function (data) {
                    if (data && data != undefined && data.code == 0) {
                        tableIns.reload();
                        layer.close(index);
                    }
                    else {
                        layer.msg("删除失败");
                    }
                })
            })
        }
    })
})