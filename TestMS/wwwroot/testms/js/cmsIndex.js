var menu = [];
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
    $("body").on("click", ".navBar .layui-nav .layui-nav-item a", function () {
        addTab($(this));
    })

    
    //打开新窗口
    var tabIdIndex = 0;
    var layid;
    function addTab(_this) {
        if (window.sessionStorage.getItem("menu")) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
        }

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

        //缓存当前tab页信息
        var currentMenu = {
            "icon": _this.find("i.layui-icon").text(),
            "title": _this.find("cite").text(),
            "href": _this.attr("data-url"),
            "layId": new Date().getTime()
        }
        menu.push(currentMenu);
        window.sessionStorage.setItem("menu", JSON.stringify(menu)); //打开的窗口
        element.tabChange('bodyTab', layid);
    }

    $("body").on("click", ".top_tab li i.layui-tab-close", function () {
        element.tabDelete("bodyTab", $(this).parent("li").attr("lay-id")).init();
    })

    //刷新当前
    $(".refresh").on("click", function () {  //此处添加禁止连续点击刷新一是为了降低服务器压力，另外一个就是为了防止超快点击造成chrome本身的一些js文件的报错(不过貌似这个问题还是存在，不过概率小了很多)
        if ($(this).hasClass("refreshThis")) {
            $(this).removeClass("refreshThis");
            $(".clildFrame .layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload();
            setTimeout(function () {
                $(".refresh").addClass("refreshThis");
            }, 2000)
        } else {
            layer.msg("您点击的速度超过了服务器的响应速度，还是等两秒再刷新吧！");
        }
    })

    //关闭其他
    $(".closePageOther").on("click", function () {
        if ($("#top_tabs li").length > 2 && $("#top_tabs li.layui-this cite").text() != "后台首页") {
            var menu = JSON.parse(window.sessionStorage.getItem("menu"));
            $("#top_tabs li").each(function () {
                if ($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")) {
                    element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
                    //此处将当前窗口重新获取放入session，避免一个个删除来回循环造成的不必要工作量
                    for (var i = 0; i < menu.length; i++) {
                        if ($("#top_tabs li.layui-this cite").text() == menu[i].title) {
                            menu.splice(0, menu.length, menu[i]);
                            window.sessionStorage.setItem("menu", JSON.stringify(menu));
                        }
                    }
                }
            })
        } else if ($("#top_tabs li.layui-this cite").text() == "后台首页" && $("#top_tabs li").length > 1) {
            $("#top_tabs li").each(function () {
                if ($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")) {
                    element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
                    window.sessionStorage.removeItem("menu");
                    menu = [];
                    window.sessionStorage.removeItem("curmenu");
                }
            })
        } else {
            layer.msg("没有可以关闭的窗口了@_@");
        }
        //渲染顶部窗口
        tab.tabMove();
    })

    //关闭全部
    $(".closePageAll").on("click", function () {
        if ($("#top_tabs li").length > 1) {
            $("#top_tabs li").each(function () {
                if ($(this).attr("lay-id") != '') {
                    element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
                    window.sessionStorage.removeItem("menu");
                    menu = [];
                    window.sessionStorage.removeItem("curmenu");
                }
            })
        } else {
            layer.msg("没有可以关闭的窗口了@_@");
        }
        //渲染顶部窗口
        tab.tabMove();
    })

})

