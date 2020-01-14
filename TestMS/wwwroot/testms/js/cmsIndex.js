layui.use(['form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        element = layui.element;
    $ = layui.$;
    layer = parent.layer === undefined ? layui.layer : top.layer;

    var menudata;
    var menuhtml = '';
    $.ajax({
        type: "get",
        url: "/Menu/GetMenuTree",
        success: function (result) {
            console.log(result);
            menudata = result;
            for (var i = 0; i < result.length; i++) {
                if (result[i].spread && result[i].spread == undefined) {
                    menuhtml += '<li class="layui-nav-item layui-nav-itemed">';
                } else {
                    menuhtml += '<li class="layui-nav-item">';
                }
                if (result[i].target != undefined && result[i].target == "_blank") {
                    menuhtml += '<a data-url="' + result[i].href + '" target="' + result[i].target + '">';
                }
                else {
                    menuhtml += '<a data-url="' + result[i].href + '">';
                }
                if (result[i].icon != undefined && result[i].icon != '') {
                    menuhtml += '<i class="layui-icon">' + result[i].icon + '</i>';
                }
                menuhtml += '<cite>' + result[i].title + '</cite>';
                menuhtml += '</a></li>';
                console.log("result" + i + ": " + menuhtml);
            }
        },
        async: false
    });
    $(".navBar ul").html(menuhtml);

    //隐藏左侧导航
    $(".hideMenu").click(function () {
        if ($(".topLevelMenus li.layui-this a").data("url")) {
            layer.msg("此栏目状态下左侧菜单不可展开");  //主要为了避免左侧显示的内容与顶部菜单不匹配
            return false;
        }
        $(".layui-layout-admin").toggleClass("showMenu");
        //渲染顶部窗口
        tab.tabMove();
    })

    //清除缓存
    $(".clearCache").click(function () {
        window.sessionStorage.clear();
        window.localStorage.clear();
        var index = layer.msg('清除缓存中，请稍候', { icon: 16, time: false, shade: 0.8 });
        setTimeout(function () {
            layer.close(index);
            layer.msg("缓存清除成功！");
        }, 1000);
    })

    // 添加新窗口
    $("body").on("click", ".layui-nav .layui-nav-item a", function () {
        addTab($(this));
    })

    
    //打开新窗口
    var tabIdIndex = 0;
    var layid;
    function addTab(_this) {
        tabIdIndex++;
        layid = new Date().getTime();
        var tabtitle = '<i class="layui-icon">' + _this.find("i.layui-icon").text() + '</i>';
        tabtitle += '<cite>' + _this.find("cite").text() + '</cite>';
        tabtitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + layid + '">&#x1006;</i>';
        element.tabAdd('bodyTab', {
            title: tabtitle,
            content: "<iframe src='" + _this.attr("data-url") + "' data-id='" + tabIdIndex + "'></iframe>",
            id: layid
        });
        element.tabChange('bodyTab', layid);
    }

    $("body").on("click", ".top_tab li i.layui-tab-close", function () {
        element.tabDelete("bodyTab", $(this).parent("li").attr("lay-id")).init();
    })

})

