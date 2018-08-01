function buildUserRegionAge(data) {
    var keyMap = {
        "f50": "60 前 TGI",
        "si60": "60 后 TGI",
        "se70": "70 后 TGI",
        "e80": "80 后 TGI",
        "n90": "90 后 TGI",
        "z00": "00 后 TGI"
    };
    
    
    Object.keys(data).forEach(function (key) {
        data[key].sort(function (v1, v2) {
            return v1.value - v2.value
        })
    });
    
    var LABEL_OPTION = {
        normal: {
            show: true,
            fontSize: 12,
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
        title: Object.keys(data).map(function (key, i) {
            return {
                x: "50%",
                y: (2+ i * 16) + "%",
                textStyle: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                textAlign: 'center',
                text: keyMap[key]
            };
        }),
        animation: false,
        grid: Object.keys(data).map(function (key, i) {
            return {
                top: (4+ i*16) + "%",
                left: "4%",
                right: "13%",
                bottom: (82 - i * 16) + "%",
                containLabel: true
            };
        }),
        xAxis: Object.keys(data).map(function (key, i) {
            return {
                type: 'value',
                gridIndex: i,
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
            };
        }),
        yAxis: Object.keys(data).map(function (key, i) {
            return {
                type: 'category',
                gridIndex: i,
                data: data[key].map(function (v) {
                    return v.name
                }),
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
            };
        }),
        series: Object.keys(data).map(function (key, i) {
            return {
                type: 'bar',
                silent: true,
                xAxisIndex: i,
                yAxisIndex: i,
                barWidth: 20,
                label: LABEL_OPTION,
                data: data[key].map(function (v, i) {
                    return {
                        name: v.name,
                        value: v.value,
                        itemStyle: {
                            normal: {
                                color: "rgba(89, 134, 243, " + (.6 + i / 10) + ")"
                            }
                        }
                    }
                })
            };
        })
    }
}