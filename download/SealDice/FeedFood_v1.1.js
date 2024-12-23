// ==UserScript==
// @name         投食
// @author       原木
// @version      1.1.0
// @description  投喂，指令：.投喂 <物品>
// @timestamp    1734971062
// 2024-12-24
// @license      CC BY-NC-SA 4.0
// @homepageURL  https://haiira.github.io/Loft/2024/12/24/【SealDice_海豹骰插件】投食/
// ==/UserScript==

function randomGetFood() {
    // 随机食物列表（425）
    const foodList = [
        "红烧肉", "糖醋排骨", "红烧排骨", "可乐鸡翅", "鱼香肉丝", "茶叶蛋", "水煮鱼", "口水鸡", "回锅肉", 
        "红烧猪蹄", "皮蛋瘦肉粥", "酸菜鱼", "咖喱牛肉", "西红柿炒鸡蛋", "葡萄酒", "红烧鱼", "龙井虾仁", 
        "蛋炒饭", "水煮肉片", "奶茶", "佛跳墙", "鲫鱼豆腐汤", "酸辣土豆丝", "乌鸡汤", "煎蛋", "辣椒酱", 
        "意大利面", "麻辣烫", "南瓜饼", "辣白菜", "红烧茄子", "鱼香茄子", "啤酒鸭", "麻婆豆腐", "鲫鱼汤",
        "炸酱面", "宫保鸡丁", "鸡汤", "冰糖炖雪梨", "手撕包菜", "龟苓膏", "剁椒鱼头", "爆米花", "粉蒸肉",
        "固元膏", "鸽子汤", "锅包肉", "麻辣香锅", "银耳汤", "红烧牛肉", "辣子鸡", "牛肉炖土豆", "豆腐脑",
        "咖喱饭", "糖醋鲤鱼", "四物汤", "酱牛肉", "鱼头豆腐汤", "干煸豆角", "银耳莲子汤", "南瓜粥", "烧茄子",
        "汉堡", "饭团", "炖排骨", "木须肉", "鸡蛋饼", "香辣虾", "红烧狮子头", "小鸡炖蘑菇", "糖醋里脊", 
        "土豆炖牛肉", "方便面", "板栗烧鸡", "糖醋鱼", "肉丸", "鸡蛋羹", "梅菜扣肉", "馒头", "土豆泥", "甜甜圈", 
        "京酱肉丝", "酸辣粉", "红烧带鱼", "牛肉汤", "炒年糕", "山药排骨汤", "双皮奶", "大盘鸡", "冬瓜汤",
        "紫菜包饭", "莲藕排骨汤", "红烧鸡翅", "羊肉汤", "猪肝汤", "醋溜白菜", "苹果醋", "香辣蟹", "地三鲜",
        "牛肉酱", "东坡肉", "罗宋汤", "酸辣汤", "臭豆腐", "清蒸大闸蟹", "醋溜土豆丝", "凉拌木耳", "炒面",
        "鸡蛋糕", "四川泡菜", "拔丝地瓜", "清蒸鲈鱼", "孜然羊肉", "银耳红枣汤", "麻辣豆腐", "西红柿炖牛腩",
        "炖鸡", "排骨汤", "关东煮", "烤鱼", "香菇油菜", "毛血旺", "泡椒凤爪", "辣子鸡丁", "咖喱鸡", "椒盐虾",
        "寿司", "家常豆腐", "司康", "花卷", "熘肝尖", "戚风蛋糕", "牛肉面", "包子", "燕麦饼干", "饺子",
        "玛格丽特饼干", "曲奇饼干", "烧卖", "慕斯蛋糕", "沙拉", "手指饼干", "珍珠丸子", "吐司", "芝士蛋糕",
        "窝窝头", "发糕", "自制凉皮", "肉松面包", "千层肉饼", "葱油饼", "骨头汤", "乳酪蛋糕", "糖炒栗子",
        "油条", "拔丝山药", "蛋挞", "豆沙包", "奶黄包", "披萨", "八宝粥", "全麦面包", "红焖羊肉", "葱爆羊肉",
        "银耳莲子羹", "芝士面包", "糯米藕", "蒜蓉西兰花", "生日蛋糕", "油焖大虾", "酸梅汤", "毛毛虫面包",
        "菠菜鸡蛋汤", "腊肉", "泡芙", "冰激凌", "酸奶蛋糕", "卤肉饭", "布朗尼", "派", "电饭锅蛋糕", "马芬",
        "巧克力蛋糕", "菊花酥", "酥饼", "椰蓉球", "黑森林蛋糕", "豆沙面包", "提拉米苏", "海绵蛋糕", "冰皮月饼",
        "酥皮月饼", "五仁月饼", "苏式月饼", "疙瘩汤", "糖不甩", "秋梨膏", "三杯鸡", "锅贴", "苦瓜炒肉片",
        "拍黄瓜", "宫保虾球", "尖椒土豆片", "炸茄盒", "苦瓜酿肉", "荷叶饼", "芹菜炒香干", "炸耦合", "焦糖布丁",
        "白菜炖豆腐", "蚂蚁上树", "盐水鸭", "韭菜炒香干", "肉夹馍", "豆角焖面", "打卤面", "香卤鹌鹑蛋", "老醋花生",
        "麻辣鸭脖", "盐水花生", "油泼鱼", "西湖牛肉羹", "麻团", "宫保豆腐", "菠菜塔", "自制剁椒", "手撕杏鲍菇",
        "蓑衣黄瓜", "剁椒鸡丁", "麻酱豆角", "上校鸡块", "红烧鸡爪", "自制酸奶", "松仁玉米", "红烧冬瓜", "牛肉干",
        "冬瓜排骨汤", "凉面", "猪肉脯", "珍珠圆子", "肉末酸豆角", "蛤蜊蒸蛋", "玉米饼", "菠菜炒鸡蛋", "西芹百合",
        "白灼芥蓝", "炒西瓜皮", "叫花鸡", "盐焗鸡", "冰糖湘莲", "鸭血粉丝汤", "青椒土豆丝", "棒棒鸡", "锅塌豆腐",
        "水晶虾饺", "拔丝苹果", "茄汁带鱼", "荷叶粉蒸肉", "石锅拌饭", "爆炒腰花", "辣椒油", "韭菜盒子", "香辣酥",
        "蒜薹炒肉", "蒜蓉油麦菜", "腐乳烧鸡翅", "奶香馒头", "炒饼", "蛋包饭", "牛奶炖蛋", "鸡蛋灌饼", "荷塘小炒",
        "木耳炒肉", "脆皮炸鲜奶", "铜锣烧", "扬州炒饭", "照烧鸡", "自制豆腐", "芙蓉虾", "琥珀核桃", "酱油炒饭",
        "葱花饼", "虎皮青椒", "可乐饼", "奥尔良烤翅", "咸蛋黄焗南瓜", "上汤娃娃菜", "肉饼蒸蛋", "赛肘花", "蒜泥茄子",
        "虎皮凤爪", "芒果布丁", "香辣烤鱼", "把子肉", "奶昔", "铁板鱿鱼", "芝心虾球", "白灼虾", "木瓜椰奶冻",
        "农家小炒肉", "薯片", "烤羊肉串", "手抓饼", "阳春面", "松鼠鱼", "叉烧肉", "肉皮冻", "朝鲜冷面", "味增汤",
        "麻辣千张", "香椿鱼儿", "咖喱牛腩", "白灼菜心", "沙琪玛", "麻辣肉片", "糟溜鱼片", "面茶", "自来红", "韭菜炒鱿鱼",
        "大列巴", "艾窝窝", "馄饨", "糖三角", "糖渍金桔", "腊八粥", "五香毛豆", "炸香椿鱼", "杏仁豆腐", "肉龙",
        "凉拌海带丝", "春卷", "九转大肠", "东北乱炖", "黄桥烧饼", "葱烧海参", "清蒸武昌鱼", "蒜泥白肉", "腊味合蒸",
        "四喜丸子", "赛螃蟹", "盐水虾", "煎饼", "青椒炒鸡蛋", "萝卜汤", "肉片炒青椒", "黄瓜炒鸡蛋", "酸辣白菜",
        "红烧豆腐", "紫菜蛋花汤", "凉拌黑木耳", "馒头片", "苦瓜炒鸡蛋", "皮蛋豆腐", "卤牛肉", "酱爆鸡丁", "麻辣小龙虾",
        "青椒炒肉丝", "炒莴笋", "粉蒸排骨", "百财登门", "锅煲菜", "排骨汤", "泡芙", "米饭", "寿司", "沙拉", "蛋饼",
        "吐司", "三明治", "冰淇淋", "焗烤菜", "慕斯蛋糕", "奶昔", "粽子", "布丁", "盖浇饭", "拌面", "凉面", "凉皮",
        "焖面", "糯米糍", "果冻", "凉糕", "焖饭", "老鸭汤", "煲仔饭", "棒棒糖", "土豆泥", "疙瘩汤", "蛋花", "烤面包",
        "砂锅菜", "火锅", "牛轧糖", "黑色不明物", "仿真鸡腿", "克家菜", "糊锅的汤", "西芹炒草莓", "鸡蛋炒香蕉", "冬瓜薏米",
        "粽子炒黄瓜", "红烧月饼", "活章鱼", "干蝙蝠黄酒", "黄连蒸豆腐", "麻油炖西瓜", "大蒜煮刺猬", "鲱鱼罐头", "卡苏马苏奶酪",
        "鞑靼牛肉", "Kiburu汤", "爱斯基摩冰淇淋", "蝙蝠汤", "仰望星空派", "哈吉斯", "炸蜘蛛", "酱爆蟑螂", "五味子蛋花汤",
        "童子尿泡鸡蛋", "腌渍水蟑螂", "腌海雀", "剁椒榴莲"
    ];
        let food = foodList[Math.floor(Math.random()*foodList.length)];
        return food;
    }

