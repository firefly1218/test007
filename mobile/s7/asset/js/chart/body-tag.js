function buildBodyTags(data) {
    var tags = [
        {
            name: "emaciation",
            note: "消瘦型",
            color: "#1de3ce",
            image: "../assets/image/health_emaciation.png"
        },
        {
            name: "thin",
            note: "偏瘦型",
            color: "#1de3ce",
            image: "../assets/image/health_thin.png"
        },
        {
            name: "slim",
            note: "苗条型",
            color: "#3fb7f5",
            image: "../assets/image/health_slim.png"
        },
        {
            name: "muscleslim",
            note: "肌肉苗条型",
            color: "#3fb7f5",
            image: "../assets/image/health_muscleslim.png"
        },
        {
            name: "healthy",
            note: "健康型",
            color: "#5986f3",
            image: "../assets/image/health_healthy.png"
        },
        {
            name: "muscle",
            note: "肌肉型",
            color: "#5986f3",
            image: "../assets/image/health_muscle.png"
        },
        {
            name: "sport",
            note: "运动员型",
            color: "#5986f3",
            image: "../assets/image/health_sport.png"
        },
        {
            name: "coverfat",
            note: "隐性肥胖型",
            color: "#f58940",
            image: "../assets/image/health_coverfat.png"
        },
        {
            name: "beingfat",
            note: "偏胖型",
            color: "#f58940",
            image: "../assets/image/health_beingfat.png"
        },
        {
            name: "fat",
            note: "肥胖型",
            color: "#f58940",
            image: "../assets/image/health_fat.png"
        }
    ];
    
    function graphicChildren(tag, number) {
        return [
            {
                type: "rect",
                shape: { x: -140, y: -69, width: 280, height: 138},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "rect",
                shape: { x: -134, y: -75, width: 268, height: 150},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "circle",
                top: -75,
                left: -140,
                shape: { r: 6},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "circle",
                top: 63,
                left: -140,
                shape: { r: 6},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "circle",
                top: -75,
                left: 128,
                shape: { r: 6},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "circle",
                top: 63,
                left: 128,
                shape: { r: 6},
                style: {
                    fill: tag.color
                }
            },
            {
                type: "image",
                left: 66,
                bottom: "middle",
                style: {
                    height: 110,
                    image: tag.image
                }
            },
            {
                type: "text",
                right: 40,
                top: -40,
                style: {
                    text: number,
                    fill: "#FFFFFF",
                    font: "bolder 20px Microsoft YaHei"
                }
            },
            {
                type: "text",
                right: 10,
                top: -34,
                style: {
                    text: "人",
                    fill: "#FFFFFF",
                    font: "16px Microsoft YaHei"
                }
            },
            {
                type: "text",
                left: -110,
                top: 20,
                style: {
                    text: tag.note,
                    fill: "#FFFFFF",
                    font: "20px Microsoft YaHei"
                }
            }
        ]
    }
    
    return {
        animation: false,
        backgroundColor: "#FFFFFF",
        graphic: tags.map(function (tag, i) {
            return {
                type: 'group',
                top: 25 + 50 * parseInt(i / 5) + '%',
                left: 176 + 316 * (i % 5),
                bounding: 'raw',
                children: graphicChildren(tag, data[tag.name])
            }
        })
    }
}