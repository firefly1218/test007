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
    //tab栏切换
    $(".tab-list").on("click", ".toggle-nav", function () {
        var $this = $(this);
        $this.addClass("tab-active");
        $this.siblings(".toggle-nav").removeClass("tab-active");
      
        $this.parent(".tab-list")
            .siblings(".tab-contents")
            .children($this.attr("data-tab-target"))
            .addClass("tab-active");
        
        $this.parent(".tab-list")
            .siblings(".tab-contents")
            .children($this.attr("data-tab-target"))
            .siblings().removeClass("tab-active");
        
        setTimeout(function () {
            $($this.attr("data-tab-target"))
                .find(".chart-content")
                .each(function () {
                    // var id = $(this).attr("id");
                    chart[$(this).attr("id")] && chart[$(this).attr("id")].resize();
                });
        }, 0)
    });
    
    //  页面重定向
    $('header').click(function () {
        location.href = "../view/index.html";
    });
    
    //时间
    var now = new Date();
    var defaultMonth = moment(now).subtract(1, "months").format("YYYY-MM");
    var maxDate = moment(now).subtract(1, "months").format("YYYY-MM-DD")
    //给按钮设置默认时间
    $('.btn-date-change').text(defaultMonth);
    
    // //实例化图表对象
    function initEchartInstance(id) {
        return chart[id] = echarts.init(document.getElementById(id), "macarons");
    }
    
    //查找所有需要绘制的echarts对象
    
    var chartUserSex = initEchartInstance("chart-user-sex");
    var chartUserAge = initEchartInstance("chart-user-age");
    var chartUserRegion = initEchartInstance("chart-user-region");
    var chartUserRegionAge = initEchartInstance("chart-user-region-age");
    var chartUserSexAge = initEchartInstance("chart-user-sex-age");
    var chartUserSexRegion = initEchartInstance("chart-user-sex-region");
    
    //预加载
    var userMap = function (value, date) {
        dataService.request("user-map", {date: value}).then(function (result) {
            var dataObj = result.result.ageDistri;
            var type = "bar";
            var arr = [];
            var total_count = [];
            var male_count = [];
            var female_count = [];
            //将对象转换位数组
            $.each(dataObj, function (i, v) {
                arr.push(dataObj[i]);
            });
            // 循环取出一位数组值
            for (var i = 0; i < 6; i++) {
                arr[i].push(i);
                total_count.push(arr[i][0]);
                male_count.push(arr[i][1]);
                female_count.push(arr[i][2]);
            }
            var total_obj = {name: "总数", type: type, data: total_count};
            var male_obj = {name: "男性", type: type, data: male_count};
            var female_obj = {name: "女性", type: type, data: female_count};
            var dataV = [total_obj, male_obj, female_obj];
            
            var optionSex = buildUserSex(result.result.maleTofemale);
            chartUserSex.setOption(optionSex);
            
            var optionAge = buildUserAge(dataV);
            chartUserAge.setOption(optionAge);
            
            var optionRegion = buildUserRegion(result.result.mapDistri);
            chartUserRegion.setOption(optionRegion);
        });
        
        dataService.request("user-tgi").then(function (result) {
            var sex_age = result.result.sexAgeTGI;
            //将对象转为数组
            var sexData = Object.keys(sex_age).map(function (key) {
                return sex_age[key];
            }).map(function (v) {
                return {man: v[0], women: v[1]}
            });
            var sex_obj = Object.keys(sex_age).map(function (key) {
                return key;
            });
            var man_data = sexData.map(function (v) {
                return parseFloat(v.man.split("%")[0]);
            });
            var women_data = sexData.map(function (v) {
                return parseFloat(v.women.split("%")[0]);
            });
            
            var optionRegionAge = buildUserRegionAge(result.result.regionAgeTGI);
            chartUserRegionAge.setOption(optionRegionAge);
            
            var optionSexAge = buildUserSexAge(sex_obj, man_data, women_data);
            chartUserSexAge.setOption(optionSexAge);
            
            var optionSexRegion = buildUserSexRegion(result.result.sexRegionTGI);
            chartUserSexRegion.setOption(optionSexRegion);
        });
    }
    userMap(defaultMonth, now);
    
    //设置默认时间
    $(".date-change").text(defaultMonth);
    
    /*查询功能实现*/
    //1、地域分布数据查询
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-region',
        done: function (value, data) {
            dataService.request("user-region-query", {date: value}).then(function (result) {
                var option = buildUserRegion(result.result.mapDistri);
                chartUserRegion.setOption(option);
            });
        }
    });
    //性别分布查询
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-sex',
        done: function (value, data) {
            dataService.request("user-sex-query", {date: value}).then(function (result) {
                var m_count = parseInt(result.result.male);
                var w_count = parseInt(result.result.female);
                var total = m_count + w_count;
                var man_pert = (Math.round(m_count / total * 10000) / 100.00 + "%");
                var women_pert = (Math.round(w_count / total * 10000) / 100.00 + "%");
                var maleTofemale = [man_pert, women_pert];
                var option = buildUserSex(maleTofemale);
                chartUserSex.setOption(option);
            });
        }
    });
    
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-age',
        done: function (value, data) {
            dataService.request("user-age-query", {date: value}).then(function (result) {
                var dataObj = result.result;
                var type = "bar";
                var arr = [];
                var total_count = [];
                var male_count = [];
                var female_count = [];
                //将对象转换位数组
                $.each(dataObj, function (i, v) {
                    arr.push(dataObj[i]);
                });
                // 循环取出一位数组值
                for (var i = 0; i < 6; i++) {
                    arr[i].push(i);
                    total_count.push(arr[i][0]);
                    male_count.push(arr[i][1]);
                    female_count.push(arr[i][2]);
                }
                var total_obj = {name: "总数", type: type, data: total_count};
                var male_obj = {name: "男性", type: type, data: male_count};
                var female_obj = {name: "女性", type: type, data: female_count};
                var dataV = [total_obj, male_obj, female_obj];
                var option = buildUserAge(dataV);
                chartUserAge.setOption(option);
            });
        }
    });
    
    //2、地域年龄tgi
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-region-age',
        done: function (value, data) {
            dataService.request("user-region-age-query", {date: value}).then(function (result) {
                var option = buildUserRegionAge(result.result);
                chartUserRegionAge.setOption(option);
            });
        }
    });
    //性别年龄
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-sex-age',
        done: function (value, data) {
            dataService.request("user-sex-age-query", {date: value}).then(function (result) {
                var sex_age = result.result;
                //将对象转为数组
                var sexData = Object.keys(sex_age).map(function (key) {
                    return sex_age[key];
                }).map(function (v) {
                    return {man: v[0], women: v[1]}
                });
                var sex_obj = Object.keys(sex_age).map(function (key) {
                    return key;
                });
                var man_data = sexData.map(function (v) {
                    return parseFloat(v.man.split("%")[0]);
                });
                var women_data = sexData.map(function (v) {
                    return parseFloat(v.women.split("%")[0]);
                });
                var option = buildUserSexAge(sex_obj, man_data, women_data);
                chartUserSexAge.setOption(option);
            });
        }
    });
    //性别地域
    laydate.render({
        max: maxDate,
        theme: 'smart',
        type: "month",
        float: 'right',
        btns: ['confirm'],
        elem: '#date-change-user-sex-region',
        done: function (value, data) {
            dataService.request("user-sex-region-query", {date: value}).then(function (result) {
                var option = buildUserSexRegion(result.result);
                chartUserSexRegion.setOption(option);
            });
        }
    });
    
});