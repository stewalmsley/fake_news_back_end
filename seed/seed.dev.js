const seedDB = require('./seed.js');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/news';
const data  = require('./devData/index.js');
  
  mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => seedDB( data ))
    .then(() => mongoose.disconnect()); 