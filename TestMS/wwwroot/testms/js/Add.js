﻿var closeindex = localStorage.getItem('addIndex');
var isEdit = localStorage.getItem('isEdit');

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
        var url = isEdit == 2 ? "/Enterprise/Update" : "/Enterprise/Add";
        $.post(url, {
            "Id": $('#idEnter').val(),
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
            console.log(closeindex);
            if (res == undefined || res == null || !res) {
                layer.msg("保存失败");
            }
            if (res.code == 0) {
                layer.msg(res.msg);
                parent.layer.close(closeindex);
            }
            if (res == true) {
                layer.msg("保存成功");
                parent.layer.close(closeindex);
            }
            window.parent.location.reload();
        })
        return false;
    })

    $(document).on('click', '#btn-return', function () {
        parent.layer.close(closeindex)
    })
})