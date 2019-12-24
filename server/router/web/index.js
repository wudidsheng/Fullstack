module.exports = app => {
    let express = require('express');
    let router = express.Router(); //生成子路由
    app.use('/web/api', router)
    //新闻初使化
    router.get('/init', async (req, res) => {
        let art = require('../../sql/admin') //分类
        let news = require('../../sql/news') //新闻
        let parent = await art.find({
            'name': '新闻资讯'
        }).lean() //获取新闻id 1！
        let articl = await art.find({
            'father': parent[0]._id
        }) //获取新闻分类 2！
        //初使化数据 3!
        let newslist = ["12月11日全服不停机更新公告", "12月10日全服不停机更新公告", "冰雪聚峡谷 轻松得好礼", "【已修复】圣诞礼盒活动异常修复公告", "KPL秋决观赛活动公告", "新英雄爆料丨蒙犽：我的子弹会拐弯，我的想法不一般！", "玄雍资料片1月上线，嬴政形象升级抢先看", "峡谷交响乐幕后故事揭秘（交响音乐会倒计时2天）", "皮肤爆料 | S18赛季皮肤提前曝光，竟然是ta！", "星元上新丨英雄齐换装，圣诞头饰、武器抢先看", "12月11日全服不停机更新公告", "【已修复】圣诞礼盒活动异常问题处理公告", "12月10日全服不停机更新公告", "钟馗英雄技能音效异常说明公告", "【已修复】更新后无法进入游戏问题说明公告", "冰雪聚峡谷 轻松得好礼", "KPL秋决观赛活动公告", "【奇遇咕嗒的寻宝之旅】活动公告", "【已修复】圣诞礼盒活动异常修复公告", "圣诞礼盒活动公告", "高校海选赛报名最后一周，为校而战就等你来", "模拟战冬季冠军杯分组情况及正赛赛程公布", "高校区域联赛决赛本周末开始打响，谁将以校之名晋级全国大区赛？", "第七届王者荣耀城市赛总决赛完美收官 城市专属头像框等你来兑换", "微赛事高校挑战赛开启，冲榜赢取永久史诗皮肤！",
            "12月11日全服不停机更新公告", "12月10日全服不停机更新公告", "冰雪聚峡谷 轻松得好礼", "【已修复】圣诞礼盒活动异常修复公告", "KPL秋决观赛活动公告", "新英雄爆料丨蒙犽：我的子弹会拐弯，我的想法不一般！", "玄雍资料片1月上线，嬴政形象升级抢先看", "峡谷交响乐幕后故事揭秘（交响音乐会倒计时2天）", "皮肤爆料 | S18赛季皮肤提前曝光，竟然是ta！", "星元上新丨英雄齐换装，圣诞头饰、武器抢先看", "12月11日全服不停机更新公告", "【已修复】圣诞礼盒活动异常问题处理公告", "12月10日全服不停机更新公告", "钟馗英雄技能音效异常说明公告", "【已修复】更新后无法进入游戏问题说明公告", "冰雪聚峡谷 轻松得好礼", "KPL秋决观赛活动公告", "【奇遇咕嗒的寻宝之旅】活动公告", "【已修复】圣诞礼盒活动异常修复公告", "圣诞礼盒活动公告", "高校海选赛报名最后一周，为校而战就等你来", "模拟战冬季冠军杯分组情况及正赛赛程公布", "高校区域联赛决赛本周末开始打响，谁将以校之名晋级全国大区赛？", "第七届王者荣耀城市赛总决赛完美收官 城市专属头像框等你来兑换", "微赛事高校挑战赛开启，冲榜赢取永久史诗皮肤！"
        ]
        //数据处理
        newslist = newslist.map(v => {
            return {
                classf: articl[Math.floor(Math.random() * 5)]._id,
                title: v
            }
        })
        //插入数据库
        //情况数据库
        await news.deleteMany()
        //批量插入数据库
        let b = await news.insertMany(newslist)
        res.send(b)

    })
    //首页新闻资讯
    router.get('/list', async (req, res) => {
        let art = require('../../sql/admin') //分类
        let news = require('../../sql/news') //新闻
        let parent = await art.findOne({
            'name': '新闻资讯'
        }).lean() //获取新闻id 1！
        const cats = await art.aggregate([{
                $match: {
                    father: parent._id
                }
            },
            // lookup聚合查询，form关联的表，local本地件键盘，foreg对应的关联件，查询内容命名
            {
                $lookup: {
                    from: 'news',
                    localField: '_id',
                    foreignField: 'classf',
                    as: 'newslist'
                }
            },
            {
                $addFields: {
                    newslist: {
                        $slice: ['$newslist', 5]
                    }
                }
            }
        ])
        cats.map(key => {
            key.newslist.map(async item => {
                item.carory = key.name;
                return item;
            })
            return key;
        })
        res.send(cats)
    })
    //新闻详情
    router.get('/news/:id',async (req,res)=>{
        let news=require('../../sql/news');
        let newlist=await news.findById(req.params.id).lean();
        newlist.realtive=await news.find({}).where({classf:{$in:newlist.classf}}).limit(2)
       
        res.send(newlist)
    })
    //英雄列表初使化
    router.get('/hero/init', async (req, res) => {
        let art = require('../../sql/admin') //分类
        let hero = require('../../sql/hero') //英雄数据表
        //hero数据库清空
        await hero.deleteMany({})
        //初始化数据
        let herosinit = [{
                "name": "热门",
                "hero": [{
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
                    },
                    {
                        "name": "",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
                    }
                ]
            },
            {
                "name": "战士",
                "hero": [{
                        "name": "赵云",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
                    },
                    {
                        "name": "墨子",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
                    },
                    {
                        "name": "钟无艳",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
                    },
                    {
                        "name": "吕布",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
                    },
                    {
                        "name": "夏侯惇",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
                    },
                    {
                        "name": "曹操",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
                    },
                    {
                        "name": "典韦",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
                    },
                    {
                        "name": "宫本武藏",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
                    },
                    {
                        "name": "达摩",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
                    },
                    {
                        "name": "老夫子",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
                    },
                    {
                        "name": "关羽",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
                    },
                    {
                        "name": "程咬金",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
                    },
                    {
                        "name": "露娜",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
                    },
                    {
                        "name": "花木兰",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
                    },
                    {
                        "name": "橘右京",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
                    },
                    {
                        "name": "亚瑟",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
                    },
                    {
                        "name": "孙悟空",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
                    },
                    {
                        "name": "刘备",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
                    },
                    {
                        "name": "钟馗",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
                    },
                    {
                        "name": "杨戬",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
                    },
                    {
                        "name": "雅典娜",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
                    },
                    {
                        "name": "哪吒",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
                    },
                    {
                        "name": "铠",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
                    },
                    {
                        "name": "苏烈",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
                    },
                    {
                        "name": "裴擒虎",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
                    },
                    {
                        "name": "狂铁",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
                    },
                    {
                        "name": "孙策",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
                    },
                    {
                        "name": "李信",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
                    },
                    {
                        "name": "盘古",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
                    },
                    {
                        "name": "云中君",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
                    },
                    {
                        "name": "曜",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
                    },
                    {
                        "name": "马超",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
                    }
                ]
            },
            {
                "name": "法师",
                "hero": [{
                        "name": "小乔",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
                    },
                    {
                        "name": "墨子",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
                    },
                    {
                        "name": "妲己",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
                    },
                    {
                        "name": "嬴政",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
                    },
                    {
                        "name": "高渐离",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
                    },
                    {
                        "name": "孙膑",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
                    },
                    {
                        "name": "扁鹊",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
                    },
                    {
                        "name": "芈月",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
                    },
                    {
                        "name": "周瑜",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
                    },
                    {
                        "name": "甄姬",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
                    },
                    {
                        "name": "武则天",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
                    },
                    {
                        "name": "貂蝉",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
                    },
                    {
                        "name": "安琪拉",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
                    },
                    {
                        "name": "露娜",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
                    },
                    {
                        "name": "姜子牙",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
                    },
                    {
                        "name": "王昭君",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
                    },
                    {
                        "name": "张良",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
                    },
                    {
                        "name": "不知火舞",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
                    },
                    {
                        "name": "钟馗",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
                    },
                    {
                        "name": "诸葛亮",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
                    },
                    {
                        "name": "干将莫邪",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
                    },
                    {
                        "name": "女娲",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
                    },
                    {
                        "name": "杨玉环",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
                    },
                    {
                        "name": "弈星",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
                    },
                    {
                        "name": "米莱狄",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
                    },
                    {
                        "name": "司马懿",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
                    },
                    {
                        "name": "沈梦溪",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
                    },
                    {
                        "name": "上官婉儿",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
                    },
                    {
                        "name": "嫦娥",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
                    },
                    {
                        "name": "西施",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"
                    }
                ]
            },
            {
                "name": "坦克",
                "hero": [{
                        "name": "廉颇",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
                    },
                    {
                        "name": "庄周",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
                    },
                    {
                        "name": "刘禅",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
                    },
                    {
                        "name": "钟无艳",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
                    },
                    {
                        "name": "白起",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
                    },
                    {
                        "name": "芈月",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
                    },
                    {
                        "name": "吕布",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
                    },
                    {
                        "name": "夏侯惇",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
                    },
                    {
                        "name": "达摩",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
                    },
                    {
                        "name": "项羽",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
                    },
                    {
                        "name": "程咬金",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
                    },
                    {
                        "name": "刘邦",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
                    },
                    {
                        "name": "亚瑟",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
                    },
                    {
                        "name": "牛魔",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
                    },
                    {
                        "name": "张飞",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
                    },
                    {
                        "name": "太乙真人",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
                    },
                    {
                        "name": "东皇太一",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
                    },
                    {
                        "name": "铠",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
                    },
                    {
                        "name": "苏烈",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
                    },
                    {
                        "name": "梦奇",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
                    },
                    {
                        "name": "孙策",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
                    },
                    {
                        "name": "嫦娥",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
                    },
                    {
                        "name": "猪八戒",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
                    }
                ]
            },
            {
                "name": "刺客",
                "hero": [{
                        "name": "赵云",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
                    },
                    {
                        "name": "阿轲",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
                    },
                    {
                        "name": "李白",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
                    },
                    {
                        "name": "貂蝉",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
                    },
                    {
                        "name": "韩信",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
                    },
                    {
                        "name": "兰陵王",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
                    },
                    {
                        "name": "花木兰",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
                    },
                    {
                        "name": "不知火舞",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
                    },
                    {
                        "name": "娜可露露",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
                    },
                    {
                        "name": "橘右京",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
                    },
                    {
                        "name": "孙悟空",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
                    },
                    {
                        "name": "百里守约",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
                    },
                    {
                        "name": "百里玄策",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
                    },
                    {
                        "name": "裴擒虎",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
                    },
                    {
                        "name": "元歌",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
                    },
                    {
                        "name": "司马懿",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
                    },
                    {
                        "name": "上官婉儿",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
                    },
                    {
                        "name": "云中君",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
                    },
                    {
                        "name": "马超",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
                    }
                ]
            },
            {
                "name": "射手",
                "hero": [{
                        "name": "孙尚香",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
                    },
                    {
                        "name": "鲁班七号",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
                    },
                    {
                        "name": "马可波罗",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
                    },
                    {
                        "name": "狄仁杰",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
                    },
                    {
                        "name": "后羿",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
                    },
                    {
                        "name": "李元芳",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
                    },
                    {
                        "name": "虞姬",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
                    },
                    {
                        "name": "成吉思汗",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
                    },
                    {
                        "name": "黄忠",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
                    },
                    {
                        "name": "百里守约",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
                    },
                    {
                        "name": "公孙离",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
                    },
                    {
                        "name": "伽罗",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
                    }
                ]
            },
            {
                "name": "辅助",
                "hero": [{
                        "name": "庄周",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
                    },
                    {
                        "name": "刘禅",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
                    },
                    {
                        "name": "孙膑",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
                    },
                    {
                        "name": "姜子牙",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
                    },
                    {
                        "name": "牛魔",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
                    },
                    {
                        "name": "张飞",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
                    },
                    {
                        "name": "蔡文姬",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
                    },
                    {
                        "name": "太乙真人",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
                    },
                    {
                        "name": "大乔",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
                    },
                    {
                        "name": "鬼谷子",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
                    },
                    {
                        "name": "明世隐",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
                    },
                    {
                        "name": "杨玉环",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
                    },
                    {
                        "name": "盾山",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
                    },
                    {
                        "name": "瑶",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
                    },
                    {
                        "name": "鲁班大师",
                        "avgarot": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"
                    }
                ]
            }
        ].slice(1)
        //数据加工
        for (let item of herosinit) {
            let heroclass = await art.findOne({
                name: item.name
            })
            item.hero.map(v => {
                //关联英雄定位
                v.position = [heroclass._id];
                v.icon = v.avgarot; //头像
            })
            //批量插入数据
            hero.insertMany(item.hero)
        }

        res.send(herosinit)
    })
    //英雄列表
    router.get('/hero/list', async (req, res) => {
        let art = require('../../sql/admin')
        let hero = require('../../sql/hero');
       let heroal=await art.findOne({name:'英雄列表'}).lean() //获取到英雄
       let heroallist=await art.aggregate([{
            $match: {
                father: heroal._id
            }},
            {
                $lookup: {
                    from: 'heros',
                    localField: '_id',
                    foreignField: 'position',
                    as: 'newslist'
                }
            },
           
         ])
         //热门
         let hothero=await hero.find({}).limit(10).lean()
     
         heroallist.unshift({name:'热门',newslist:hothero})
      
        res.send(heroallist)
    })
    //英雄详情
    router.get('/hero/:ID',async (req,res)=>{
      let hero=require('../../sql/hero')
      let data=await hero.findById(req.params.ID).populate('position')
            res.send(data)
    })

}