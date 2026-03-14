const { pool } = require('../../config/database');
const { AdminStatsRepository } = require('./admin-stats.repository');

class AdminStatsService {
	async getSummary() {
		const connection = await pool.getConnection();

		try {
			const repository = new AdminStatsRepository(connection);
			const summary = await repository.getSummary();
			const distribution = await repository.getScoreDistribution();

			return {
				totalAttempts: Number(summary.total_attempts),
				averageScore: Number(Number(summary.average_score).toFixed(2)),
				scoreDistribution: [
					{ range: '0-49', count: Number(distribution.range_0_49 || 0) },
					{ range: '50-69', count: Number(distribution.range_50_69 || 0) },
					{ range: '70-84', count: Number(distribution.range_70_84 || 0) },
					{ range: '85-100', count: Number(distribution.range_85_100 || 0) },
				],
			};
		} finally {
			connection.release();
		}
	}
}

module.exports = { AdminStatsService };
