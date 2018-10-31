const express = require('express');
const usersRouter = express.Router();
const { sendUser, sendAllUsers} = require('../controllers/users.js')

usersRouter
.get('/', sendAllUsers)
.get('/:username', sendUser);

module.exports = usersRouter;