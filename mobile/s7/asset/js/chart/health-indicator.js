function buildHealthIndicator(data) {
    var keyMap={
        "BMI":"BMI",
        "Bfat":"体脂",
        "Hfat":"内脏脂肪",
        "Muscle":"肌肉",
        "Cadre":"骨骼",
        "Bmet":"基础代谢",
        "Protein":"蛋白质",
        "Water":"水分",
    }
    var colors = ["#1de3ce","#5887f3",  "#ff9d4c", "#ee6e4c"]
    return {
        title: data.map(function (v, i) {
            return {
                x: (i % 2 *50 +22) + "%",
                y: (parseInt(i / 2) * 25 + 20) + "%",
                textStyle: {
                    fontSize: 14,
                    color: "#2c3660"
                },
                textAlign: 'center',
                text: v.name
            };
        }),
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} <br/>占比:({d}%)"
        },
        animation: false,
        series: data.map(function (v, i) {
            return {
                name: v.name,
                type: "pie",
                // silent: true,
                radius: "24%",
                center: [(i % 2 *43 + 25) + "%", (parseInt(i / 2) * 25 + 12) + "%"],
                avoidLabelOverlap:true,
                labelLine: {
                    normal: {
                        length2: 4,
                        smooth:false,
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            // fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                grid:{
                    left:40
                },
                data: v.result.map(function (v, i) {
                    return {
                        name: v.name,
                        value: v.value,
                        itemStyle: {
                            normal: {
                                color: colors[i]
                            }
                        }
                    }
                })
            }
        })
    }
}