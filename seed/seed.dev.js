const seedDB = require('./seed.js');
const mongoose = require('mongoose');
const { DB_URL } = require('../db/config.js')
const data  = require('./devData/index.js');
  
  mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => seedDB( data ))
    .then(() => mongoose.disconnect()); 