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
      cats.map(key=>{
          key.newslist.map(async item=>{
                item.carory=key.name;
              return item;
          })
          return key;
      })
        res.send(cats)
    })

}