const express = require("express")
const app = express();
const cors = require('cors')
const DB_URL  = process.env.MONGO_URI || require('./db/config.js').DB_URL;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = require('./routers/index.js');
const { handle204, handle409, handle404, handle400, handle500 } = require('./error-handlers')

mongoose.connect(DB_URL, { useNewUrlParser: true })
.then (() => {
    console.log('connected')
})

app.use(bodyParser.json()), 
app.use(express.static('public'))
app.use(cors());
app.get('/', (req, res, next) => res.sendFile('index.html'))
app.use("/api", router);
app.use('/*', (req, res, next) => next({ status: 404, msg: `${req.originalUrl} does not exist`}));
app.use(handle409)
app.use(handle404)
app.use(handle400)
app.use(handle500)

module.exports = app;