function NOfoods() {
    // 绝对不想吃的食物
    return [
        "黑色不明物", "仿真鸡腿", "克家菜", "糊锅的汤", "西芹炒草莓", "鸡蛋炒香蕉", "冬瓜薏米", "卡苏马苏奶酪",
        "粽子炒黄瓜", "红烧月饼", "活章鱼", "干蝙蝠黄酒", "黄连蒸豆腐", "麻油炖西瓜", "大蒜煮刺猬", "鲱鱼罐头", 
        "鞑靼牛肉", "Kiburu汤", "爱斯基摩冰淇淋", "蝙蝠汤", "仰望星空派", "哈吉斯", "炸蜘蛛", "酱爆蟑螂",
        "童子尿泡鸡蛋", "腌渍水蟑螂", "腌海雀", "剁椒榴莲", "五味子蛋花汤"
    ]
}

function getLikeList() {

    list = {

        NO: {
            info: "喜好程度：绝对不想吃。",
            answer: [],
        },

        dislike: {
            info: "喜好程度：不喜欢。",
            answer: [],
        },

        normal: {
            info: "喜好程度：一般。",
            answer: [],
        },

        like: {
            info: "喜好程度：喜欢。",
            answer: [],
        },

        after_that: {
            info: "概率触发的后续反应文本。默认概率20%。",
            probability: 0.2,
            answer: [],
        },
    };

    list['NO']['answer'] = seal.ext.getTemplateConfig(ext, "NO_food_answer")
    list['dislike']['answer'] = seal.ext.getTemplateConfig(ext, "dislike_food_answer")
    list['normal']['answer'] = seal.ext.getTemplateConfig(ext, "normal_food_answer")
    list['like']['answer'] = seal.ext.getTemplateConfig(ext, "like_food_answer")

    list['after_that']['probability'] = seal.ext.getFloatConfig(ext, "after_that_p")
    list['after_that']['answer'] = seal.ext.getTemplateConfig(ext, "after_that_answer")

    return list
}


