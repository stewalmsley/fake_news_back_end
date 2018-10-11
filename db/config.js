const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    test : 'mongodb://localhost:27017/news_test',
    development : 'mongodb://localhost:27017/news'
  }
      exports.DB_URL = config[NODE_ENV];