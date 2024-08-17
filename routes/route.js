const express = require("express");
const Router = express.Router();
const userController = require('../controller/controller')
const { verifyToken } = require('../middleware/middleware');
// const adminController = require('../controller/adminController')
// const {authMiddleware, adminMiddleware} = require ('../middleWare/middleware')

//USER
Router.post('/registration', userController.registerUser)
Router.post('/login', userController.loginUser)
Router.get('/welcome',verifyToken, userController.welcome)
Router.get('/description',verifyToken, userController.description)

module.exports = Router