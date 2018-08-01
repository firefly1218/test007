$(function () {
    var userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
    if (!userinfo) {
        location.href = "../../login.html";
    }
    var chart = {};
    var keyMap = [
        {"BMI": "BMI"},
        {"Bfat": "体脂"},
        {"Hfat": "内脏脂肪"},
        {"Water": "水分"},
        {"Muscle": "肌肉"},
        {"Cadre": "骨骼"},
        {"Bmet": "基础代谢"},
        {"Protein": "蛋白质"},
    ]
    
    //重定向
    $('header').click(function () {
        location.href = "../view/index.html";
    });
    
    var labelTitle = {
        BMI: "BMI",
        Bfat: "体脂",
        Hfat: "内脏脂肪",
        Water: "水分",
        Muscle: "肌肉",
        Cadre: "骨骼",
        Bmet: "基础代谢",
        Protein: "蛋白质"
    };
    
    //获取当前时间
    var now = new Date();
    var defaultMonth = moment(now).subtract(1,"months").format('YYYY-MM');
    var maxDate=moment(now).subtract(1,"months").format('YYYY-MM-DD');
    //设置按钮的默认时间
    $('.btn-date-change').text(defaultMonth);
    var chartHealthIndicator=initEchartInstance("test");
    //预加载数据方法封装
    function initData() {
        dataService.request("health-prev-load").then(function (result) {
            var bodyType = result.result.bodyType;
            // var healthIndex = result.result.healthIndex;
            var health_tag = result.result.healthIndex;
            var health_data = Object.keys(health_tag).map(function (key, i) {
                return {
                    "name":keyMap[i][key],
                    "result":health_tag[key]
                }
            });
            bodyType.map(function (v, i) {
                $(".tag-" + i).find(".label-num").text(v.value);
                $(".tag-" + i).find(".label-title").text(v.name);
            });
            var option = buildHealthIndicator(health_data);
            chartHealthIndicator.setOption(option);
        });
    }
    
    //十项身体标签数据渲染方法封装
    function tagData(value) {
        dataService.request("health-body-query", {date: value}).then(function (result) {
            var bodyType = result.result;
            bodyType.map(function (v, i) {
                $(".tag-" + i).find(".label-num").text(v.value);
                $(".tag-" + i).find(".label-title").text(v.name);
            });
        });
    }
    
    //健康指标数据渲染方法封装
    function indexData(value) {
        dataService.request("health-map-query", {date: value}).then(function (result) {
            var healthIndex = result.result;
           
            var health_data = Object.keys(healthIndex).map(function (key, i) {
                return {
                    "name":keyMap[i][key],
                    "result":healthIndex[key]
                }
            });
            var option = buildHealthIndicator(health_data);
            chartHealthIndicator.setOption(option);
        });
    }
    
    //重新绘制
    $(window).resize(function () {
        tagData();
    });
    
    //echarts实例初始化方法
    function initEchartInstance(id) {
        return chart[id] = echarts.init(document.getElementById(id), "macarons");
    }
    
    
    //默认数据渲染
    initData();
    
    //日历查询
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-body-index',
        done: function (value, date) {
            tagData(value)
        }
    });
    
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-health-index',
        done: function (value, date) {
            indexData(value);
        }
    });
    
});