import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";

const A = styled.a`
	${tachyons}
`;

const P = styled.p`
	${tachyons}
`;

const RiderGrid = styled.div`
	grid-template-columns: repeat(2, 1fr);
	display: grid;
	grid-gap: var(--spacing-large);

	@media screen and (min-width: 48em) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const RiderGridItem = styled.div`
	${tachyons}
	align-items: center;
`;

const RiderSummary = ({ riders = [] }) => (
	<RiderGrid>
		{riders.map((rider, index) => (
			<RiderGridItem
				w-20
				pa3
				flex
				hover_bg_lightest_blue
				bg_light_gray
				ba
				bw1
				b__white
				f4
				lh_copy
				key={index}
				id={rider.id}
			>
				<Link
					href={`/profile/${rider.name}`}
					passHref
				>
					<A link near_black>
						<P f3 fw6 ma0 lh_title link hover_blue>
							{rider.name}
						</P>
					</A>
				</Link>
			</RiderGridItem>
		))}
	</RiderGrid>
);

RiderSummary.propTypes = {
	riders: PropTypes.array.isRequired
};

export default RiderSummary;
