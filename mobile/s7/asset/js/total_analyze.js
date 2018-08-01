$(function () {
    
    var userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
    if (!userinfo) {
        location.href = "../../login.html";
    }
    var chart = {};
    $(window).resize(function () {
        Object.keys(chart).forEach(function (key) {
            chart[key].resize();
        })
    });
    
    //顶级菜单栏切换
    $(".tab-list").on("click", ".tab", function () {
        var $this = $(this);
        $this.siblings(".tab-active").removeClass("tab-active");
        $this.parent(".tab-list")
            .siblings(".tab-contents")
            .children(".tab-active")
            .removeClass("tab-active");
        $this.addClass("tab-active");
        $($this.attr("data-tab-target")).addClass("tab-active");
        setTimeout(function () {
            $($this.attr("data-tab-target"))
                .find(".chart-content")
                .each(function () {
                    var id = $(this).attr("id");
                    chart[id] && chart[id].resize();
            });
        }, 0)
    });
    
    //重定向
    $('header').click(function () {
        location.href = "../view/index.html";
    });
    
    //日月周切换
    $(".tab-list-nav").on("click", ".tab-list-text", function () {
        var $this = $(this);
        $this.siblings(".tab-list-nav-active").removeClass("tab-list-nav-active");
        $this.parent(".tab-list").siblings(".tab-contents").children(".tab-active").removeClass("tab-active");
        $this.addClass("tab-list-nav-active");
        $($this.attr("data-tab-target")).addClass("tab-active");
        setTimeout(function () {
            $($this.attr("data-tab-target")).find(".chart-content").each(function () {
                chart[$(this).attr("id")] && chart[$(this).attr("id")].resize();
            });
        }, 0)
    });
 
    
    //数字格式化
    function formatNum(str) {
        return str.split('')
            .reverse()
            .join('')
            .replace(/(\d{3})/g, '$1,')
            .replace(/\,$/, '')
            .split('')
            .reverse()
            .join('');
    }
    
    //增长率涨幅趋势
    function getReducePlus(str1, ele1) {
        if (str1.substr(0, 1) == "+") {
            $(ele1).addClass("widget-text-up").removeClass("widget-text-down");
        } else if (str1.substr(0, 1) == "-") {
            $(ele1).addClass("widget-text-down").removeClass("widget-text-up");
        }
    }
    
    //预加载
    var totalCount = function (el) {
        dataService.request("device-count-fresh").then(function (result) {
            $(el).text(formatNum(result.result.value));
        });
    }
    
    //设备总数刷新
    totalCount("#total-count");
    
    //实时刷新
    setInterval(function () {
        dataService.request("device-count-fresh").then(function (result) {
            $("#total-count").text(formatNum(result.result.value));
        });
    }, 5000);
    
    //时间处理
    var yestday = moment(new Date()).subtract(1,"days").format("YYYY-MM-DD");
    
    var maxdate = yestday;
    var current_time = moment(yestday).format('YYYY-MM-DD');
    $('.btn-date-change').text(yestday);
    $('.widget-date-change').text(yestday);
    
    var livingRate = function () {
        dataService.request("total-index").then(function (result) {
            var day_rate = result.result.dailyMac_Rate;
            var day_ratio = result.result.dailyMac_Ratio;
            var week_rate = result.result.weekMac_Rate;
            var week_ratio = result.result.weekMac_Ratio;
            var month_rate = result.result.monthMac_Rate;
            var month_ratio = result.result.monthMac_Ratio;
            getReducePlus(day_ratio, "#day-pert-rate");
            getReducePlus(week_ratio, "#week-pert-rate");
            getReducePlus(month_ratio, "#month-pert-rate");
            $("#day-pert").text(day_rate);
            $("#day-pert-rate").text(day_ratio);
            $("#week-pert").text(week_rate);
            $("#week-pert-rate").text(week_ratio);
            $("#month-pert").text(month_rate);
            $("#month-pert-rate").text(month_ratio);
        });
    }
    livingRate();
    
    var searchDeviceCompose = function (value, date) {
        dataService.request("total-index", {date: value}).then(function (result) {
            var slient_Ratio=result.result.slientMac_Ratio;
            var lose_Ratio=result.result.loseMac_Ratio;
            var back_Ratio=result.result.backMac_Ratio;
            var loyal_Ratio=result.result.loyalMac_Ratio;
    
            var slient_Rate=result.result.slientMac_Rate;
            var lose_Rate=result.result.loseMac_Rate;
            var back_Rate=result.result.backMac_Rate;
            var loyal_Rate=result.result.loyalMac_Rate;
    
            var option1 = buildDeviceCompose(slient_Ratio,slient_Rate, "#1de3ce","");
            var option2 = buildDeviceCompose(lose_Ratio,lose_Rate,"#3fb7f5","");
            var option3 = buildDeviceCompose(back_Ratio,back_Rate,"#5986f3");
            var option4 = buildDeviceCompose(loyal_Ratio,loyal_Rate,"#f58940","");
            // chartDeviceCompose.setOption(option);
            e1.setOption(option1);
            e2.setOption(option2);
            e3.setOption(option3);
            e4.setOption(option4);
            judge("#pie-title-1",slient_Ratio);
            judge("#pie-title-2",lose_Ratio);
            judge("#pie-title-3",back_Ratio);
            judge("#pie-title-4",loyal_Ratio);
        });
    };
    searchDeviceCompose(moment(yestday).format('YYYY-MM'), yestday);
    
    // 日、周、月活率查询
    laydate.render({
        max: maxdate,
        theme: 'smart',
        btns: [ 'confirm'],
        float: 'right',
        value: current_time,
        elem: '#date-change-active-day',
        done: function (value, date) {
            dataService.request("index-day-query", {date: value}).then(function (result) {
                var day_ratio = result.result.dailyMac_Ratio;
                $("#day-pert").text(result.result.dailyMac_Rate);
                $("#day-pert-rate").text(result.result.dailyMac_Ratio);
                getReducePlus(day_ratio, "#day-pert-rate");
            });
        }
    });
    laydate.render({
        max: maxdate,
        theme: 'smart',
        btns: [ 'confirm'],
        float: 'right',
        value: current_time,
        elem: '#date-change-active-week',
        done: function (value, date) {
            dataService.request("index-week-query", {date: value}).then(function (result) {
                var week_ratio = result.result.weekMac_Ratio;
                $("#week-pert").text(result.result.weekMac_Rate);
                $("#week-pert-rate").text(result.result.weekMac_Ratio);
                getReducePlus(week_ratio, "#week-pert-rate");
            });
        }
    });
    laydate.render({
        max: maxdate,
        theme: 'smart',
        btns: [ 'confirm'],
        float: 'right',
        value: current_time,
        elem: '#date-change-active-month',
        done: function (value, date) {
            dataService.request("index-month-query", {date: value}).then(function (result) {
                var month_ratio = result.result.monthMac_Ratio;
                $("#month-pert").text(result.result.monthMac_Rate);
                $("#month-pert-rate").text(month_ratio);
                getReducePlus(month_ratio, "#month-pert-rate");
            });
        }
    });
    
    //实例化获取对象
    function initEchartInstance(id) {
        return chart[id] = echarts.init(document.getElementById(id), "macarons");
    }
    
    //判断增减
    function judge(el,value){
        if(value[0]=='-'){
            $(el).addClass("icon-down").removeClass("icon-up");
        }else{
            $(el).addClass("icon-up").removeClass("icon-down");
        }
    }
    // var chartDeviceCompose = initEchartInstance("chart-device-compose");
    var e1 = initEchartInstance("e1");
    var e2 = initEchartInstance("e2");
    var e3 = initEchartInstance("e3");
    var e4 = initEchartInstance("e4");
    // 设备构成查询
    laydate.render({
        max: maxdate,
        theme: 'smart',
        type: "date",
        float: 'right',
        btns: [ 'confirm'],
        value: current_time,
        elem: '#date-change-device-compose',
        done: function (value, date) {
            dataService.request("device-compose", {date: value}).then(function (result) {
                var slient_Ratio=result.result.slientMac_Ratio;
                var lose_Ratio=result.result.loseMac_Ratio;
                var back_Ratio=result.result.backMac_Ratio;
                var loyal_Ratio=result.result.loyalMac_Ratio;
    
                var slient_Rate=result.result.slientMac_Rate;
                var lose_Rate=result.result.loseMac_Rate;
                var back_Rate=result.result.backMac_Rate;
                var loyal_Rate=result.result.loyalMac_Rate;
                
                var option1 = buildDeviceCompose(slient_Ratio,slient_Rate, "#1de3ce","");
                var option2 = buildDeviceCompose(lose_Ratio,lose_Rate,"#3fb7f5","");
                var option3 = buildDeviceCompose(back_Ratio,back_Rate,"#5986f3");
                var option4 = buildDeviceCompose(loyal_Ratio,loyal_Rate,"#f58940","");
                // chartDeviceCompose.setOption(option);
                e1.setOption(option1);
                judge("#pie-title-1",slient_Ratio);
                e2.setOption(option2);
                judge("#pie-title-2",lose_Ratio);
                e3.setOption(option3);
                judge("#pie-title-3",back_Ratio);
                e4.setOption(option4);
                judge("#pie-title-4",loyal_Ratio);
            });
        }
    });
    
    // 设备活跃度数据加载及查询
    $("#device-living").click(function () {
        dataService.request("device-active").then(function (result) {
            var option1 = buildDeviceNumber(result.result.dailyMac, "每日设备活跃度", "设备活跃度", "#1de3ce", ["rgba(255, 255, 255, .3)", "rgba(29, 227, 206, .3)"]);
            chartDeviceActiveDay.setOption(option1);
            var option2 = buildDeviceNumber(result.result.weekMac, "每周设备活跃度", "设备活跃度", "#43b9f5", ["rgba(255, 255, 255, .3)", "rgba(67, 185, 245, .3)"]);
            chartDeviceActiveWeek.setOption(option2);
            var option3 = buildDeviceNumber(result.result.monthMac, "每月设备活跃度", "设备活跃度", "#43b9f5", ["rgba(255, 255, 255, .3)", "rgba(67, 185, 245, .3)"]);
            chartDeviceActiveMonth.setOption(option3);
        });
    });
    var chartDeviceActiveDay = initEchartInstance("chart-device-active-day");
    var chartDeviceActiveWeek = initEchartInstance("chart-device-active-week");
    var chartDeviceActiveMonth = initEchartInstance("chart-device-active-month");
    
    //新增设备活跃度及查询
    var chartDeviceNewDay = initEchartInstance("chart-device-new-day");
    var chartDeviceNewWeek = initEchartInstance("chart-device-new-week");
    var chartDeviceNewMonth = initEchartInstance("chart-device-new-month");
    $("#device-newly").click(function () {
        dataService.request("device-newly").then(function (result) {
            var option1 = buildDeviceNumber(result.result.dailyAddMac, "每日新增设备数", "新增设备数", "#1de3ce", ["rgba(255, 255, 255, .3)", "rgba(29, 227, 206, .3)"]);
            chartDeviceNewDay.setOption(option1);
            var option2 = buildDeviceNumber(result.result.weekAddMac, "每周新增设备数", "新增设备数", "#1de3ce", ["rgba(255, 255, 255, .3)", "rgba(29, 227, 206, .3)"]);
            chartDeviceNewWeek.setOption(option2);
            var option3 = buildDeviceNumber(result.result.monthAddMac, "每月新增设备数", "新增设备数", "#1de3ce", ["rgba(255, 255, 255, .3)", "rgba(29, 227, 206, .3)"]);
            chartDeviceNewMonth.setOption(option3);
        });
    });
    
    // 留存设备
    var chartDeviceKeepDay = initEchartInstance("chart-device-keep-day");
    var chartDeviceKeepWeek = initEchartInstance("chart-device-keep-week");
    var chartDeviceKeepMonth = initEchartInstance("chart-device-keep-month");
    $("#device-keep").click(function () {
        dataService.request("device-keep").then(function (result) {
            var option1 = buildDeviceNumber(result.result.dailyRemainMac, "每日留存设备数", "留存设备数", "#f58940", ["rgba(255, 255, 255, .3)", "rgba(245, 137, 64, .3)"]);
            chartDeviceKeepDay.setOption(option1);
            var option2 = buildDeviceNumber(result.result.weekRemainMac, "每周留存设备数", "留存设备数", "#f58940", ["rgba(255, 255, 255, .3)", "rgba(245, 137, 64, .3)"]);
            chartDeviceKeepWeek.setOption(option2);
            var option3 = buildDeviceNumber(result.result.monthRemainMac, "每月留存设备数", "留存设备数", "#f58940", ["rgba(255, 255, 255, .3)", "rgba(245, 137, 64, .3)"]);
            chartDeviceKeepMonth.setOption(option3);
        });
    });
    
    
    function buildDeviceCompose(data, data1,colors,title) {
        var LABEL_OPTION = {
            normal: {
                show: true,
                position: "center",
                textStyle: {
                    fontSize: "18",
                    fontFamily: ""
                },
                formatter: function (param) {
                    return param.dataIndex != 0 ? "" : param.percent + "%";
                }
            }
        };
        function graphicChildren(title, change) {
            var url_redio_down = "../asset/image/icon/icon-down.png";
            var url_redio_up = "../asset/image/icon/icon-up.png";
            return [
                //调整增长符及标题
                {
                    type: 'text',
                    z: 100,
                    top: "1%",
                    left: 20,
                    cursor: "default",
                    style: {
                        fill: change[0] == '-' ? "#f58940" : '#1de3ce',
                        text: change,
                        font: '12px'
                    }
                },
            ]
        }
        
        function pieData( colors, value) {
            return [
                {
                    name: title,
                    value: value,
                    itemStyle: {
                        normal: {
                            color: colors
                        }
                    }
                },
                {
                    name: "",
                    value: 100 - value,
                    itemStyle: {
                        normal: {
                            color: "#eeeeee"
                        }
                    }
                }
            ]
        }
        
        return {
            title: {
                text: title,
                x: "center",
                y: "44px",
                textStyle: {
                    fontSize: "16",
                    color: "#5b6077",
                    fontWeight: "normal"
                }
            },
            animation: false,
            //设置顶部增长率位置
            graphic: [
                {
                    type: 'group',
                    top: '3%',
                    left: '40%',
                    bounding: 'raw',
                    children: graphicChildren('缄默设备', data)
                },
            ],
            series: [
                {
                    name: "缄默设备",
                    type: "pie",
                    silent: true,
                    cursor: "default",
                    radius: ["50%", "70%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: false,
                    label: LABEL_OPTION,
                    data: pieData(colors, data1.split("%")[0])
                },
            ]
        };
    }
    
    
    
});