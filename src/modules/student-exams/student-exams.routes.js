const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { StudentExamsController } = require('./student-exams.controller');
const { StudentExamsService } = require('./student-exams.service');

const studentExamsRouter = express.Router();

const studentExamsService = new StudentExamsService();
const studentExamsController = new StudentExamsController(studentExamsService);

studentExamsRouter.use(authGuard, roleGuard(['student']));

studentExamsRouter.get('/', asyncHandler(studentExamsController.listExams.bind(studentExamsController)));
studentExamsRouter.post('/:examId/attempts', asyncHandler(studentExamsController.startAttempt.bind(studentExamsController)));

module.exports = { studentExamsRouter };
