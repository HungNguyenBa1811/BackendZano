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

/**
 * @openapi
 * /admin/stats/summary:
 *   get:
 *     tags:
 *       - Admin - Stats
 *     summary: Lấy thống kê tổng quan hệ thống
 *     description: |
 *       Trả về tổng số lần thi, điểm trung bình và phân phối điểm theo các dải.
 *       Chỉ admin được truy cập.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thống kê tổng quan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/AdminStatsSummary'
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *             example:
 *               data:
 *                 totalAttempts: 450
 *                 averageScore: 74.5
 *                 scoreDistribution:
 *                   - range: "0-49"
 *                     count: 12
 *                   - range: "50-69"
 *                     count: 45
 *                   - range: "70-84"
 *                     count: 130
 *                   - range: "85-100"
 *                     count: 263
 *               meta:
 *                 traceId: "abc123"
 *       401:
 *         description: Chưa xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Không có quyền (không phải admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
adminStatsRouter.get('/summary', asyncHandler(adminStatsController.getSummary.bind(adminStatsController)));
adminStatsRouter.get('/export', asyncHandler(adminStatsController.exportStats.bind(adminStatsController)));

module.exports = { adminStatsRouter };
