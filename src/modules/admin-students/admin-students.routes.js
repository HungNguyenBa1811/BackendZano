const express = require('express');

const { authGuard } = require('../../shared/guards/auth-guard');
const { roleGuard } = require('../../shared/guards/role-guard');
const { asyncHandler } = require('../../shared/utils/async-handler');
const { AdminStudentsController } = require('./admin-students.controller');
const { AdminStudentsService } = require('./admin-students.service');

const adminStudentsRouter = express.Router();

const adminStudentsService = new AdminStudentsService();
const adminStudentsController = new AdminStudentsController(adminStudentsService);

adminStudentsRouter.use(authGuard, roleGuard(['admin']));

adminStudentsRouter.get('/', asyncHandler(adminStudentsController.listStudents.bind(adminStudentsController)));
adminStudentsRouter.post('/', asyncHandler(adminStudentsController.createStudent.bind(adminStudentsController)));
adminStudentsRouter.put(
    '/:studentId',
    asyncHandler(adminStudentsController.updateStudent.bind(adminStudentsController)),
);
adminStudentsRouter.delete(
    '/:studentId',
    asyncHandler(adminStudentsController.deleteStudent.bind(adminStudentsController)),
);
adminStudentsRouter.get(
    '/:studentId/overview',
    asyncHandler(adminStudentsController.getOverview.bind(adminStudentsController)),
);
adminStudentsRouter.get(
    '/:studentId/results',
    asyncHandler(adminStudentsController.listResults.bind(adminStudentsController)),
);
adminStudentsRouter.get(
    '/:studentId/report',
    asyncHandler(adminStudentsController.getReport.bind(adminStudentsController)),
);

module.exports = { adminStudentsRouter };
