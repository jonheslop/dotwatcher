// /race/:slug
// /race/:slug?showMap=0
// /race/:slug?showMap=1

import Head from "next/head";
import client from "@Utils/apollo";
import { gql } from "@apollo/client";
import H1 from "@Components/UI/H1";
import H3 from "@Components/UI/H3";
import H2 from "@Components/UI/H2";
import Center from "@Components/UI/Center";
import { useRouter } from "next/router";

import Select from "@Components/UI/OptionSelect";
import { Fragment, useState } from "react";
import styled from "styled-components";
import colors from "@Utils/colors";
import dim from "@Utils/dim";
import mq from "@Utils/media-query";
import Section from "@Components/UI/Section";
import axios from "axios";
import https from "https";

import {
	Header,
	RaceIFrame,
	KeyEvents,
	LiveLeaderboard,
	StaticLeaderboard,
	PostFeed
} from "@ComponentsNew/Race";

const ContentGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: ${dim(2)};
	grid-template-areas:
		"events events events leaderboard leaderboard leaderboard"
		"posts posts posts posts posts posts ";

	${mq.mdUp`
		max-width: 1800px;
		margin: 0 auto;
		grid-template-columns: repeat(12, 1fr);
		grid-column-gap: ${dim(4)};
		grid-template-areas: unset;
`}
`;

const ContentItem = styled.div`
	position: relative;

	& + & {
		&:before {
			content: "";
			position: absolute;
			height: 100%;
			width: 1px;
			background-color: ${colors.lightgrey};
			content: "";
			left: ${dim(-1)};
			bottom: 0;

			${mq.mdUp`
				left: ${dim(-1)};
			`}
		}
	}
`;

const EventsScroll = styled.div`
	${mq.mdUp`
		overflow: scroll;
		max-height: 96vh;
	`};
`;

const Events = styled(ContentItem)`
	grid-area: events;

	${mq.mdUp`
		grid-area: unset;
		grid-column: 1 / span 4;
	`};
`;

const Leaderboard = styled(ContentItem)`
	grid-area: leaderboard;

	${mq.mdUp`
		grid-area: unset;
		grid-column: 5 / span 2;
	`}
`;

const Posts = styled(ContentItem)`
	grid-area: posts;
	overflow: hidden;

	${mq.smDown`
		margin-top: ${dim(2)};
		padding-top: ${dim(2)};
		border-top: 1px solid ${colors.lightgrey};
	`}

	${mq.mdUp`
		grid-area: unset;
		grid-column: 7 / span 6;
	`}
