function buildUserAge(data) {
    return {
        animation: false,
        legend: {
            top: 20,
            itemGap: 30,
            left:"center",
            selectedMode: false,
            data: [
                {
                    name: '总数',
                    icon: "path://M1,1L2,1L2,2L1,2Z"
                }, {
                    name: '男性',
                    icon: "path://M1,1L2,1L2,2L1,2Z"
                }, {
                    name: '女性',
                    icon: "path://M1,1L2,1L2,2L1,2Z"
                }
            ]
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} "
        },
        grid: {
            top: 65,
            left:40,
        },
        xAxis: [
            {
                type: 'category',
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
                    color: "#5b6077"
                },
                // data: data.map(function (v) {
                //     return v.name
                // })
                data:["00后", "90后", "80后", "70后", "60后", "60前"]
            }
        ],
        yAxis: {
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
                },
                formatter: function (value) {
                    if (value >= 1000 || value <= -1000) {
                        return (value / 1000 + "").replace(/(\d)(?=(\d{3})+$)/g, '$1,') + "K";
                    } else {
                        return value;
                    }
                }
            }
        },
        series: [
            {
                name: '总数',
                type: 'bar',
                barGap: 0,
                barWidth: 12,
                silent: false,
                // left:60,
                itemStyle: {
                    normal: {
                        color: "#5986f3"
                    }
                },
                // data: data.map(function (v) {
                //     return v.total
                // })
                data:data[0].data,
            },
            {
                name: '男性',
                type: 'bar',
                barGap: 0,
                barWidth: 16,
                silent: false,
                itemStyle: {
                    normal: {
                        color: "#1de3ce"
                    }
                },
                // data: data.map(function (v) {
                //     return v.man
                // })
                data:data[1].data,
            },
            {
                name: '女性',
                type: 'bar',
                barGap: 0,
                barWidth: 16,
                silent: false,
                itemStyle: {
                    normal: {
                        color: "#3fb7f5"
                    }
                },
                // data: data.map(function (v) {
                //     return v.woman
                // })
                data:data[2].data,
            }
        ]
    }
}