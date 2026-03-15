const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { AdminExamsController } = require('./admin-exams.controller');
const { AdminExamsService } = require('./admin-exams.service');

const adminExamsRouter = express.Router();

const adminExamsService = new AdminExamsService();
const adminExamsController = new AdminExamsController(adminExamsService);

adminExamsRouter.use(authGuard, roleGuard(['admin']));

adminExamsRouter.get('/', asyncHandler(adminExamsController.listExams.bind(adminExamsController)));
adminExamsRouter.post('/', asyncHandler(adminExamsController.createExam.bind(adminExamsController)));
adminExamsRouter.get('/:examId', asyncHandler(adminExamsController.getExamDetail.bind(adminExamsController)));
adminExamsRouter.put('/:examId', asyncHandler(adminExamsController.updateExam.bind(adminExamsController)));
adminExamsRouter.delete('/:examId', asyncHandler(adminExamsController.deleteExam.bind(adminExamsController)));
adminExamsRouter.post('/:examId/publish', asyncHandler(adminExamsController.publishExam.bind(adminExamsController)));

module.exports = { adminExamsRouter };
