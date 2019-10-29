layui.use(['form', 'upload', 'layer'], function () {
    var form = layui.form,
        upload = layui.upload,
        $ = layui.jquery;
    layer = parent.layer === undefined ? layui.layer : top.layer;

    upload.render({
        elem: '.thumbBox',
        url: '/fasdf/asdf',
        method: 'post',
        done: function (res, index, upload) {
            console.log('thumbImg is enable');
        }
    });

    form.on("submit(addArticle)", function (data) {
        console.log(data.field);
        $.post("/Enterprise/Add", {
            "Name": $('#name').val(),
            "organCode": $('#organCode').val(),
            "typeCode": $('#typeCode').val(),
            "address": $('#address').val(),
            "gPSLongitude": $('#gPSLongitude').val(),
            "gPSLatitude": $('#gPSLatitude').val(),
            "bmapLongitude": $('#bmapLongitude').val(),
            "bmapLatitude": $('#bmapLatitude').val(),
            "discharge": $('#discharge').val(),
            "concentration": $('#concentration').val(),
            //"abstContent": $('#abstContent').val()
        }, function (res) {
            console.log("add obj:");
            console.log(res);
            console.log("layer add index:");
            var closeindex = localStorage.getItem('addIndex');
            if (res == undefined || res == null || !res) {
                layer.msg("保存失败");
            }
            if (res.code == 0) {
                layer.msg(res.msg);
                parent.layer.close(closeindex);
            }
        })
        return false;
    })
})