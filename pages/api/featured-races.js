import pool from "../../database";

export default async function handle(req, res) {
	const client = await pool.connect();

	try {
		let featuredRaces = [
			"Transcontinental Race",
			"Tour Divide",
			"Trans Am Bike Race",
			"Highland Trail 550"
		];

		const races = featuredRaces.join("|");

		const { rows: results } = await client.query(
			`SELECT riders.name, races.name AS racename, races.year, races.description, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category, results.finishlocation, results.notes FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND races.name ~ '(${races})'`
		);

		const formatted = results.reduce((acc, curr) => {
			if (!curr) return acc;

			const { racename, year } = curr;

			console.log(acc[racename][year]);

			return {
				...acc,
				[racename]: {
					...acc[racename],
					[year]: acc[racename][year] ? [...acc[racename][year], curr] : [curr]
				}
			};
		}, {});

		res.json(formatted);
	} catch (error) {
		res.json({ error });
	} finally {
		client.release();
	}
}
