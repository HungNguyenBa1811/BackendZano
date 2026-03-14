const { sendSuccess } = require('../../shared/utils/response');

class AdminStatsController {
	constructor(adminStatsService) {
		this.adminStatsService = adminStatsService;
	}

	async getSummary(req, res) {
		const result = await this.adminStatsService.getSummary();
		return sendSuccess(res, req, 200, result);
	}
}

module.exports = { AdminStatsController };