let ext = seal.ext.find('feedFood');
if (!ext){
    ext = seal.ext.new('feedFood', "原木", "1.1.0");
    seal.ext.register(ext);
}

const fFood = seal.ext.newCmdItemInfo();
fFood.name = "投喂";
fFood.help = `投喂一件物品。

【投喂随机食物】
.feed
.投喂

【投喂指定物】
.feed <物品>
.投喂 <物品>`;

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

            const data = JSON.parse(ext.storageGet('foodInfo') || '{}');    // 读取好感数据
            // 获取默认绝对不想吃的食物
            if (JSON.stringify(data) == '{}') {
                const NOlist = NOfoods()
                for (let item of NOlist){
                    data[item] = 0;
                }
            }

            // 若未输入食物参数，则从自带数据中随机抽选一项
            if (!item) { item = randomGetFood(); }

            // 获取回答
            // 根据好感度匹配回答池，未记录好感度则生成一个
            // 好感度为0-20的整数，0为绝对不想吃
            let likeList = getLikeList();
            let ansList = [];
            let like = 0;

            if (data[item] === undefined) {
                like = Math.floor(Math.random()*21);
                data[item] = like;
            } else {
                like = data[item];
            }
            ext.storageSet('foodInfo', JSON.stringify(data));   // 存储好感数据

            while (true) {
                if (like == 0) {ansList = likeList['NO']['answer']; break;}
                if (like <= 5) {ansList = likeList['dislike']['answer']; break;}
                if (like <= 15) {ansList = likeList['normal']['answer']; break;}
                ansList = likeList['like']['answer']; break;
            }

            // 从池中抽选一个回答
            ans = seal.format(ctx, ansList[Math.floor(Math.random()*ansList.length)]);
            forAns = seal.format(ctx, "{$t玩家}向{核心:骰子名字}");
            let result = `${forAns}投喂${item}。\n${ans}`;

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
// 注册命令
ext.cmdMap['投喂'] = fFood;
ext.cmdMap['feed'] = fFood;

