function buildUserSexRegion(data) {
    var LABEL_OPTION = {
        normal: {
            show: true,
            fontSize: 14,
            color: "#2c3660",
            position: 'right',
            formatter: function (item) {
                var value = item.data.value;
                if (value >= 1000 || value <= -1000) {
                    return (value + "").replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                } else {
                    return value;
                }
            }
        }
    };
    return {
        title: [
            {
                top: 25,
                x: "50%",
                textStyle: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                textAlign: 'center',
                text: "男性 TGI"
            },
            {
                top: "50%",
                x: "50%",
                textStyle: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                textAlign: 'center',
                text: "女性 TGI"
            }
        ],
        animation: false,
        grid: [
            {
                top: 60,
                left: '14%',
                right: '14%',
                bottom: "50%",
                containLabel: true
            },
            {
                top: "58%",
                right: '14%',
                bottom: "5%",
                containLabel: true
            }
        ],
        xAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                type: 'value',
                gridIndex: 1,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: data.maleTGI.map(function (v) {
                    return v.name
                }).reverse(),
                axisLabel: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data:data.femaleTGI.map(function (v) {
                    return v.name
                }).reverse(),
                axisLabel: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                type: 'bar',
                silent: true,
                barWidth: 25,
                label: LABEL_OPTION,
                data: data.maleTGI.map(function (v, i) {
                    return {
                        name: v.name,
                        value: v.value,
                        itemStyle: {
                            normal: {
                                color: "rgba(31, 227, 206, " + (.8 - i/ 10) + ")"
                            }
                        }
                    }
                }).reverse(),
            },
            {
                type: 'bar',
                silent: true,
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: 25,
                label: LABEL_OPTION,
                data: data.femaleTGI.map(function (v, i) {
                    return {
                        name: v.name,
                        value: v.value,
                        itemStyle: {
                            normal: {
                                color: "rgba(88, 135, 243, " + (.8 - i/ 10) + ")"
                            }
                        }
                    }
                }).reverse(),
            }
        ]
    }
}