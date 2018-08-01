function buildUserRegion(data) {
    data.sort(function (v1, v2) {
        return v2.value - v1.value;
    });

    return {
        title: {
            top: "50%",
            x: "50%",
            textStyle: {
                color: "#2c3660",
                fontSize:12
            },
            
            
            textAlign: 'center',
            text: "地域分布 TOP 10"
        },
        animation:false,
        grid: {
            top: "55%",
            left: '4%',
            right: '12%',
            bottom: 30,
            containLabel: true,
            lineWidth:"20",
        },
        visualMap: {
            min:0,
            // min: data.map(function (v) {
            //     return v.value
            // }).reduce(function (v1, v2) {
            //     return v1 < v2 ? v1 : v2;
            // }),
            max: data.map(function (v) {
                return v.value
            }).reduce(function (v1, v2) {
                return v1 > v2 ? v1 : v2;
            }),
            // dimension:0,
            show: false,
            calculable: true,
            inRange: {
                color: ["#d9e2e8", "#5ab1ef"]
            }
        },
        xAxis: {
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
        yAxis: {
            type: 'category',
            data: data.filter(function (v, i) {
                return i < 10;
            }).map(function (v) {
                return v.name
            }).reverse(),
            axisLabel: {
                fontSize: 14,
                color: "#2c3660",
                /*interval:0,*/
                // rotate:-20,
                interval: 0,
                formatter:function(value)
                {
                    // return value.split("").join("\n");
                    var width=600;
                    if(width<300){
                        return value.split("").join("\n");
                    }else{
                        return value;
                    }
                    
                }
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
        series: [
            {
                name: '地域分布',
                type: 'map',
                mapType: 'china',
                top:"2%",
                left: "0.5",
                right:"0.5",
                bottom:"60%",
                // silent:true,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis:{
                        show:true,
                        formatter:"{b}\n{c}"
                    }
                },
                data: data
            },
            {
                type: 'bar',
                silent:true,
                itemStyle: {
                    normal: {
                        // color: "#dddddd"
                        color:function (params){
                            var colorList = ["#e0ffff","#ddfdff","#c0ecfb","#96d4f6","#87cbf4","#85caf4","#73bff2","#63b6f0","#5ab1ef"];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                label: {
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
                },
                data: data.filter(function (v, i) {
                    return i < 10;
                }).reverse().map(function (v) {
                    return {
                        name: v.name,
                        value: v.value,
                        visualMap:false
                    }
                })
            }
        ]
    }
}