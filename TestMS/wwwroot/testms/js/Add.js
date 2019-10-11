layui.use(['form', 'upload'], function () {
    var form = layui.form,
        upload = layui.upload,
        $ = layui.jquery;

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
        $.post("/LayuiCMS/Add", {
            "name": $('#name').val(),
            "abstContent": $('#abstContent').val()
        }, function (res) { })
        return false;
    })
})