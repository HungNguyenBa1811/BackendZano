const express = require('express');

const { asyncHandler } = require('../../shared/utils/async-handler');
const { AuthController } = require('./auth.controller');
const { AuthService } = require('./auth.service');

const authRouter = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post('/register', asyncHandler(authController.register.bind(authController)));
authRouter.post('/login', asyncHandler(authController.login.bind(authController)));
authRouter.post('/refresh-token', asyncHandler(authController.refreshToken.bind(authController)));
authRouter.post('/logout', asyncHandler(authController.logout.bind(authController)));

module.exports = { authRouter };