// 注册扩展
seal.ext.register(ext);

seal.ext.registerTemplateConfig(ext, "NO_food_answer", [
    "不久后在垃圾桶里见到了它。",
    "{核心:骰子名字}没有理会，转头就走。",
    "……被无视了。",
    "{核心:骰子名字}没有接，转移话题搪塞了过去。",
    "获得了一记疑惑的目光。"
]);

seal.ext.registerTemplateConfig(ext, "dislike_food_answer", [
    "{核心:骰子名字}婉言谢绝了。",
    "“还是您自己吃吧。”被这样拒绝了。",
    "{核心:骰子名字}很有礼貌地拒绝了投喂。",
    "{核心:骰子名字}耐心地阐述了自己为什么不爱吃这个。",
    "{核心:骰子名字}摇摇头，没有接。"
]);

seal.ext.registerTemplateConfig(ext, "normal_food_answer", [
    "{核心:骰子名字}的反应很平淡。",
    "{核心:骰子名字}露出礼貌的微笑接下了。",
    "虽然收下了，但完全没见到{核心:骰子名字}吃，也许是塞给别人了。",
    "{核心:骰子名字}当面尝了尝，又还给你了。",
    "{核心:骰子名字}收下了，但似乎完全没吃。",
    "{核心:骰子名字}收下了，不知到底吃了没有。",
    "{核心:骰子名字}收下了，也许回头吃掉了吧。"
]);

seal.ext.registerTemplateConfig(ext, "like_food_answer", [
    "{核心:骰子名字}显得有些意外，开心地收下了。",
    "{核心:骰子名字}惊喜地接下了。",
    "虽然没有明说，但能感觉到{核心:骰子名字}喜欢这个礼物。",
    "{核心:骰子名字}愉快地表示自己喜欢吃这个。",
    "{核心:骰子名字}认真地表示了感谢，表示自己喜欢这个礼物。",
]);

seal.ext.registerFloatConfig(ext, "after_that_p", 0.2);

seal.ext.registerTemplateConfig(ext, "after_that_answer", [
    "{核心:骰子名字}显得有些意外，开心地收下了。",
    "{核心:骰子名字}惊喜地接下了。",
    "虽然没有明说，但能感觉到{核心:骰子名字}喜欢这个礼物。",
    "{核心:骰子名字}愉快地表示自己喜欢吃这个。",
    "{核心:骰子名字}认真地表示了感谢，表示自己喜欢这个礼物。",
]);