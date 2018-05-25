import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import Wrapper from '../shared/wrapper';
import Image from '../image';

const Div = styled.div`${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const P = styled.p`${tachyons}`;

const Homepage = ({block}) => (
	<Div mh4_m mh6_l mb4 mb5_ns className="cf">
		<Wrapper w_100 w_50_ns ph3 className="cf">
			{ block.image ? <Image data={block.image.fields}/> : null }
		</Wrapper>
		<Wrapper w_100 w_50_ns ph3 mv4 mv0_ns className="cf">
			<H2 f1 f_subheadline_l lh_title ma0 bt bw4 b__light_blue>{block.heading}</H2>
		</Wrapper>
		<Wrapper w_100 ph3 mv4 mv0_ns className="cf">
			<P f2 lh_copy measure_narrow center pl4 bl bw3 b__light_blue mb0>{block.words}</P>
		</Wrapper>
	</Div>
);

Homepage.propTypes = {
	block: PropTypes.object.isRequired
};

export default Homepage;