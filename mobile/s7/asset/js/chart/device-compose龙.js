function buildDeviceCompose(data, title) {
    var LABEL_OPTION = {
        normal: {
            show: true,
            position: "center",
            textStyle: {
                fontSize: "16",
                fontFamily: ""
            },
            formatter: function (param) {
                return param.dataIndex != 0 ? "" : param.percent + "%";
            }
        }
    };
    // 一次模板
    function graphicChildren(title, change) {
        var url_redio_down = "../asset/image/icon/icon-down.png";
        var url_redio_up = "../asset/image/icon/icon-up.png";
        return [
            //调整增长符及标题
            {
                type: 'text',
                z: 100,
                top: '10%',
                right: 'center',
                cursor: "default",
                style: {
                    fill: "#f58940",
                    text: change,
                    font: '12px'
                }
            },
            {
                type: 'text',
                z: 100,
                top: '140',
                left: '-90',
                cursor: "default",
                style: {
                    fill: '#5b6077',
                    text: title,
                    font: '12px'
                }
            },
            {
                type: 'image',
                z: 100,
                top: '140',
                left: '-20',
                cursor: "default",
                style: {
                    image: url_redio_down,
                    width: 12,
                    height: 16
                }
            },
        ]
    }
    // 二次模板
    function graphicChildrenTwo(title, change) {
        var url_redio_down = "../asset/image/icon/icon-down.png";
        var url_redio_up = "../asset/image/icon/icon-up.png";
        return [
            //调整增长符及标题
            {
                type: 'text',
                z: 100,
                top: '10%',
                right: 'center',
                cursor: "default",
                style: {
                    fill: '#1de3ce',
                    text: change,
                    font: '12px'
                }
            },
            {
                type: 'text',
                z: 100,
                top: '140',
                left: '-90',
                cursor: "default",
                style: {
                    fill: '#5b6077',
                    text: title,
                    font: '12px'
                }
            },
            {
                type: 'image',
                z: 100,
                top: '140',
                left: '-20',
                cursor: "default",
                style: {
                    image: url_redio_up,
                    width: 12,
                    height: 16
                }
            },
        ]
    }
    
    function pieData(title, color, value) {
        return [
            {
                name: title,
                value: value,
                itemStyle: {
                    normal: {
                        color: color
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
                fontSize: "20",
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
                // children: graphicChildren('缄默设备', data.slientMac_Ratio),
                children: data.slientMac_Ratio[0] === '-' ? graphicChildren('缄默设备', data.slientMac_Ratio) : graphicChildrenTwo('缄默设备', data.slientMac_Ratio)
            },
            {
                type: 'group',
                top: '3%',
                right: '10%',
                bounding: 'raw',
                // children: graphicChildren('流失设备', data.loseMac_Ratio)
                children: data.loseMac_Ratio[0] === '-' ? graphicChildren('流失设备', data.loseMac_Ratio) : graphicChildrenTwo('流失设备', data.loseMac_Ratio)
            },
            {
                type: 'group',
                top: '50%',
                left: '40%',
                bounding: 'raw',
                // children: graphicChildren('回流设备', data.backMac_Ratio)
                children: data.backMac_Ratio[0] === '-' ? graphicChildren('回流设备', data.backMac_Ratio) : graphicChildrenTwo('回流设备', data.backMac_Ratio)
            },
            {
                type: 'group',
                top: '50%',
                right: '10%',
                bounding: 'raw',
                // children: graphicChildren('忠实设备', data.loyalMac_Ratio)
                children: data.loyalMac_Ratio[0] === '-' ? graphicChildren('忠实设备', data.loyalMac_Ratio) : graphicChildrenTwo('忠实设备', data.loyalMac_Ratio)
            }
        ],
        series: [
            {
                name: "缄默设备",
                type: "pie",
                silent: true,
                cursor: "default",
                radius: ["25%", "32%"],
                center: ["25%", "18%"],
                avoidLabelOverlap: false,
                label: LABEL_OPTION,
                data: pieData("缄默设备", "#1de3ce", data.slientMac_Rate.split("%")[0])
            },
            {
                name: "流失设备",
                type: "pie",
                silent: true,
                cursor: "default",
                radius: ["25%", "32%"],
                center: ["75%", "18%"],
                avoidLabelOverlap: false,
                label: LABEL_OPTION,
                data: pieData("流失设备", "#3fb7f5", data.loseMac_Rate.split("%")[0])
            },
            {
                name: "回流设备",
                type: "pie",
                silent: true,
                cursor: "default",
                radius: ["25%", "32%"],
                center: ["25%", "66%"],
                avoidLabelOverlap: false,
                label: LABEL_OPTION,
                data: pieData("回流设备", "#5986f3", data.backMac_Rate.split("%")[0])
            },
            {
                name: "忠实设备",
                type: "pie",
                silent: true,
                cursor: "default",
                radius: ["25%", "32%"],
                center: ["75%", "66%"],
                avoidLabelOverlap: false,
                label: LABEL_OPTION,
                data: pieData("忠实设备", "#f58940", data.loyalMac_Rate.split("%")[0])
            }
        ]
    };
}