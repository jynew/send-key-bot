// 公共配置文件
const config = {
  // 项目启动监听的端口
  port: 3000,

  publicPath: 'public',
  
  logPath: 'logs',
  logFilename: 'koa.log',

  // 微信配置
  wx: {
      appId: "",
      appSecret: "",
      apiPath: "https://api.weixin.qq.com"
  },

  // 数据库配置
  db: {
      host: 'localhost',    // 数据库地址
      username: 'root',    // 用户名
      password: 'root',    // 用户密码
      database: 'send-key-bot',    // 数据库名 underlined !!!
      port: 3306      // 数据库端口(默认: 3306)
  },

  // 数据库表配置
  table: {

  }
};

module.exports = config;
