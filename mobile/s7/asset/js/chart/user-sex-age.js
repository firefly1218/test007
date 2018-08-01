function buildUserSexAge(sex_obj,m_data,w_data) {
    var keyMap={
        "maleTofemale00":"00后",
        "maleTofemale90":"90后",
        "maleTofemale80":"80后",
        "maleTofemale70":"70后",
        "maleTofemale60":"60后",
        "maleTofemale50":"60前",
        
    }
    var LABEL_OPTION = {
        normal: {
            show: true,
            align: "center",
            formatter: '{c}%'
        }
    };
    return {
        animation: false,
        legend: {
            top: 44,
            itemGap: 30,
            selectedMode: false,
            data: [
                {
                    name: '男性',
                    icon: "path://M1,1L2,1L2,2L1,2Z"
                }, {
                    name: '女性',
                    icon: "path://M1,1L2,1L2,2L1,2Z"
                }
            ]
        },
        grid: {
            top: 85,
            left: "8%",
            right: "15%",
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "#5b6077"
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    fontSize: 14,
                    color: "#5b6077",
                    formatter: "{value}%"
                },
                splitArea: {
                    show: false
                }
            }
        ],
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    color: '#5b6077'
                }
            },
            // data: data.map(function (v) {
            //     return v.name
            // })
            // data:["00后","90后","80后","70后","60后","60前"]
            data:sex_obj.map(function(key){
                    return keyMap[key];
            }).reverse()
        },
        series: [
            {
                name: '男性',
                type: 'bar',
                stack: '总数',
                barWidth: 25,
                silent: true,
                itemStyle: {
                    normal: {
                        color: "#1de3ce"
                    }
                },
                label: LABEL_OPTION,
                data:m_data.reverse()
                // data: data.map(function (v) {
                //     return v.man
                // })
            },
            {
                name: '女性',
                type: 'bar',
                barWidth: 25,
                stack: '总数',
                silent: true,
                itemStyle: {
                    normal: {
                        color: "#3fb7f5"
                    }
                },
                label: LABEL_OPTION,
                data:w_data.reverse()
                // data: data.map(function (v) {
                //     return v.woman
                // })
            }
        ]
    }
}