`;

const POST_PER_VIEW = 10;

const Race = ({ data }) => {
	const router = useRouter();
	const [mapPinned, setMapPinned] = useState();

	const {
		racesCollection,
		keyEvents,
		liveLeaderboard,
		racePostsCollection
	} = data;

	const [race] = racesCollection.items;

	const handleOrderChange = event => {
		router.replace({
			pathname: router.pathname,
			query: {
				slug: router.query.slug,
				reverse: event.target.value === "reverse"
			}
		});
	};

	const handleMapPinned = pinned => {
		setMapPinned(pinned);
	};

	return (
		<Fragment>
			<Head>
				<title>{`${race.title} - DotWatcher.cc`}</title>

				<meta property="og:title" content={`${race.title} - DotWatcher.cc`} />
				<meta property="og:description" content={race.shortDescription} />
				<meta property="og:image" content={race.icon.url} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@dotwatcher" />
				<meta name="twitter:creator" content="@dotwatcher" />
				<meta name="twitter:title" content={`${race.title} - DotWatcher.cc`} />
				<meta name="twitter:description" content={race.shortDescription} />
				<meta name="twitter:image" content={race.icon.ur} />
				<meta name="description" content={race.shortDescription} />
				<meta name="twitter:label1" content="Location" />
				<meta name="twitter:data1" content={race.location} />
				<meta name="twitter:label2" content="Length" />
				<meta name="twitter:data2" content={race.length} />
				<meta name="twitter:label3" content="Elevation" />
				<meta name="twitter:data3" content={race.elevation} />
			</Head>

			<Header race={race} />

			<RaceIFrame
				race={race}
				mapPinned={mapPinned}
				setMapPinned={handleMapPinned}
			/>

			<Section>
				<Center>
					<H2>Coverage</H2>
				</Center>
			</Section>

			<Section>
				<ContentGrid>
					<Events>
						<H3>Key Events</H3>

						<EventsScroll>
							<KeyEvents events={keyEvents} />
						</EventsScroll>
					</Events>

					<Leaderboard>
						<H3>Leaderboard</H3>
						{liveLeaderboard ? (
							<LiveLeaderboard leaderboard={liveLeaderboard} />
						) : (
							<StaticLeaderboard race={race} />
						)}
					</Leaderboard>

					<Posts>
						<H3>Events Feed</H3>
						<label>
							<span>Order: </span>

							<Select onChange={handleOrderChange}>
								<option value="a" selected={router.query.reverse !== "true"}>
									Newset First
								</option>
								<option
									value="reverse"
									selected={router.query.reverse === "true"}
								>
									Oldest First
								</option>
							</Select>
						</label>
						<PostFeed posts={racePostsCollection} />
					</Posts>
				</ContentGrid>
			</Section>
		</Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const { slug, reverse } = query;

	const order =
		reverse === "true" ? ["sys_publishedAt_ASC"] : ["sys_publishedAt_DESC"];

	try {
		const { data } = await client.query({
			variables: {
				slug,
				postsLimit: POST_PER_VIEW,
				keyEventsLimit: POST_PER_VIEW,
				keyEventsSkip: 0,
				skip: 0,
				order
			},
			query: gql`
				query race(
					$slug: String
					$postsLimit: Int
					$postsSkip: Int
					$keyEventsLimit: Int
					$keyEventsSkip: Int
					$order: [ContentType2WKn6YEnZewu2ScCkus4AsOrder]
				) {
					racesCollection: contentType5KMiN6YPvi42IcqAuqmcQeCollection(
						limit: 1
						where: { slug: $slug }
					) {
						items {
							length
							elevation
							title
							location
							raceDate
							riders
							terrain
							lastYearsWinner
							winnerLabel
							trackleadersRaceId
							raceEndDate
							slug
							shortDescription
							staticLeaderboard {
								sys {
									publishedAt
								}
								leadersCollection {
									items {
										name
									}
								}
							}
							icon {
								url
							}
						}
					}

					keyEvents: contentType2WKn6YEnZewu2ScCkus4AsCollection(
						limit: $keyEventsLimit
						skip: $keyEventsSkip
						order: $order
						where: { keyPost: true, race: { slug: $slug } }
					) {
						total
						limit
						items {
							sys {
								id
								firstPublishedAt
							}
							title
						}
					}

					racePostsCollection: contentType2WKn6YEnZewu2ScCkus4AsCollection(
						limit: $postsLimit
						skip: $postsSkip
						order: $order
						where: { race: { slug: $slug } }
					) {
						total
						limit
						items {
							sys {
								firstPublishedAt
								id
							}
							title
							format
							body
							keyPost
							embed
							featuredImage {
								url
							}
						}
					}
				}
			`
		});

		const leaderboard = async () => {
			try {
				const { data: leaderboard } = await axios({
					method: "get",
					url:
						data.racesCollection.items[0].trackleadersRaceId +
						"api/dotwatcher/",
					httpsAgent: new https.Agent({
						rejectUnauthorized: false
					}),
					headers: {
						"X-Apikey": process.env.TRACKLEADERS_API_KEY
					}
				});

				return leaderboard;
			} catch (error) {
				console.log(error);
				return false;
			}
		};

		return {
			props: {
				data: {
					...data,
					liveLeaderboard: await leaderboard()
				}
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				error
			}
		};
	}
};

export default Race;
