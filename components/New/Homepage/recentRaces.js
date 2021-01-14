import { Fragment } from "react";
import Link from "next/link";
import H2 from "@Components/UI/H2";
import H3 from "@Components/UI/H3";
import P from "@Components/UI/P";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import moment from "moment";
import { Grid, GridItem } from "./grid";
import Image from "next/image";

const RecentRaces = ({ racesCollection }) => (
	<Fragment>
		<Center>
			<H2>Recent Races</H2>
		</Center>
		<Grid>
			{racesCollection.items.slice(0, 4).map((race, ind) => (
				<GridItem key={ind}>
					<Link href={`/race/${race.slug}`} passHref>
						<a>
							<Image
								src={race.icon.url + "?w=300&h=200&fit=fill"}
								width={300}
								height={200}
								alt={race.title}
								title={race.title}
							/>
						</a>
					</Link>

					<Link href={`/race/${race.slug}`} passHref>
						<H3>
							<A>{race.title}</A>
						</H3>
					</Link>

					<P>{race.shortDescription}</P>

					<p>{moment(race.raceDate).format("MMM Do YYYY")}</p>
				</GridItem>
			))}
		</Grid>
	</Fragment>
);

export default RecentRaces;
