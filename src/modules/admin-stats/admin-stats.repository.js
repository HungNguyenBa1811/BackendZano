class AdminStatsRepository {
	constructor(connection) {
		this.connection = connection;
	}

	async getSummary() {
		const [rows] = await this.connection.query(
			`
				SELECT
					COUNT(*) AS total_attempts,
					COALESCE(AVG(score), 0) AS average_score
				FROM results
			`
		);

		return rows[0];
	}

	async getScoreDistribution() {
		const [rows] = await this.connection.query(
			`
				SELECT
					SUM(CASE WHEN score < 50 THEN 1 ELSE 0 END) AS range_0_49,
					SUM(CASE WHEN score >= 50 AND score < 70 THEN 1 ELSE 0 END) AS range_50_69,
					SUM(CASE WHEN score >= 70 AND score < 85 THEN 1 ELSE 0 END) AS range_70_84,
					SUM(CASE WHEN score >= 85 THEN 1 ELSE 0 END) AS range_85_100
				FROM results
			`
		);

		return rows[0];
	}
}

module.exports = { AdminStatsRepository };
