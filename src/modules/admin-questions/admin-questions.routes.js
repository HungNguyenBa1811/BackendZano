const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { AdminQuestionsController } = require('./admin-questions.controller');
const { AdminQuestionsService } = require('./admin-questions.service');

const adminQuestionsRouter = express.Router();

const adminQuestionsService = new AdminQuestionsService();
const adminQuestionsController = new AdminQuestionsController(adminQuestionsService);

adminQuestionsRouter.use(authGuard, roleGuard(['admin']));

adminQuestionsRouter.post(
    '/exams/:examId/questions/import',
    asyncHandler(adminQuestionsController.importQuestions.bind(adminQuestionsController)),
);
adminQuestionsRouter.get(
    '/exams/:examId/questions',
    asyncHandler(adminQuestionsController.listQuestions.bind(adminQuestionsController)),
);
adminQuestionsRouter.post(
    '/exams/:examId/questions',
    asyncHandler(adminQuestionsController.createQuestion.bind(adminQuestionsController)),
);
adminQuestionsRouter.put(
    '/exams/:examId/questions/:questionId',
    asyncHandler(adminQuestionsController.updateQuestion.bind(adminQuestionsController)),
);
adminQuestionsRouter.delete(
    '/exams/:examId/questions/:questionId',
    asyncHandler(adminQuestionsController.deleteQuestion.bind(adminQuestionsController)),
);

module.exports = { adminQuestionsRouter };
