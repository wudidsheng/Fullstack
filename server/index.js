let express = require('express');
let app = express();
let cors = require('cors')
require('./sql/db')       //数据库连接
app.use(cors()) //跨越中间件
app.use(express.json()) //json解析中间件

require('./router/admin')(app); //配置admin路由



app.listen(3000, () => {
    console.log('3000')
})