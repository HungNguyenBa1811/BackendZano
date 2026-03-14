const { AppError } = require('../../shared/errors/app-error');
const { sendSuccess } = require('../../shared/utils/response');

function parsePositiveInteger(value, fieldName) {
	const parsed = Number(value);
	if (!Number.isInteger(parsed) || parsed <= 0) {
		throw new AppError('Du lieu khong hop le', 400, 'VALIDATION_ERROR', [{ field: fieldName, issue: 'invalid_number' }]);
	}
	return parsed;
}

class StudentAttemptsController {
	constructor(studentAttemptsService) {
		this.studentAttemptsService = studentAttemptsService;
	}

	async getAttemptDetail(req, res) {
		const attemptId = parsePositiveInteger(req.params.attemptId, 'attemptId');
		const result = await this.studentAttemptsService.getAttemptDetail(attemptId, req.auth.userId);
		return sendSuccess(res, req, 200, result);
	}

	async saveAnswer(req, res) {
		const attemptId = parsePositiveInteger(req.params.attemptId, 'attemptId');
		const questionId = parsePositiveInteger(req.params.questionId, 'questionId');

		if (!req.body || typeof req.body.selectedOptionLabel !== 'string') {
			throw new AppError('Du lieu khong hop le', 400, 'VALIDATION_ERROR', [{ field: 'selectedOptionLabel', issue: 'required' }]);
		}

		const result = await this.studentAttemptsService.saveAnswer(
			attemptId,
			questionId,
			req.body.selectedOptionLabel,
			req.auth.userId
		);

		return sendSuccess(res, req, 200, result);
	}

	async submitAttempt(req, res) {
		const attemptId = parsePositiveInteger(req.params.attemptId, 'attemptId');
		const result = await this.studentAttemptsService.submitAttempt(attemptId, req.auth.userId);
		return sendSuccess(res, req, 200, result);
	}
}

module.exports = { StudentAttemptsController };
