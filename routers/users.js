const express = require('express');
const usersRouter = express.Router();
const { sendUser} = require('../controllers/users.js')

usersRouter
.get('/:username', sendUser);

module.exports = usersRouter;