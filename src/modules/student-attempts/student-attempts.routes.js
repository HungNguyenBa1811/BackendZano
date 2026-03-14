const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { StudentAttemptsController } = require('./student-attempts.controller');
const { StudentAttemptsService } = require('./student-attempts.service');

const studentAttemptsRouter = express.Router();

const studentAttemptsService = new StudentAttemptsService();
const studentAttemptsController = new StudentAttemptsController(studentAttemptsService);

studentAttemptsRouter.use(authGuard, roleGuard(['student']));

studentAttemptsRouter.get('/:attemptId', asyncHandler(studentAttemptsController.getAttemptDetail.bind(studentAttemptsController)));
studentAttemptsRouter.put(
  '/:attemptId/answers/:questionId',
  asyncHandler(studentAttemptsController.saveAnswer.bind(studentAttemptsController))
);
studentAttemptsRouter.post('/:attemptId/submit', asyncHandler(studentAttemptsController.submitAttempt.bind(studentAttemptsController)));

module.exports = { studentAttemptsRouter };
