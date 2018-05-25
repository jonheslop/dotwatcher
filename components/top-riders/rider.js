import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const Wrap = styled.dl`${tachyons}`;
const RiderName = styled.dt`${tachyons}`;
const RiderStat = styled.dt`${tachyons}`;
// <RiderStat fr f6 gray>199km</RiderStat>

const Rider = ({rider}) => {
	return (
		<Wrap f6 mt0 mb2 lh_copy className="cf">
			<RiderName fl f6 b>{rider.name}</RiderName>
		</Wrap>
	);
};

Rider.propTypes = {
	rider: PropTypes.object.isRequired
};

export default Rider;
