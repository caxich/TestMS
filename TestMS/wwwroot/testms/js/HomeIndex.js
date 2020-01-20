//获取系统时间
var newDate = '';
getLangDate();
//值小于10时，在前面补0
function dateFilter(date) {
    if (date < 10) { return "0" + date; }
    return date;
}

function getLangDate() {
    var dateObj = new Date(); //表示当前系统时间的Date对象
    var year = dateObj.getFullYear(); //当前系统时间的完整年份值
    var month = dateObj.getMonth() + 1; //当前系统时间的月份值
    var date = dateObj.getDate(); //当前系统时间的月份中的日
    var day = dateObj.getDay(); //当前系统时间中的星期值
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
    var hour = dateObj.getHours(); //当前系统时间的小时值
    var minute = dateObj.getMinutes(); //当前系统时间的分钟值
    var second = dateObj.getSeconds(); //当前系统时间的秒钟值
    var timeValue = "" + ((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午"); //当前时间属于上午、晚上还是下午
    newDate = dateFilter(year) + "年" + dateFilter(month) + "月" + dateFilter(date) + "日 " + " " + dateFilter(hour) + ":" + dateFilter(minute) + ":" + dateFilter(second);
    document.getElementById("nowTime").innerHTML = "亲爱的CXC，" + timeValue + "好！ 欢迎使用TestCMS模版。当前时间为： " + newDate + "　" + week;
    setTimeout("getLangDate()", 1000);
}

layui.use(['form', 'element', 'layer', 'jquery'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;
    $ = layui.jquery;

    //icon动画
    $(".panel a").hover(function () {
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    }, function () {
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel_click a").click(function () {
        console.log("panel href:" + $(this).attr("data-url"));
        window.location.href = $(this).attr("data-url");
    })

    $(".panel_tab a").click(function () {
        console.log("panel href:" + $(this).attr("data-url"));
        console.log("parent:" + parent);
        parent.addTab($(this));
    })

    //填充数据方法
    function fillParameter(data) {
        //判断字段数据是否存在
        function nullData(data) {
            if (data == '' || data == "undefined") {
                return "未定义";
            } else {
                return data;
            }
        }
        $(".version").text(nullData(data.version));      //当前版本
        $(".author").text(nullData(data.author));        //开发作者
        $(".homePage").text(nullData(data.homePage));    //网站首页
        $(".server").text(nullData(data.server));        //服务器环境
        $(".dataBase").text(nullData(data.dataBase));    //数据库版本
        $(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
        $(".userRights").text(nullData(data.userRights));//当前用户权限
    }

    //系统信息
    var data = {
        version: 'V1.0.1',
        author: 'layer',
        homePage: 'homeIndex.html',
        server: 'windows server 2012',
        dataBase: 'sqlserver 2012',
        maxUpload: '4MB',
        userRights: '系统管理员'
    };
    fillParameter(data);

    var news =
        [{ newsName: 'CAP发布3.0 正式版', newsTime: '2020-1-2' },
        { newsName: 'CAP发布3.1 正式版', newsTime: '2020-1-22' },
        { newsName: 'CAP发布3.2 正式版', newsTime: '2020-1-23' }];

    function outNews(data) {
        var newsHtml = '';
        for (var i = 0; i < news.length; i++) {
            newsHtml += '<tr>'
                + '<td align="left"><a href="javascript:;"> ' + data[i].newsName + '</a></td>'
                + '<td>' + data[i].newsTime.substring(0, 8) + '</td>'
                + '</tr>';
        }
        $('.hot_news').html(newsHtml);
    }

    outNews(news);
})


var refHeight = window.getComputedStyle(document.getElementById('SysRefInfo')).getPropertyValue('height');
console.log(refHeight);
//debugger;
var chartDiv = document.getElementById('pvNums');
chartDiv.style.height = refHeight;
var myChart = echarts.init(chartDiv);

// 指定图表的配置项和数据
var option = {
    title: {
        text: ''
    },
    tooltip: {},
    grid: {
        bottom: 26,
        top: 20,
        left: 30,
        right: 30
    },
    legend: {
        data: ['访问量']
    },
    xAxis: {
        type: 'category',
        data: ["Spring", "Netbox", "TiDB", "GManager", "CRP", "Ionic", "Netbox", "TiDB", "GManager", "CRP", "Ionic", "Netbox", "TiDB", "GManager", "CRP", "Ionic"]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '访问量',
        type: 'line',
        data: [5, 20, 30, 10, 10, 20, 10, 28, 16, 20, 15, 20, 16, 20, 15, 20]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

