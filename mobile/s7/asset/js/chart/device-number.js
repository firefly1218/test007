function buildDeviceNumber(data, title, name, color, gradientColor) {
    return {
        title: {
            x: "center",
            y: "16px",
            text: title,
            textStyle: {
                fontSize: "16",
                color: "#5b6077",
                fontWeight: "normal"
            }
        },
        animation: false,
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                lineStyle:{
                    color: color,
                    opacity: .4
                }
            }
        },
        grid:{
            bottom: 100,
            left:70
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.dates
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start:80,
            end: 100
        }, {
            start: 80,
            end: 100,
            bottom: 40,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#ffffff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name: name,
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: color
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: gradientColor[0]
                        }, {
                            offset: 1,
                            color: gradientColor[1]
                        }])
                    }
                },
                data: data.values
            }
        ]
    }
}