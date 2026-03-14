const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { AdminStatsController } = require('./admin-stats.controller');
const { AdminStatsService } = require('./admin-stats.service');

const adminStatsRouter = express.Router();

const adminStatsService = new AdminStatsService();
const adminStatsController = new AdminStatsController(adminStatsService);

adminStatsRouter.use(authGuard, roleGuard(['admin']));

adminStatsRouter.get('/summary', asyncHandler(adminStatsController.getSummary.bind(adminStatsController)));

module.exports = { adminStatsRouter };
