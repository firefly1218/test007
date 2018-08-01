function buildUserSex(data, title) {
    return {
        animation: false,
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {d} %"
        },
        series: [
            {
                name: title,
                type: "pie",
                cursor: "default",
                radius: ["35%", "48%"],
                // silent:true,
                label: {
                    normal: {
                        formatter: "{percent|{d}%}\n{title|{b}}",
                        rich:{
                            title:{
                                padding: 6,
                                fontSize: 12,
                                align: "center",
                                color: "#2c3660"
                            },
                            percent:{
                                fontSize: 14,
                                color: "#2c3660"
                            }
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 0,
                        length2: 20,
                        lineStyle: {
                            width: 2
                        }
                    }
                },
                data: [
                    {
                        name: "女性",
                        value: data[1].split("%")[0],
                        itemStyle: {
                            normal: {
                                color: "#1de3ce",
                                borderWidth: 3,
                                borderColor: "#fff"
                            },
                            emphasis: {
                                color: "#1de3ce"
                            }
                        }
                    },
                    {
                        name: "男性",
                        value: data[0].split("%")[0],
                        itemStyle: {
                            normal: {
                                color: "#3fb7f5",
                                borderWidth: 3,
                                borderColor: "#fff"
                            },
                            emphasis: {
                                color: "#3fb7f5"
                            }
                        }
                    }
                ]
            }
        ]
    }
}