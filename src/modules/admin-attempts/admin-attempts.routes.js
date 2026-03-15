const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { AdminAttemptsController } = require('./admin-attempts.controller');
const { AdminAttemptsService } = require('./admin-attempts.service');

const adminAttemptsRouter = express.Router();

const adminAttemptsService = new AdminAttemptsService();
const adminAttemptsController = new AdminAttemptsController(adminAttemptsService);

adminAttemptsRouter.use(authGuard, roleGuard(['admin']));

adminAttemptsRouter.get(
    '/:attemptId',
    asyncHandler(adminAttemptsController.getAttemptDetail.bind(adminAttemptsController)),
);

module.exports = { adminAttemptsRouter };
