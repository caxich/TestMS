var menu = [];
var $, tab, dataStr, layer;

layui.config({
    base: "testms/js/models/"
}).extend({
    "bodyTab": "bodyTab",
    "address": "address"
})

layui.use(['bodyTab', 'form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        element = layui.element;
    $ = layui.$;
    layer = parent.layer === undefined ? layui.layer : top.layer;
    tab = layui.bodyTab({
        openTabNum: "50",  //最大可打开窗口数量
        url: "/Menu/GetMenuTree" //获取菜单json地址
    })

    function getData(json) {
        $.getJSON(tab.tabConfig.url, function (data) {
            if (data) {
                //dataStr全局变量，用于保存左侧菜单
                dataStr = data;
                //执行bodyTab组件的render方法重新渲染左侧菜单
                tab.render();
            } else {
                console.log("menu data is null");
            }
        })
    }

    //获取左侧菜单
    getData();

    // 添加新窗口
    $("body").on("click", ".layui-nav .layui-nav-item a:not('.mobileTopLevelMenus .layui-nav-item a')", function () {
        //如果不存在子级
        if ($(this).siblings().length == 0) {
            addTab($(this));
            $('body').removeClass('site-mobile');  //移动端点击菜单关闭菜单层
        }
        $(this).parent("li").siblings().removeClass("layui-nav-itemed");
    })

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

    $("body").on("click", ".top_tab li i.layui-tab-close", function () {
        element.tabDelete("bodyTab", $(this).parent("li").attr("lay-id")).init();
    })

})

//打开新窗口
function addTab(_this) {
    tab.tabAdd(_this);
}


