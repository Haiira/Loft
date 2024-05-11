// ==UserScript==
// @name         投喂
// @author       原木
// @version      1.0.0
// @description  投喂，指令：.投喂 <物品>
// @timestamp    1715428800
// 2024-5-11
// @license      Apache-2
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

function randomGetFood() {
    // 随机获取食物
    const foodList = [
        "布丁", "甜甜圈", "小蛋糕", "霜糖蛋糕", "姜饼", "松饼", "炸糊的虾"
    ];
        let food = foodList[Math.floor(Math.random()*foodList.length)];
        return food;
    }

function getLikeList() {
    // 喜好与回应
    return {
        general: {
            info: "通用回复",
            answer: [
                "被无视了。",
                "{核心:骰子名字}露出礼貌的微笑接下，之后在书桌上放了很久。",
                "完全没见到{核心:骰子名字}吃，也许是塞给别人了。",
                "{核心:骰子名字}当面打开来吃了一口。",
                "{核心:骰子名字}婉言谢绝了。",
                "{核心:骰子名字}没有接，转移话题搪塞了过去。"
            ]
        },

        like: {
            info: "喜好程度：喜欢",
            food: [
                "布丁"
            ],
            answer: [
                "{核心:骰子名字}显得有些意外，开心地收下了。"
            ]
        },

        normal: {
            info: "喜好程度：一般",
            food: [
                "姜饼"
            ],
            answer: [
                "一般。"
            ]
        },

        dislike: {
            info: "喜好程度：不喜欢",
            food: [
                "炸糊的虾"
            ],
            answer: [
                "不久后在垃圾桶里见到了它。"
            ]
        },

        after_that: {
            info: "概率触发的后续反应文本。默认概率30%",
            probability: 0.3,
            answer: [
                "不久后，{$t玩家}收到了一模一样的回礼。"
            ]
        },
    };
}


let ext = seal.ext.find('feedFood');
if (!ext){
    ext = seal.ext.new('feedFood', "原木", "1.0.0");
    seal.ext.register(ext);
}

const fFood = seal.ext.newCmdItemInfo();
fFood.name = "投喂";
fFood.help = "投喂一件随机物，可使用【.投喂 <物品>】指定。";

fFood.solve = (ctx, msg, cmdArgs) => {

    let item = cmdArgs.getArgN(1);  // 获取输入的投喂物品
    let ans = "";   // 喜好反馈文本

    switch (item) {
        // 命令为help，则给用户发送帮助。
        case 'help': {
            const ret = seal.ext.newCmdExcuteResult(true);
            ret.showHelp = true;
            return ret;
        }
        default: {
            // 若未输入，则从自带数据中随机抽选一项
            if (!item) {
                item = randomGetFood();
                console.log('item: ' + item)
            }

            // 根据喜好匹配回答池，默认为general。
            let likeList = getLikeList();
            console.log(likeList['general']['info'])
            let ansList = likeList['general']['answer'];
            for (let likes of ['like', 'normal', 'dislike']){
                console.log(likes)
                let res = likeList[likes]['food'].indexOf(item) != -1;
                if (res) {
                    ansList = likeList[likes]['answer'];
                    break;
                }
            }
            // 从池中抽选一个回答
            ans = seal.format(ctx, ansList[Math.floor(Math.random()*ansList.length)]);
            forAns = seal.format(ctx, "{$t玩家}向{核心:骰子名字}");
            let result = `${forAns}投喂了${item} 。\n${ans}`;

            // 添加随机后续反应
            let probable = likeList['after_that']['probability'];
            if (Math.random() <= probable){
                let answers = likeList['after_that']['answer'];
                result += seal.format(ctx, "\n\n" + answers[Math.floor(Math.random()*answers.length)]);
                seal.replyToSender(ctx, msg, result);
            }else{
                seal.replyToSender(ctx, msg, result);
            }
        }
    }
}
ext.cmdMap['投喂'] = fFood;