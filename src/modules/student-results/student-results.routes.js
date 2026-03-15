const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { StudentResultsController } = require('./student-results.controller');
const { StudentResultsService } = require('./student-results.service');

const studentResultsRouter = express.Router();

const studentResultsService = new StudentResultsService();
const studentResultsController = new StudentResultsController(studentResultsService);

studentResultsRouter.use(authGuard, roleGuard(['student']));

studentResultsRouter.get(
    '/:resultId',
    asyncHandler(studentResultsController.getResultDetail.bind(studentResultsController)),
);
studentResultsRouter.get('/', asyncHandler(studentResultsController.listResults.bind(studentResultsController)));

module.exports = { studentResultsRouter };
