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
            if (res == undefined || res == null || !res) {
                layer.msg("保存失败");
            }
        })
        return false;
    })
})